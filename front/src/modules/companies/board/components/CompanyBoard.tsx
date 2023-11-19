import styled from '@emotion/styled';

import { BoardContext } from '@/companies/states/contexts/BoardContext';
import { BoardOptionsDropdown } from '@/ui/layout/board/components/BoardOptionsDropdown';
import { BoardOptionsDropdownId } from '@/ui/layout/board/components/constants/BoardOptionsDropdownId';
import {
  EntityBoard,
  EntityBoardProps,
} from '@/ui/layout/board/components/EntityBoard';
import { EntityBoardActionBar } from '@/ui/layout/board/components/EntityBoardActionBar';
import { EntityBoardContextMenu } from '@/ui/layout/board/components/EntityBoardContextMenu';
import { ViewBar } from '@/views/components/ViewBar';
import { ViewScope } from '@/views/scopes/ViewScope';
import { opportunitiesBoardOptions } from '~/pages/opportunities/opportunitiesBoardOptions';

import { HooksCompanyBoardEffect } from '../../components/HooksCompanyBoardEffect';
import { CompanyBoardRecoilScopeContext } from '../../states/recoil-scope-contexts/CompanyBoardRecoilScopeContext';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  width: 100%;
`;

type CompanyBoardProps = Pick<
  EntityBoardProps,
  'onColumnAdd' | 'onColumnDelete' | 'onEditColumnTitle'
>;

export const CompanyBoard = ({
  onColumnAdd,
  onColumnDelete,
  onEditColumnTitle,
}: CompanyBoardProps) => {
  const viewScopeId = 'company-board-view';
  return (
    <ViewScope viewScopeId={viewScopeId}>
      <StyledContainer>
        <BoardContext.Provider
          value={{
            BoardRecoilScopeContext: CompanyBoardRecoilScopeContext,
          }}
        >
          <ViewBar
            optionsDropdownButton={<BoardOptionsDropdown />}
            optionsDropdownScopeId={BoardOptionsDropdownId}
          />
          <HooksCompanyBoardEffect />
          <EntityBoard
            boardOptions={opportunitiesBoardOptions}
            onColumnAdd={onColumnAdd}
            onColumnDelete={onColumnDelete}
            onEditColumnTitle={onEditColumnTitle}
          />
          <EntityBoardActionBar />
          <EntityBoardContextMenu />
        </BoardContext.Provider>
      </StyledContainer>
    </ViewScope>
  );
};
