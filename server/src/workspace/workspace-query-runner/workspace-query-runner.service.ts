import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { IConnection } from 'src/utils/pagination/interfaces/connection.interface';
import {
  Record as IRecord,
  RecordFilter,
  RecordOrderBy,
} from 'src/workspace/workspace-query-builder/interfaces/record.interface';
import {
  CreateManyResolverArgs,
  CreateOneResolverArgs,
  DeleteOneResolverArgs,
  FindManyResolverArgs,
  FindOneResolverArgs,
  UpdateOneResolverArgs,
} from 'src/workspace/workspace-resolver-builder/interfaces/workspace-resolvers-builder.interface';

import { WorkspaceQueryBuilderFactory } from 'src/workspace/workspace-query-builder/workspace-query-builder.factory';
import { parseResult } from 'src/workspace/workspace-query-runner/utils/parse-result.util';
import { WorkspaceDataSourceService } from 'src/workspace/workspace-datasource/workspace-datasource.service';

import { WorkspaceQueryRunnerOptions } from './interfaces/query-runner-optionts.interface';
import {
  PGGraphQLMutation,
  PGGraphQLResult,
} from './interfaces/pg-graphql.interface';

@Injectable()
export class WorkspaceQueryRunnerService {
  private readonly logger = new Logger(WorkspaceQueryRunnerService.name);

  constructor(
    private readonly workspaceQueryBuilderFactory: WorkspaceQueryBuilderFactory,
    private readonly workspaceDataSourceService: WorkspaceDataSourceService,
  ) {}

  async findMany<
    Record extends IRecord = IRecord,
    Filter extends RecordFilter = RecordFilter,
    OrderBy extends RecordOrderBy = RecordOrderBy,
  >(
    args: FindManyResolverArgs<Filter, OrderBy>,
    options: WorkspaceQueryRunnerOptions,
  ): Promise<IConnection<Record> | undefined> {
    const { workspaceId, targetTableName } = options;
    const query = this.workspaceQueryBuilderFactory.findMany(args, options);
    const result = await this.execute(query, workspaceId);

    return this.parseResult<IConnection<Record>>(result, targetTableName, '');
  }

  async findOne<
    Record extends IRecord = IRecord,
    Filter extends RecordFilter = RecordFilter,
  >(
    args: FindOneResolverArgs<Filter>,
    options: WorkspaceQueryRunnerOptions,
  ): Promise<Record | undefined> {
    if (!args.filter || Object.keys(args.filter).length === 0) {
      throw new BadRequestException('Missing filter argument');
    }
    const { workspaceId, targetTableName } = options;
    const query = this.workspaceQueryBuilderFactory.findOne(args, options);
    const result = await this.execute(query, workspaceId);
    const parsedResult = this.parseResult<IConnection<Record>>(
      result,
      targetTableName,
      '',
    );

    return parsedResult?.edges?.[0]?.node;
  }

  async createMany<Record extends IRecord = IRecord>(
    args: CreateManyResolverArgs<Record>,
    options: WorkspaceQueryRunnerOptions,
  ): Promise<Record[] | undefined> {
    const { workspaceId, targetTableName } = options;
    const query = this.workspaceQueryBuilderFactory.createMany(args, options);
    const result = await this.execute(query, workspaceId);

    return this.parseResult<PGGraphQLMutation<Record>>(
      result,
      targetTableName,
      'insertInto',
    )?.records;
  }

  async createOne<Record extends IRecord = IRecord>(
    args: CreateOneResolverArgs<Record>,
    options: WorkspaceQueryRunnerOptions,
  ): Promise<Record | undefined> {
    const records = await this.createMany({ data: [args.data] }, options);

    return records?.[0];
  }

  async updateOne<Record extends IRecord = IRecord>(
    args: UpdateOneResolverArgs<Record>,
    options: WorkspaceQueryRunnerOptions,
  ): Promise<Record | undefined> {
    const { workspaceId, targetTableName } = options;

    console.log({
      workspaceId,
      targetTableName,
    });
    const query = this.workspaceQueryBuilderFactory.updateOne(args, options);

    console.log({ query });

    const result = await this.execute(query, workspaceId);

    console.log('HEY');

    return this.parseResult<PGGraphQLMutation<Record>>(
      result,
      targetTableName,
      'update',
    )?.records?.[0];
  }

  async deleteOne<Record extends IRecord = IRecord>(
    args: DeleteOneResolverArgs,
    options: WorkspaceQueryRunnerOptions,
  ): Promise<Record | undefined> {
    const { workspaceId, targetTableName } = options;
    const query = this.workspaceQueryBuilderFactory.deleteOne(args, options);
    const result = await this.execute(query, workspaceId);

    return this.parseResult<PGGraphQLMutation<Record>>(
      result,
      targetTableName,
      'deleteFrom',
    )?.records?.[0];
  }

  private async execute(
    query: string,
    workspaceId: string,
  ): Promise<PGGraphQLResult | undefined> {
    const workspaceDataSource =
      await this.workspaceDataSourceService.connectToWorkspaceDataSource(
        workspaceId,
      );

    await workspaceDataSource?.query(`
      SET search_path TO ${this.workspaceDataSourceService.getSchemaName(
        workspaceId,
      )};
    `);

    const queryFormatted = query
      .replace('neq:null', 'is:NOT_NULL')
      .replace('eq:null', 'is:NULL');

    const results = await workspaceDataSource?.query<PGGraphQLResult>(`
      SELECT graphql.resolve($$
        ${queryFormatted}
      $$);
    `);

    console.log(
      JSON.stringify({
        results,
      }),
    );

    return results;
  }

  private parseResult<Result>(
    graphqlResult: PGGraphQLResult | undefined,
    targetTableName: string,
    command: string,
  ): Result {
    const entityKey = `${command}${targetTableName}Collection`;
    const result = graphqlResult?.[0]?.resolve?.data?.[entityKey];
    const errors = graphqlResult?.[0]?.resolve?.errors;

    console.log('Result : ', graphqlResult?.[0]?.resolve);

    if (Array.isArray(errors) && errors.length > 0) {
      console.error('GraphQL errors', errors);
    }

    if (!result) {
      throw new BadRequestException('Malformed result from GraphQL query');
    }

    return parseResult(result);
  }
}
