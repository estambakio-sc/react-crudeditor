import { put, takeLatest, all, select } from 'redux-saga/effects';

import { searchInstances } from '../views/search/actions';
import { createInstance } from '../views/create/actions';
import { editInstance } from '../views/edit/actions';
//import { showInstance } from '../views/show/actions';

import { getActiveView } from './selectors';

import {
  VIEW_SEARCH,
  VIEW_CREATE,
  VIEW_EDIT,
  VIEW_SHOW,
  DEFAULT_VIEW,
  VIEW_INITIALIZE
} from './constants';

function* onViewInitialize(entityConfiguration, {
  payload: {
    viewName,
    viewState
  },
  meta: {
    source
  }
}) {
  viewName = viewName || DEFAULT_VIEW;

  const actionCreator = (
    viewName === VIEW_SEARCH && searchInstances ||
    viewName === VIEW_CREATE && createInstance  ||
    viewName === VIEW_EDIT   && editInstance
    //viewName === VIEW_SHOW   && showInstance
  );

  if (!actionCreator) {
    throw new Error('Unknown view ' + viewName);
  }

  // ask specific view to process new input and
  // if success display the view, otherwise display error page.
  yield put(actionCreator(viewState, source));
}

export default function*(entityConfiguration) {
  yield all([
    takeLatest(VIEW_INITIALIZE, onViewInitialize, entityConfiguration)  // TODO: cancel all running sagas.
  ]);
}
