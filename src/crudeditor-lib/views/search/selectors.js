import { buildViewSelectorWrapper } from '../../selectorWrapper';
import { VIEW_NAME } from './constants';

import { AUDITABLE_FIELDS } from '../../common/constants';

const wrapper = buildViewSelectorWrapper(VIEW_NAME);

const _getViewState = ({
  resultFilter: filter,
  sortParams: {
    field: sort,
    order
  },
  pageParams: {
    max,
    offset
  }
}) => ({
  filter,
  sort,
  order,
  max,
  offset
});

export const

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getViewState = wrapper(_getViewState),

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getDefaultNewInstance = wrapper((storeState, {
    ui: {
      create: {
        defaultNewInstance
      }
    }
  }) => defaultNewInstance && defaultNewInstance(_getViewState(storeState))),

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getViewModelData = wrapper((storeState, {
    model: modelMeta,
    ui: uiMeta
  }) => ({
    entityName: modelMeta.name,
    errors: storeState.errors,
    formFilter: storeState.formFilter,
    formatedFilter: storeState.formatedFilter,
    pageParams: {
      max: storeState.pageParams.max,
      offset: storeState.pageParams.offset
    },
    resultFields: uiMeta.search.resultFields,
    resultFilter: storeState.resultFilter,
    resultInstances: storeState.resultInstances,
    searchableFields: uiMeta.search.searchableFields.map(({
      name,
      render: {
        Component,
        valueProp: {
          name: valuePropName
        }
      }
    }) => ({
      name,
      Component,
      valuePropName
    })),
    selectedInstances: storeState.selectedInstances,
    sortParams: {
      field: storeState.sortParams.field,
      order: storeState.sortParams.order
    },
    totalCount: storeState.totalCount
  }));