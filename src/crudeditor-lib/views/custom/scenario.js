import { put, spawn } from 'redux-saga/effects';
import { VIEW_SOFT_REDIRECT, VIEW_INITIALIZE } from '../../common/constants';
import redirectSaga from '../../common/workerSagas/redirect';
import scenarioSaga from '../../common/scenario';

const transitions = {
  blocking: {},
  nonBlocking: {
    [VIEW_SOFT_REDIRECT]: redirectSaga
  }
};

// See Search View scenario for detailed description of the saga.
export default viewName => function*({
  modelDefinition,
  softRedirectSaga,
  viewState,
  source
}) {
  yield put({
    type: VIEW_INITIALIZE(viewName),
    payload: viewState,
    meta: { source }
  });

  return (yield spawn(scenarioSaga, {
    modelDefinition,
    softRedirectSaga,
    transitions,
    viewName
  }));
}
