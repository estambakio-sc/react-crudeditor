import cloneDeep from 'lodash/cloneDeep';
import u from 'updeep';

import {
  STATUS_READY,
  STATUS_REDIRECTING,
  STATUS_UNINITIALIZED,

  VIEW_INITIALIZE,
  VIEW_REDIRECT_REQUEST,
  VIEW_REDIRECT_FAIL,
  VIEW_REDIRECT_SUCCESS
} from '../../common/constants';

const defaultStoreStateTemplate = {
  status: STATUS_UNINITIALIZED
};

/*
 * XXX:
 * Only objects and arrays are allowed at branch nodes.
 * Only primitive data types are allowed at leaf nodes.
 */

export default viewName => (modelDefinition, i18n) => (
  storeState = cloneDeep(defaultStoreStateTemplate),
  { type, payload, meta }
) => {
  if (storeState.status === STATUS_UNINITIALIZED && type !== VIEW_INITIALIZE(viewName)) {
    return storeState;
  }

  let newStoreStateSlice = {};

  if (type === VIEW_INITIALIZE(viewName)) {
    newStoreStateSlice.status = STATUS_READY;
  } else if (type === VIEW_REDIRECT_REQUEST(viewName)) {
    newStoreStateSlice.status = STATUS_REDIRECTING;
  } else if (type === VIEW_REDIRECT_FAIL(viewName)) {
    newStoreStateSlice.status = STATUS_READY;
  } else if (type === VIEW_REDIRECT_SUCCESS(viewName)) {
    // Reseting the store to initial uninitialized state.
    newStoreStateSlice = u.constant(cloneDeep(defaultStoreStateTemplate));
  }

  return u(newStoreStateSlice, storeState); // returned object is frozen for NODE_ENV === 'development'
};
