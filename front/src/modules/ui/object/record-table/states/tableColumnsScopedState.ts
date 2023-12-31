import { FieldMetadata } from '@/ui/object/field/types/FieldMetadata';
import { createScopedState } from '@/ui/utilities/recoil-scope/utils/createScopedState';

import { ColumnDefinition } from '../types/ColumnDefinition';

export const tableColumnsScopedState = createScopedState<
  ColumnDefinition<FieldMetadata>[]
>({
  key: 'tableColumnsScopedState',
  defaultValue: [],
});
