import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useFindManyObjectRecords } from '@/object-record/hooks/useFindManyObjectRecords';
import { PaginatedObjectTypeResults } from '@/object-record/types/PaginatedObjectTypeResults';
import { pipelineAvailableFieldDefinitions } from '@/pipeline/constants/pipelineAvailableFieldDefinitions';
import { Opportunity } from '@/pipeline/types/Opportunity';
import { PipelineStep } from '@/pipeline/types/PipelineStep';
import { useBoardActionBarEntries } from '@/ui/layout/board/hooks/useBoardActionBarEntries';
import { useBoardContext } from '@/ui/layout/board/hooks/useBoardContext';
import { useBoardContextMenuEntries } from '@/ui/layout/board/hooks/useBoardContextMenuEntries';
import { availableBoardCardFieldsScopedState } from '@/ui/layout/board/states/availableBoardCardFieldsScopedState';
import { boardCardFieldsScopedState } from '@/ui/layout/board/states/boardCardFieldsScopedState';
import { isBoardLoadedState } from '@/ui/layout/board/states/isBoardLoadedState';
import { turnFilterIntoWhereClause } from '@/ui/object/object-filter-dropdown/utils/turnFilterIntoWhereClause';
import { useRecoilScopedState } from '@/ui/utilities/recoil-scope/hooks/useRecoilScopedState';
import { useViewScopedStates } from '@/views/hooks/internal/useViewScopedStates';
import { useView } from '@/views/hooks/useView';
import { ViewType } from '@/views/types/ViewType';
import { mapViewFieldsToBoardFieldDefinitions } from '@/views/utils/mapViewFieldsToBoardFieldDefinitions';
import { Company } from '~/generated-metadata/graphql';
import { opportunitiesBoardOptions } from '~/pages/opportunities/opportunitiesBoardOptions';

import { useUpdateCompanyBoardCardIds } from '../hooks/useUpdateBoardCardIds';
import { useUpdateCompanyBoard } from '../hooks/useUpdateCompanyBoardColumns';

export const HooksCompanyBoardEffect = () => {
  const {
    setAvailableFilterDefinitions,
    setAvailableSortDefinitions,
    setAvailableFieldDefinitions,
    setEntityCountInCurrentView,
    setViewObjectMetadataId,
    setViewType,
  } = useView();

  const { currentViewFiltersState, currentViewFieldsState } =
    useViewScopedStates();

  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  const currentViewFields = useRecoilValue(currentViewFieldsState);
  const currentViewFilters = useRecoilValue(currentViewFiltersState);

  const [, setIsBoardLoaded] = useRecoilState(isBoardLoadedState);

  const { BoardRecoilScopeContext } = useBoardContext();

  const [, setBoardCardFields] = useRecoilScopedState(
    boardCardFieldsScopedState,
    BoardRecoilScopeContext,
  );

  const [, setAvailableBoardCardFields] = useRecoilScopedState(
    availableBoardCardFieldsScopedState,
    BoardRecoilScopeContext,
  );
  const updateCompanyBoardCardIds = useUpdateCompanyBoardCardIds();
  const updateCompanyBoard = useUpdateCompanyBoard();

  useFindManyObjectRecords({
    objectNamePlural: 'pipelineStepsV2',
    filter: {},
    onCompleted: useCallback(
      (data: PaginatedObjectTypeResults<PipelineStep>) => {
        setPipelineSteps(data.edges.map((edge) => edge.node));
      },
      [],
    ),
  });

  const whereFilters = useMemo(() => {
    return {
      AND: [
        {
          pipelineStageId: {
            in: pipelineSteps.map((pipelineStep) => pipelineStep.id),
          },
        },
        ...(currentViewFilters?.map(turnFilterIntoWhereClause) || []),
      ],
    };
  }, [currentViewFilters, pipelineSteps]) as any;

  useFindManyObjectRecords({
    skip: !pipelineSteps.length,
    objectNamePlural: 'opportunitiesV2',
    filter: whereFilters,
    onCompleted: useCallback(
      (_data: PaginatedObjectTypeResults<Opportunity>) => {
        const pipelineProgresses: Array<Opportunity> = [];

        updateCompanyBoardCardIds(pipelineProgresses);

        setOpportunities(pipelineProgresses);
        setIsBoardLoaded(true);
      },
      [setIsBoardLoaded, updateCompanyBoardCardIds],
    ),
  });

  useFindManyObjectRecords({
    skip: !opportunities.length,
    objectNamePlural: 'companiesV2',
    filter: {
      id: {
        in: opportunities.map((opportuntiy) => opportuntiy.companyId || ''),
      },
    },
    onCompleted: useCallback((data: PaginatedObjectTypeResults<Company>) => {
      setCompanies(data.edges.map((edge) => edge.node));
    }, []),
  });

  useEffect(() => {
    setAvailableFilterDefinitions(opportunitiesBoardOptions.filterDefinitions);
    setAvailableSortDefinitions?.(opportunitiesBoardOptions.sortDefinitions);
    setAvailableFieldDefinitions?.(pipelineAvailableFieldDefinitions);
  }, [
    setAvailableFieldDefinitions,
    setAvailableFilterDefinitions,
    setAvailableSortDefinitions,
  ]);

  useEffect(() => {
    setViewObjectMetadataId?.('company');
    setViewType?.(ViewType.Kanban);
  }, [setViewObjectMetadataId, setViewType]);

  const [searchParams] = useSearchParams();

  const loading = !companies;

  const { setActionBarEntries } = useBoardActionBarEntries();
  const { setContextMenuEntries } = useBoardContextMenuEntries();

  useEffect(() => {
    if (!loading && opportunities && companies) {
      setActionBarEntries();
      setContextMenuEntries();
      setAvailableBoardCardFields(pipelineAvailableFieldDefinitions);
      updateCompanyBoard(pipelineSteps, opportunities, companies);
      setEntityCountInCurrentView(companies.length);
    }
  }, [
    loading,
    updateCompanyBoard,
    setActionBarEntries,
    setContextMenuEntries,
    searchParams,
    setEntityCountInCurrentView,
    setAvailableBoardCardFields,
    opportunities,
    companies,
    pipelineSteps,
  ]);

  useEffect(() => {
    if (currentViewFields) {
      setBoardCardFields(
        mapViewFieldsToBoardFieldDefinitions(
          currentViewFields,
          pipelineAvailableFieldDefinitions,
        ),
      );
    }
  }, [currentViewFields, setBoardCardFields]);

  return <></>;
};
