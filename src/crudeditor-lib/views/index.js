import {
  VIEW_CREATE,
  VIEW_EDIT,
  VIEW_SHOW,
  VIEW_SEARCH,
  VIEW_ERROR,
  PERMISSION_CREATE,
  PERMISSION_EDIT,
  PERMISSION_VIEW
} from '../common/constants';
import { isAllowed } from '../lib';

import searchView from './search/container';
import createView from './create/container';
import editView from './edit/container';
import showView from './show/container';
import errorView from './error/container';
import customView from './custom/container';

import search from './search/reducer';
import create from './create/reducer';
import edit from './edit/reducer';
import show from './show/reducer';
import error from './error/reducer';
import customViewReducer from './custom/reducer';

import { getViewState as getSearchViewState, getUi as getSearchUi } from './search';
import { getViewState as getCreateViewState, getUi as getCreateUi } from './create';
import { getViewState as getEditViewState, getUi as getEditUi } from './edit';
import { getViewState as getShowViewState, getUi as getShowUi } from './show';
import { getViewState as getErrorViewState } from './error';
import { getUi as getCustomViewUi } from './custom';

import searchViewScenario from './search/scenario';
import createViewScenario from './create/scenario';
import editViewScenario from './edit/scenario';
import showViewScenario from './show/scenario';
import errorViewScenario from './error/scenario';
import customViewScenario from './custom/scenario';

export const isStandardView = viewName => [
  VIEW_CREATE,
  VIEW_EDIT,
  VIEW_SHOW,
  VIEW_SEARCH,
  VIEW_ERROR
].indexOf(viewName) !== -1;

export const containers = modelDefinition => ({
  [VIEW_SEARCH]: searchView,
  [VIEW_CREATE]: createView,
  [VIEW_EDIT]: editView,
  [VIEW_SHOW]: showView,
  [VIEW_ERROR]: errorView,
  ...(
    Object.keys(modelDefinition.ui.views).
      filter(viewName => !isStandardView(viewName)).
      reduce((acc, viewName) => ({ ...acc, [viewName]: customView(viewName) }), {})
  )
});

export const reducers = (modelDefinition, i18n) => {
  const { crudOperations } = modelDefinition.permissions;
  return {
    ...(isAllowed(crudOperations, PERMISSION_VIEW) ? { [VIEW_SEARCH]: search(modelDefinition, i18n) } : null),
    ...(isAllowed(crudOperations, PERMISSION_CREATE) ? { [VIEW_CREATE]: create(modelDefinition, i18n) } : null),
    ...(isAllowed(crudOperations, PERMISSION_EDIT) ? { [VIEW_EDIT]: edit(modelDefinition, i18n) } : null),
    ...(isAllowed(crudOperations, PERMISSION_VIEW) ? { [VIEW_SHOW]: show(modelDefinition, i18n) } : null),
    [VIEW_ERROR]: error(modelDefinition, i18n),
    ...(
      Object.keys(modelDefinition.ui.views).
        filter(viewName => !isStandardView(viewName)).
        reduce((acc, viewName) => ({ ...acc, [viewName]: customViewReducer(viewName)(modelDefinition, i18n) }), {})
    )
  }
}

export const sagas = modelDefinition => {
  const { crudOperations } = modelDefinition.permissions;

  return {
    ...(isAllowed(crudOperations, PERMISSION_VIEW) ? { [VIEW_SEARCH]: searchViewScenario } : null),
    ...(isAllowed(crudOperations, PERMISSION_CREATE) ? { [VIEW_CREATE]: createViewScenario } : null),
    ...(isAllowed(crudOperations, PERMISSION_EDIT) ? { [VIEW_EDIT]: editViewScenario } : null),
    ...(isAllowed(crudOperations, PERMISSION_VIEW) ? { [VIEW_SHOW]: showViewScenario } : null),
    [VIEW_ERROR]: errorViewScenario,
    ...(
      Object.keys(modelDefinition.ui.views).
        filter(viewName => !isStandardView(viewName)).
        reduce((acc, viewName) => ({ ...acc, [viewName]: customViewScenario(viewName) }), {})
    )
  }
}

export const getViewState = viewName => {
  return {
    [VIEW_SEARCH]: getSearchViewState,
    [VIEW_CREATE]: getCreateViewState,
    [VIEW_EDIT]: getEditViewState,
    [VIEW_SHOW]: getShowViewState,
    [VIEW_ERROR]: getErrorViewState
  }[viewName]
}

export const getUiViews = modelDefinition => {
  const { crudOperations } = modelDefinition.permissions;
  const standardUi = {
    ...(isAllowed(crudOperations, PERMISSION_VIEW) ? { [VIEW_SEARCH]: getSearchUi } : null),
    ...(isAllowed(crudOperations, PERMISSION_CREATE) ? { [VIEW_CREATE]: getCreateUi } : null),
    ...(isAllowed(crudOperations, PERMISSION_EDIT) ? { [VIEW_EDIT]: getEditUi } : null),
    ...(isAllowed(crudOperations, PERMISSION_VIEW) ? { [VIEW_SHOW]: getShowUi } : null)
  };

  return Object.keys(modelDefinition.ui.views).reduce((views, viewName) => ({
    ...views,
    [viewName]: standardUi[viewName] ?
      standardUi[viewName](modelDefinition) :
      getCustomViewUi({ viewName, modelDefinition })
  }), {});
}
