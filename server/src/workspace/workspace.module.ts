import { Module } from '@nestjs/common';

import { MetadataModule } from 'src/metadata/metadata.module';
import { DataSourceModule } from 'src/metadata/data-source/data-source.module';
import { ObjectMetadataModule } from 'src/metadata/object-metadata/object-metadata.module';

import { WorkspaceFactory } from './workspace.factory';

import { WorkspaceSchemaBuilderModule } from './workspace-schema-builder/workspace-schema-builder.module';
import { WorkspaceResolverBuilderModule } from './workspace-resolver-builder/workspace-resolver-builder.module';

@Module({
  imports: [
    MetadataModule,
    DataSourceModule,
    ObjectMetadataModule,
    WorkspaceSchemaBuilderModule,
    WorkspaceResolverBuilderModule,
  ],
  providers: [WorkspaceFactory],
  exports: [WorkspaceFactory],
})
export class WorkspaceModule {}
