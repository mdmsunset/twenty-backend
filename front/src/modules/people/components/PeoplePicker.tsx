import { useEffect } from 'react';

import { useFilteredSearchEntityQuery } from '@/search/hooks/useFilteredSearchEntityQuery';
import { SingleEntitySelect } from '@/ui/input/relation-picker/components/SingleEntitySelect';
import { relationPickerSearchFilterScopedState } from '@/ui/input/relation-picker/states/relationPickerSearchFilterScopedState';
import { EntityForSelect } from '@/ui/input/relation-picker/types/EntityForSelect';
import { Entity } from '@/ui/input/relation-picker/types/EntityTypeForSelect';
import { useRecoilScopedState } from '@/ui/utilities/recoil-scope/hooks/useRecoilScopedState';
import { useSearchPeopleQuery } from '~/generated/graphql';

export type PeoplePickerProps = {
  personId: string | null;
  companyId?: string;
  onSubmit: (newPersonId: PersonForSelect | null) => void;
  onCancel?: () => void;
  onCreate?: () => void;
  excludePersonIds?: string[];
  initialSearchFilter?: string | null;
};

export type PersonForSelect = EntityForSelect & {
  entityType: Entity.Person;
};

export const PeoplePicker = ({
  personId,
  companyId,
  onSubmit,
  onCancel,
  onCreate,
  excludePersonIds,
  initialSearchFilter,
}: PeoplePickerProps) => {
  const [relationPickerSearchFilter, setRelationPickerSearchFilter] =
    useRecoilScopedState(relationPickerSearchFilterScopedState);

  useEffect(() => {
    setRelationPickerSearchFilter(initialSearchFilter ?? '');
  }, [initialSearchFilter, setRelationPickerSearchFilter]);

  const queryFilters = [
    {
      fieldNames: ['firstName', 'lastName'],
      filter: relationPickerSearchFilter,
    },
  ];

  if (companyId) {
    queryFilters.push({
      fieldNames: ['companyId'],
      filter: companyId,
    });
  }

  const people = useFilteredSearchEntityQuery({
    queryHook: useSearchPeopleQuery,
    selectedIds: [personId ?? ''],
    filters: queryFilters,
    mappingFunction: (person) => ({
      entityType: Entity.Person,
      id: person.id,
      name: `${person.firstName} ${person.lastName}`,
      avatarType: 'rounded',
      avatarUrl: person.avatarUrl ?? '',
      originalEntity: person,
    }),
    orderByField: 'firstName',
    excludeEntityIds: excludePersonIds,
  });

  const handleEntitySelected = async (
    selectedPerson: PersonForSelect | null | undefined,
  ) => {
    onSubmit(selectedPerson ?? null);
  };

  return (
    <SingleEntitySelect
      entitiesToSelect={people.entitiesToSelect}
      loading={people.loading}
      onCancel={onCancel}
      onCreate={onCreate}
      onEntitySelected={handleEntitySelected}
      selectedEntity={people.selectedEntities[0]}
    />
  );
};
