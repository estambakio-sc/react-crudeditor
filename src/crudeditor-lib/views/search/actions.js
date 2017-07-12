import {
  FORM_FILTER_RESET,
  FORM_FILTER_UPDATE,
  INSTANCES_DELETE,
  INSTANCES_SEARCH,
  INSTANCE_SELECT,
  INSTANCE_DESELECT,
  ALL_INSTANCES_SELECT,
  ALL_INSTANCES_DESELECT
} from './constants';

export const
  searchInstances = ({
    filter,
    sort,
    order,
    max,
    offset
  }, source) => ({
    type: INSTANCES_SEARCH,
    payload: {
      filter,
      sort,
      order,
      max,
      offset
    },
    meta: { source }
  }),

  updateFormFilter => ({
    name,
    value
  }) => ({
    type: FORM_FILTER_UPDATE,
    payload: {
      name,
      value
    }
  }),

  deleteInstances = instances => ({
    type: INSTANCES_DELETE,
    payload: { instances }
  }),

  resetFormFilter => _ => ({
    type: FORM_FILTER_RESET
  }),

  toggleSelected = (isSelected, instance) => ({
    type: isSelected ? 'INSTANCE_SELECT' : 'INSTANCE_DESELECT',
    payload: { instance }
  }),

  toggleSelectedAll = isSelected => ({
    type: isSelected ? 'ALL_INSTANCES_SELECT' : 'ALL_INSTANCES_DESELECT'
  });
