import { call, put } from 'redux-saga/effects';
import { VIEW_REDIRECT_REQUEST, VIEW_REDIRECT_FAIL } from '../constants';

/*
 * XXX: in case of failure, a worker saga must dispatch an appropriate action and exit by throwing error(s).
 */
export default function*({
  modelDefinition,
  softRedirectSaga,
  action: {
    payload: {
      view: {
        name: redirectViewName,
        state: redirectViewState
      },
      ...additionalArgs
    },
    meta
  }
}) {
  const currentViewName = meta.spawner;

  yield put({
    type: VIEW_REDIRECT_REQUEST(currentViewName),
    meta
  });

  try {
    yield call(softRedirectSaga, {
      viewName: redirectViewName,
      viewState: redirectViewState,
      ...additionalArgs
    });
  } catch (err) {
    yield put({
      type: VIEW_REDIRECT_FAIL(currentViewName),
      payload: err,
      error: true,
      meta
    });

    throw err;
  }
}
