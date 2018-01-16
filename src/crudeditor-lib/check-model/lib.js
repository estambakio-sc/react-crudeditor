import * as dataTypes from '../../data-types-lib/constants';

import {
  PERMISSION_CREATE,
  PERMISSION_DELETE,
  PERMISSION_EDIT,
  PERMISSION_VIEW
} from '../common/constants';

export const allowedAny = /* istanbul ignore next */ (
  actions = [],
  {
    permissions: { crudOperations = {} } = {}
  }
) => [
  PERMISSION_CREATE,
  PERMISSION_EDIT,
  PERMISSION_DELETE,
  PERMISSION_VIEW
].filter(action => actions.indexOf(action) > -1).
  reduce((result, action) => result || !!crudOperations[action], false);

// https://stackoverflow.com/a/31169012
export const allPropTypes = /* istanbul ignore next */ (...types) => (...args) => {
  const errors = types.map((type) => type(...args)).filter(Boolean);
  if (errors.length === 0) {
    return
  }
  // eslint-disable-next-line consistent-return
  return new Error(errors.map((e) => e.message).join('\n'));
};

export const uiTypes = Object.keys(dataTypes).
  filter(key => key.indexOf('UI_TYPE') === 0).
  reduce((types, key) => types.concat(dataTypes[key]), []);