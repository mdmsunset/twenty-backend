import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOperationName } from '@apollo/client/utilities';

import { useFavorites } from '@/favorites/hooks/useFavorites';
import { GET_PERSON } from '@/people/graphql/queries/getPerson';
import { usePersonQuery } from '@/people/hooks/usePersonQuery';
import { AppPath } from '@/types/AppPath';
import { IconUser } from '@/ui/display/icon';
import { PageBody } from '@/ui/layout/page/PageBody';
import { PageContainer } from '@/ui/layout/page/PageContainer';
import { PageFavoriteButton } from '@/ui/layout/page/PageFavoriteButton';
import { PageHeader } from '@/ui/layout/page/PageHeader';
import { ShowPageAddButton } from '@/ui/layout/show-page/components/ShowPageAddButton';
import { ShowPageLeftContainer } from '@/ui/layout/show-page/components/ShowPageLeftContainer';
import { ShowPageRightContainer } from '@/ui/layout/show-page/components/ShowPageRightContainer';
import { ShowPageSummaryCard } from '@/ui/layout/show-page/components/ShowPageSummaryCard';
import { ShowPageRecoilScopeContext } from '@/ui/layout/states/ShowPageRecoilScopeContext';
import { FieldContext } from '@/ui/object/field/contexts/FieldContext';
import { RecordInlineCell } from '@/ui/object/record-inline-cell/components/RecordInlineCell';
import { PropertyBox } from '@/ui/object/record-inline-cell/property-box/components/PropertyBox';
import { InlineCellHotkeyScope } from '@/ui/object/record-inline-cell/types/InlineCellHotkeyScope';
import { PageTitle } from '@/ui/utilities/page-title/PageTitle';
import { RecoilScope } from '@/ui/utilities/recoil-scope/components/RecoilScope';
import {
  useUpdateOnePersonMutation,
  useUploadPersonPictureMutation,
} from '~/generated/graphql';

import { PeopleFullNameEditableField } from '../../modules/people/editable-field/components/PeopleFullNameEditableField';
import { ShowPageContainer } from '../../modules/ui/layout/page/ShowPageContainer';

import { personShowFieldDefinition } from './constants/personShowFieldDefinitions';

export const PersonShow = () => {
  const personId = useParams().personId ?? '';
  const { createFavorite, deleteFavorite } = useFavorites({
    objectNamePlural: 'peopleV2',
  });
  const navigate = useNavigate();

  const { data, loading } = usePersonQuery(personId);
  const person = data?.findUniquePerson;

  const [uploadPicture] = useUploadPersonPictureMutation();

  useEffect(() => {
    if (!loading && !person) {
      navigate(AppPath.NotFound);
    }
  }, [loading, person, navigate]);

  if (!person) return <></>;

  const isFavorite =
    person.Favorite && person.Favorite?.length > 0 ? true : false;

  const onUploadPicture = async (file: File) => {
    if (!file || !person?.id) {
      return;
    }
    await uploadPicture({
      variables: {
        file,
        id: person.id,
      },
      refetchQueries: [getOperationName(GET_PERSON) ?? ''],
    });
  };

  const handleFavoriteButtonClick = async () => {
    if (isFavorite) deleteFavorite(person.id);
    else createFavorite('person', person.id);
  };

  return (
    <PageContainer>
      <PageTitle title={person.displayName || 'No Name'} />
      <PageHeader title={person.firstName ?? ''} Icon={IconUser} hasBackButton>
        <PageFavoriteButton
          isFavorite={isFavorite}
          onClick={handleFavoriteButtonClick}
        />
        <ShowPageAddButton
          key="add"
          entity={{
            id: person.id,
            type: 'Person',
            relatedEntities: person.company?.id
              ? [
                  {
                    id: person.company?.id,
                    type: 'Company',
                  },
                ]
              : undefined,
          }}
        />
      </PageHeader>
      <PageBody>
        <RecoilScope CustomRecoilScopeContext={ShowPageRecoilScopeContext}>
          <ShowPageContainer>
            <ShowPageLeftContainer>
              <ShowPageSummaryCard
                id={person.id}
                title={person.displayName ?? 'No name'}
                logoOrAvatar={person.avatarUrl ?? undefined}
                date={person.createdAt ?? ''}
                renderTitleEditComponent={() =>
                  person ? (
                    <PeopleFullNameEditableField people={person} />
                  ) : (
                    <></>
                  )
                }
                onUploadPicture={onUploadPicture}
                avatarType="rounded"
              />
              <PropertyBox extraPadding={true}>
                {personShowFieldDefinition.map((fieldDefinition) => {
                  return (
                    <FieldContext.Provider
                      value={{
                        entityId: person.id,
                        recoilScopeId: person.id + fieldDefinition.label,
                        fieldDefinition,
                        useUpdateEntityMutation: useUpdateOnePersonMutation,
                        hotkeyScope: InlineCellHotkeyScope.InlineCell,
                      }}
                      key={person.id + fieldDefinition.label}
                    >
                      <RecordInlineCell />
                    </FieldContext.Provider>
                  );
                })}
              </PropertyBox>
            </ShowPageLeftContainer>
            <ShowPageRightContainer
              entity={{
                id: person.id ?? '',
                type: 'Person',
                relatedEntities: person.company?.id
                  ? [
                      {
                        id: person.company?.id,
                        type: 'Company',
                      },
                    ]
                  : undefined,
              }}
              timeline
              tasks
              notes
              emails
            />
          </ShowPageContainer>
        </RecoilScope>
      </PageBody>
    </PageContainer>
  );
};
