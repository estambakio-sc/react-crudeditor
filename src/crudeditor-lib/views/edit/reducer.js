import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import u from 'updeep';

import {
  buildInstanceLabel,
  buildFormLayout
} from '../lib';

import {
  INSTANCE_EDIT_REQUEST,
  INSTANCE_EDIT_SUCCESS,
  INSTANCE_EDIT_FAIL,

  EXTRACTING,
  READY,
  UNINITIALIZED,

  VIEW_NAME,
  INSTANCE_FIELD_CHANGE,
  TAB_SELECT
} from './constants';

const defaultStoreStateTemplate = {
  persistentInstance: undefined,
  formInstance: undefined,

  // Must always be an array, may be empty.
  formLayout: [],

  // A ref to one of tabs element => it is undefined when and only when formLayout does not consist of tabs.
  activeTab: undefined,

  instanceLabel: undefined,
  errors: undefined,
  status: UNINITIALIZED
};

/*
 * XXX:
 * Only objects and arrays are allowed at branch nodes.
 * Only primitive data types are allowed at leaf nodes.
 */
export default modelDefinition => {
  if (!modelDefinition.ui.editLayout) {
    modelDefinition.ui.editLayout = {};
  }

  const editLayout = modelDefinition.ui.editLayout;

  editLayout.formLayout = buildFormLayout({
    customBuilder: editLayout.formLayout,
    viewName: VIEW_NAME,
    fieldsMeta: modelDefinition.model.fields
  });

  return (storeState = cloneDeep(defaultStoreStateTemplate), { type, payload, error, meta }) => {
    const newStoreStateSlice = {};

    // ███████████████████████████████████████████████████████████████████████████████████████████████████████████

    if (type === INSTANCE_EDIT_REQUEST) {
      newStoreStateSlice.status = EXTRACTING;

    // ███████████████████████████████████████████████████████████████████████████████████████████████████████████

    } else if (type === INSTANCE_EDIT_SUCCESS) {
      const { instance, activeTabName } = payload;
      let formLayout;

      if (instance && !isEqual(instance, storeState.persistentInstance)) {

        formLayout = modelDefinition.ui.editLayout.formLayout(instance).
          filter(entry => !!entry);  // Removing empty tabs/sections and null tabs/sections/fields.

        let hasTabs;
        let hasSectionsOrFields;

        formLayout.forEach(entry => {
          hasTabs = hasTabs || entry.tab;
          hasSectionsOrFields = hasSectionsOrFields || entry.section || entry.field;

          if (hasTabs && hasSectionsOrFields) {
            throw new Error('formLayout must not have tabs together with sections/fields at top level');
          }
        });

        newStoreStateSlice.formLayout = u.constant(formLayout);
        newStoreStateSlice.persistentInstance = u.constant(instance);
        newStoreStateSlice.formInstance = u.constant(cloneDeep(instance));

        newStoreStateSlice.instanceLabel = buildInstanceLabel({
          instance,
          uiMeta: modelDefinition.ui
        });
      }

      if (formLayout ||  // New instance has been received => new formLayout has been built.
        storeState.activeTab && storeState.activeTab.tab !== activeTabName  // New tab has been selected.
      ) {
        const tabs = (formLayout || storeState.formLayout).filter(({ tab }) => !!tab);  // [] in case of no tabs.
        const activeTab = tabs.find(({ tab: name }) => name === activeTabName) || tabs[0];  // undefined in case of no tabs.
        newStoreStateSlice.activeTab = u.constant(activeTab);
      }

      newStoreStateSlice.status = READY;

      // ███████████████████████████████████████████████████████████████████████████████████████████████████████

      } else if (type === INSTANCE_EDIT_FAIL) {
        newStoreStateSlice.status = storeState.persistentInstance ? READY : UNINITIALIZED;

      // ███████████████████████████████████████████████████████████████████████████████████████████████████████

      } else if (type === INSTANCE_FIELD_CHANGE) {
        const { field, value } = payload;

        newStoreStateSlice.formInstance = {
          [field]: value || value === 0 || value === false ? value : null
        };

      // ███████████████████████████████████████████████████████████████████████████████████████████████████████

      } else if (type === TAB_SELECT) {
        const { activeTabName } = payload;

        newStoreStateSlice.activeTab = u.constant(
          storeState.formLayout.find(({ tab: name }) => name === activeTabName)
        );

    // ███████████████████████████████████████████████████████████████████████████████████████████████████████████
    }

    return u(newStoreStateSlice, storeState);  // returned object is frozen for NODE_ENV === 'development'
  };
}
