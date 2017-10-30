import { take, cancel, call, fork, cancelled, put, spawn } from 'redux-saga/effects';

import deleteSaga from './workerSagas/delete';
import editSaga from './workerSagas/edit';
import exitSaga from './workerSagas/exit';
import saveSaga from './workerSagas/save';

import { INSTANCES_DELETE } from '../../common/constants';

import {
  INSTANCE_SAVE,
  VIEW_EXIT,
  TAB_SELECT,

  VIEW_INITIALIZE_REQUEST,
  VIEW_INITIALIZE_FAIL,
  VIEW_INITIALIZE_SUCCESS,

  VIEW_REDIRECT_SUCCESS
} from './constants';

// 'inc' is a generator used to increment 'navigation offset' value
// to handle 'Save and Next' functionality
function* inc() {
  let i = 1;
  while (true) {
    yield i++
  }
}

// See Search View scenarioSaga in ../search/scenario for detailed description of the saga.
function* scenarioSaga({ modelDefinition, softRedirectSaga, searchParams }) {
  const choices = {
    blocking: {
      [INSTANCES_DELETE]: deleteSaga,
    },
    nonBlocking: {
      [INSTANCE_SAVE]: saveSaga,
      [VIEW_EXIT]: exitSaga
    }
  }

  const nextInc = inc();

  let lastTask;

  while (true) {
    const action = yield take([
      ...Object.keys(choices.blocking),
      ...Object.keys(choices.nonBlocking)
    ]);

    // Automatically cancel any task started previously if it's still running.
    if (lastTask) {
      yield cancel(lastTask);
    }

    if (~Object.keys(choices.blocking).indexOf(action.type)) {
      try {
        yield call(choices.blocking[action.type], {
          modelDefinition,
          softRedirectSaga,
          action
        });
      } catch (err) {
        // Swallow custom errors.
        if (err instanceof Error) {
          throw err;
        }
      }
    } else if (~Object.keys(choices.nonBlocking).indexOf(action.type)) {
      lastTask = yield fork(function*() {
        try {
          yield call(choices.nonBlocking[action.type], {
            modelDefinition,
            softRedirectSaga,
            action,
            searchParams: {
              ...searchParams,
              nextInc
            }
          });
        } catch (err) {
          // Swallow custom errors.
          if (err instanceof Error) {
            throw err;
          }
        }
      });
    }
  }
}

// See Search View scenario for detailed description of the saga.
export default function*({
  modelDefinition,
  softRedirectSaga,
  viewState: {
    instance,
    tab: tabName,
    // get searchParams from 'search' view
    searchParams
  },
  source
}) {
  yield put({
    type: VIEW_INITIALIZE_REQUEST,
    meta: { source }
  });

  try {
    yield call(editSaga, {
      modelDefinition,
      action: {
        payload: {
          instance,
          searchParams
        },
        meta: { source }
      }
    });
  } catch (err) {
    yield put({
      type: VIEW_INITIALIZE_FAIL,
      payload: err,
      error: true,
      meta: { source }
    });
    throw err; // Initialization error(s) are forwarded to the parent saga.
  }

  yield put({
    type: TAB_SELECT,
    payload: { tabName },
    meta: { source }
  });

  yield put({
    type: VIEW_INITIALIZE_SUCCESS,
    meta: { source }
  });

  return (yield spawn(function*() {
    try {
      yield call(scenarioSaga, { modelDefinition, softRedirectSaga, searchParams });
    } finally {
      if (yield cancelled()) {
        yield put({
          type: VIEW_REDIRECT_SUCCESS
        });
      }
    }
  }));
}
