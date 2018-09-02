import cloneDeep from 'lodash/cloneDeep';
import { checkModelDefinition } from './check-model';
import { getUiViews, getViewState } from './views';
import {
  DEFAULT_FIELD_TYPE,
  PERMISSION_CREATE,
  PERMISSION_EDIT,
  PERMISSION_VIEW,
  PERMISSION_DELETE
} from './common/constants';

// see npm "bounce" module for details: https://github.com/hapijs/bounce
export const isSystemError = err => [
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError
].some(systemErrorConstructor => err instanceof systemErrorConstructor);

export const storeState2appState = (storeState, modelDefinition) => {
  const { activeViewName } = storeState.common;
  return activeViewName ? {
    name: activeViewName,
    state: getViewState(activeViewName) ?
      cloneDeep(getViewState(activeViewName)(storeState, modelDefinition)) :
      {}
  } :
    undefined;
}

export function getPrefixedTranslations(translations, prefix) {
  return Object.keys(translations).
    reduce((acc, lang) => ({
      ...acc,
      [lang]: Object.keys(translations[lang]).
        reduce((acc, msgKey) => ({
          ...acc,
          [`${prefix}.${msgKey}`]: translations[lang][msgKey]
        }), {})
    }), {})
}

/**
 * Function 'isAllowed' returns permission for certain operation
 * @param {{ view: <bool|func>, create: <bool|func>, delete: <bool|func>, edit: <bool|func> }} permissions
 * @param {string} operation - one of 'view', 'create', `edit`, 'delete'
 * @param {undefined|object} data - arg for permissions function, e.g. { instance } for per-instance permissions
 * @returns {boolean}
 */
export function isAllowed(permissions, operation, data) { // eslint-disable-line consistent-return
  if (permissions[operation] instanceof Function) {
    return arguments.length === 3 ?
      // global permission is enforced before checking data
      permissions[operation]() && permissions[operation](data) :
      permissions[operation]()
  }
  return permissions[operation]
}

// Filling modelDefinition with default values where necessary.
export function fillDefaults(baseModelDefinition) {
  const modelDefinition = cloneDeep(baseModelDefinition);

  // validate modelDefinition using 'prop-types'
  checkModelDefinition(modelDefinition);

  const fieldsMeta = modelDefinition.model.fields;

  Object.keys(fieldsMeta).forEach(fieldName => {
    if (!fieldsMeta[fieldName].type) {
      fieldsMeta[fieldName].type = DEFAULT_FIELD_TYPE;
    }

    if (!fieldsMeta[fieldName].constraints) {
      fieldsMeta[fieldName].constraints = {};
    }
  });

  if (!modelDefinition.model.validate) {
    modelDefinition.model.validate = _ => true;
  }

  if (!modelDefinition.ui) {
    modelDefinition.ui = {};
  }

  if (!modelDefinition.ui.instanceLabel) {
    modelDefinition.ui.instanceLabel = ({ _objectLabel }) => _objectLabel;
  }

  if (!modelDefinition.ui.customOperations) {
    modelDefinition.ui.customOperations = _ => [];
  }

  const { crudOperations } = modelDefinition.permissions;

  [PERMISSION_CREATE, PERMISSION_EDIT, PERMISSION_VIEW, PERMISSION_DELETE].
    filter(p => !crudOperations.hasOwnProperty(p)).
    forEach(p => {
      crudOperations[p] = false
    });

  modelDefinition.ui.views = getUiViews(modelDefinition);

  return modelDefinition;
}
