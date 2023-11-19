import styled from '@emotion/styled';

import { RecordTable } from '@/ui/object/record-table/components/RecordTable';
import { TableOptionsDropdownId } from '@/ui/object/record-table/constants/TableOptionsDropdownId';
import { TableOptionsDropdown } from '@/ui/object/record-table/options/components/TableOptionsDropdown';
import { RecordTableScope } from '@/ui/object/record-table/scopes/RecordTableScope';
import { ViewBar } from '@/views/components/ViewBar';
import { ViewScope } from '@/views/scopes/ViewScope';
import { useUpdateOneCompanyMutation } from '~/generated/graphql';

import CompanyTableEffect from './CompanyTableEffect';
import { CompanyTableMockDataEffect } from './CompanyTableMockDataEffect';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

export const CompanyTableMockMode = () => {
  return (
    <StyledContainer>
      <ViewScope viewScopeId="company-table-mock-mode">
        <RecordTableScope
          recordTableScopeId="company-table-mock-mode-table"
          onColumnsChange={() => {}}
          onEntityCountChange={() => {}}
        >
          <CompanyTableEffect />
          <CompanyTableMockDataEffect />
          <ViewBar
            optionsDropdownButton={<TableOptionsDropdown />}
            optionsDropdownScopeId={TableOptionsDropdownId}
          />

          <RecordTable updateEntityMutation={useUpdateOneCompanyMutation} />
        </RecordTableScope>
      </ViewScope>
    </StyledContainer>
  );
};
