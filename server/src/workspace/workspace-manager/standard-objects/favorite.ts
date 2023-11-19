import { FieldMetadataType } from 'src/metadata/field-metadata/field-metadata.entity';

const favoriteMetadata = {
  nameSingular: 'favoriteV2',
  namePlural: 'favoritesV2',
  labelSingular: 'Favorite',
  labelPlural: 'Favorites',
  targetTableName: 'favorite',
  description: 'A favorite',
  icon: 'IconHeart',
  isActive: true,
  isSystem: true,
  fields: [
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.NUMBER,
      name: 'position',
      label: 'Position',
      targetColumnMap: {
        value: 'position',
      },
      description: 'Favorite position',
      icon: 'IconList',
      isNullable: false,
      defaultValue: { value: 0 },
    },
    // Relations
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.RELATION,
      name: 'workspaceMember',
      label: 'Workspace Member',
      targetColumnMap: {},
      description: 'Favorite workspace member',
      icon: 'IconCircleUser',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.RELATION,
      name: 'person',
      label: 'Person',
      targetColumnMap: {},
      description: 'Favorite person',
      icon: 'IconUser',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.RELATION,
      name: 'company',
      label: 'Company',
      targetColumnMap: {},
      description: 'Favorite company',
      icon: 'IconBuildingSkyscraper',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.UUID,
      name: 'workspaceMemberId',
      label: 'Workspace Member ID (foreign key)',
      targetColumnMap: {},
      description: 'Foreign key for workspace member',
      icon: undefined,
      isNullable: false,
      isSystem: true,
      defaultValue: undefined,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.UUID,
      name: 'personId',
      label: 'Person ID (foreign key)',
      targetColumnMap: {},
      description: 'Foreign key for person',
      icon: undefined,
      isNullable: true,
      isSystem: true,
      defaultValue: undefined,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.UUID,
      name: 'companyId',
      label: 'Company ID (foreign key)',
      targetColumnMap: {},
      description: 'Foreign key for company',
      icon: undefined,
      isNullable: true,
      isSystem: true,
      defaultValue: undefined,
    },
  ],
};

export default favoriteMetadata;
