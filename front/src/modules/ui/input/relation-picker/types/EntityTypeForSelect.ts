import { ActivityTargetableEntityType } from '@/activities/types/ActivityTargetableEntity';
import { PipelineProgressableType } from '~/generated/graphql';

export enum Entity {
  Company = 'Company',
  Person = 'Person',
  User = 'User',
  WorkspaceMember = 'WorkspaceMember',
}

export type EntityTypeForSelect =
  | ActivityTargetableEntityType
  | PipelineProgressableType
  | Entity;
