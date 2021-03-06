import {
  FORM_FILTER_RESET,
  FORM_FILTER_UPDATE,
  GOTO_PAGE_UPDATE,
  INSTANCES_SEARCH,
  INSTANCE_SELECT,
  INSTANCE_DESELECT,
  ALL_INSTANCES_SELECT,
  ALL_INSTANCES_DESELECT,
  SEARCH_FORM_TOGGLE
} from './constants';

export const
  searchInstances = /* istanbul ignore next */ ({
    filter,
    sort,
    order,
    max,
    offset
  } = {}) => ({
    type: INSTANCES_SEARCH,
    payload: {
      filter,
      sort,
      order,
      max,
      offset
    }
  }),

  updateFormFilter = /* istanbul ignore next */ ({
    name,
    value
  }) => ({
    type: FORM_FILTER_UPDATE,
    payload: {
      name,
      value
    }
  }),

  updateGotoPage = /* istanbul ignore next */ page => ({
    type: GOTO_PAGE_UPDATE,
    payload: { page }
  }),

  resetFormFilter = _ => ({
    type: FORM_FILTER_RESET
  }),

  toggleSelected = /* istanbul ignore next */ ({ selected, instance }) => ({
    type: selected ? INSTANCE_SELECT : INSTANCE_DESELECT,
    payload: { instance }
  }),

  toggleSelectedAll = /* istanbul ignore next */ selected => ({
    type: selected ? ALL_INSTANCES_SELECT : ALL_INSTANCES_DESELECT
  }),

  toggleSearchForm = _ => ({
    type: SEARCH_FORM_TOGGLE
  });
