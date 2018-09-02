import { take, cancel, call, fork, cancelled, put } from 'redux-saga/effects';
import { VIEW_REDIRECT_SUCCESS } from './constants';
import { isSystemError } from '../lib';

/*
 * View life cycle scenario saga.
 * It must handle all errors and do clean-up on cancelation (happens on soft/hard redirect).
 *
 * When the view wants to exit during its life cycle, it must call softRedirectSaga
 * which cancels life cycle scenario-saga in case of successful redirect,
 * or throws error(s) otherwise
 * => softRedirectSaga must be passed to all worker sagas.
 */
const scenarioSaga = /* istanbul ignore next */ function*({
  modelDefinition,
  softRedirectSaga,
  transitions,
  viewName
}) {
  let lastTask;

  while (true) {
    const action = yield take([
      ...Object.keys(transitions.blocking),
      ...Object.keys(transitions.nonBlocking)
    ]);

    // Automatically cancel any task started previously if it's still running.
    if (lastTask) {
      yield cancel(lastTask);
    }

    if (Object.keys(transitions.blocking).indexOf(action.type) > -1) {
      try {
        yield call(transitions.blocking[action.type], {
          modelDefinition,
          softRedirectSaga,
          action: {
            ...action,
            meta: {
              ...action.meta,
              spawner: viewName
            }
          }
        });
      } catch (err) {
        // Swallow custom errors.
        if (isSystemError(err)) {
          throw err;
        }
      }
    } else if (Object.keys(transitions.nonBlocking).indexOf(action.type) > -1) {
      lastTask = yield fork(function*() {
        try {
          yield call(transitions.nonBlocking[action.type], {
            modelDefinition,
            softRedirectSaga,
            action: {
              ...action,
              meta: {
                ...action.meta,
                spawner: viewName
              }
            }
          });
        } catch (err) {
          // Swallow custom errors.
          if (isSystemError(err)) {
            throw err;
          }
        }
      });
    }
  }
};

export default /* istanbul ignore next */ function*({
  modelDefinition,
  softRedirectSaga,
  transitions,
  viewName
}) {
  try {
    yield call(scenarioSaga, {
      modelDefinition,
      softRedirectSaga,
      transitions,
      viewName
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: VIEW_REDIRECT_SUCCESS(viewName)
      });
    }
  }
}
