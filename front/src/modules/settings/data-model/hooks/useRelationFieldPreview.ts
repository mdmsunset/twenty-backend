import { useObjectMetadataItemForSettings } from '@/object-metadata/hooks/useObjectMetadataItemForSettings';
import { useFindManyObjectRecords } from '@/object-record/hooks/useFindManyObjectRecords';

export const useRelationFieldPreview = ({
  relationObjectMetadataId,
  skipDefaultValue,
}: {
  relationObjectMetadataId?: string;
  skipDefaultValue: boolean;
}) => {
  const { findObjectMetadataItemById } = useObjectMetadataItemForSettings();

  const relationObjectMetadataItem = relationObjectMetadataId
    ? findObjectMetadataItemById(relationObjectMetadataId)
    : undefined;

  const { objects: relationObjects } = useFindManyObjectRecords({
    objectNamePlural: relationObjectMetadataItem?.namePlural,
    skip: skipDefaultValue || !relationObjectMetadataItem,
  });

  return {
    defaultValue: relationObjects?.[0],
    entityChipDisplayMapper: (fieldValue?: { id: string }) => ({
      name: fieldValue?.id || relationObjectMetadataItem?.labelSingular || '',
      avatarType: 'squared' as const,
    }),
  };
};
