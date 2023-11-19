import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { FieldMetadataType } from '~/generated-metadata/graphql';

import { dataTypes } from '../../constants/dataTypes';

const StyledDataType = styled.div<{ value: FieldMetadataType }>`
  align-items: center;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.border.radius.sm};
  display: flex;
  font-size: ${({ theme }) => theme.font.size.sm};
  gap: ${({ theme }) => theme.spacing(1)};
  height: 20px;
  padding: 0 ${({ theme }) => theme.spacing(2)};

  ${({ theme, value }) =>
    value === FieldMetadataType.Relation
      ? css`
          border-color: ${theme.color.purple20};
          color: ${theme.color.purple};
        `
      : ''}
`;

type SettingsObjectFieldDataTypeProps = {
  value: FieldMetadataType;
};

export const SettingsObjectFieldDataType = ({
  value,
}: SettingsObjectFieldDataTypeProps) => {
  const theme = useTheme();

  const { label, Icon } = dataTypes?.[value];

  return (
    <StyledDataType value={value}>
      <Icon size={theme.icon.size.sm} />
      {label}
    </StyledDataType>
  );
};
