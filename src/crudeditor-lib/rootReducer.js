import { combineReducers } from 'redux';
import common from './common/reducer';
import { reducers } from './views';

export default /* istanbul ignore next */ (modelDefinition, i18n) => {
  const viewReducers = reducers(modelDefinition, i18n);

  return combineReducers({
    common: common(modelDefinition, i18n),
    views: combineReducers(viewReducers)
  });
}
