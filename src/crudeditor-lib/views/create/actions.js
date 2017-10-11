import {
  VIEW_EXIT,
  INSTANCE_CREATE,
  INSTANCE_SAVE,
  TAB_SELECT,
  INSTANCE_FIELD_VALIDATE,
  INSTANCE_FIELD_CHANGE,
  AFTER_ACTION_NEW,
  RESET_FORM
} from './constants';

export const

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  // search component dispatches it with a newely created instance
  // listener: search/workerSagas/create.js
  createInstance = ({ instance }) => ({
    type: INSTANCE_CREATE,
    payload: { instance }
  }),

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  saveInstance = _ => ({
    type: INSTANCE_SAVE
  }),

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  exitView = _ => ({
    type: VIEW_EXIT
  }),

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  selectTab = tabName => ({
    type: TAB_SELECT,
    payload: { tabName }
  }),

  validateInstanceField = fieldName => ({
    type: INSTANCE_FIELD_VALIDATE,
    payload: {
      name: fieldName
    }
  }),

  saveAndNewInstance = _ => ({
    type: INSTANCE_SAVE,
    payload: {
      afterAction: AFTER_ACTION_NEW
    }
  }),

  changeInstanceField = ({
    name: fieldName,
    value: fieldNewValue
  }) => ({
    type: INSTANCE_FIELD_CHANGE,
    payload: {
      name: fieldName,
      value: fieldNewValue
    }
  }),

  resetForm = _ => ({
    type: RESET_FORM
  })
