import { call, put, cancel, takeLatest } from 'redux-saga/effects';
import {
  ACTIVE_VIEW_CHANGE,
  DEFAULT_VIEW,
  ERROR_UNKNOWN_VIEW,
  ERROR_FORBIDDEN_VIEW,
  VIEW_HARD_REDIRECT,
  VIEW_ERROR
} from './common/constants';
import { sagas, isStandardView } from './views';

export default function*(modelDefinition) {
  const initializeViewSagas = sagas(modelDefinition);

  let activeViewScenarioTask;

  /*
   * The saga handles an active view request for replacements with another view.
   *
   * The saga attempts to initialize requested view without displaying it.
   * When successful, it replaces currently active view with requested one
   * (by canceling active activeViewScenarioTask and displaying requested view).
   * When view initialization failured, the saga throws error(s).
   */
  function* softRedirectSaga({ viewName, viewState, ...additionalArgs }) {
    const initializeViewSaga = initializeViewSagas[viewName];

    if (!initializeViewSaga) {
      if (isStandardView(viewName)) {
        throw ERROR_FORBIDDEN_VIEW(viewName);
      }
      throw ERROR_UNKNOWN_VIEW(viewName);
    }

    const oldViewScenarioTask = activeViewScenarioTask;

    // Initialization error(s) are forwarded to the parent saga.
    activeViewScenarioTask = yield call(initializeViewSaga, {
      modelDefinition,
      softRedirectSaga,
      viewState,
      ...additionalArgs
    });

    yield put({
      type: ACTIVE_VIEW_CHANGE,
      payload: { viewName }
    });

    // It must be the very last statement because it cancels this saga also,
    // since it is an ancestor of oldViewScenarioTask.
    yield cancel(oldViewScenarioTask);
  }

  /*
   * The saga handles cases when currently active view, if exists, must not remain:
   * -- initial CRUD Editor loading
   * and
   * -- CRID Editor reloading when forced by owner application.
   *
   * Requested view gets displayed immediately even if uninitialized.
   *
   * The view either remains or gets replaced with error view (if initialization failed).
   */
  function* hardRedirectSaga({
    payload,
    meta: { source } = {}
  }) {
    let {
      viewName = DEFAULT_VIEW,
      viewState = {}
    } = payload;

    let initializeViewSaga = initializeViewSagas[viewName];

    if (!initializeViewSaga) {
      initializeViewSaga = initializeViewSagas[VIEW_ERROR];
      viewState = isStandardView(viewName) ?
        ERROR_FORBIDDEN_VIEW(viewName) :
        ERROR_UNKNOWN_VIEW(viewName);
      viewName = VIEW_ERROR;
    }

    yield put({
      type: ACTIVE_VIEW_CHANGE,
      payload: { viewName },
      meta: { source }
    });

    if (activeViewScenarioTask) {
      yield cancel(activeViewScenarioTask);
    }

    try {
      activeViewScenarioTask = yield call(initializeViewSaga, {
        modelDefinition,
        softRedirectSaga,
        viewState,
        source
      });
    } catch (err) {
      viewName = VIEW_ERROR;

      yield put({
        type: ACTIVE_VIEW_CHANGE,
        payload: { viewName },
        meta: { source }
      });

      activeViewScenarioTask = yield call(initializeViewSagas[VIEW_ERROR], {
        modelDefinition,
        softRedirectSaga,
        viewState: err,
        source
      });
    }
  }

  yield takeLatest(VIEW_HARD_REDIRECT, hardRedirectSaga);
}
