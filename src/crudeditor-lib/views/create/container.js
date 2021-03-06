import React from 'react';
import { connect } from 'react-redux';
import { softRedirectView } from '../../common/actions';
import { expandExternalOperation, expandCustomOperation } from '../lib';
import { VIEW_NAME } from './constants';
import { VIEW_SEARCH, PERMISSION_VIEW } from '../../common/constants';
import { isAllowed } from '../../lib';
import {
  getViewModelData,
  getViewState
} from './selectors';
import {
  saveInstance,
  selectTab,
  validateInstanceField,
  changeInstanceField,
  saveAndNewInstance
} from './actions';

const mergeProps = /* istanbul ignore next */ (
  {
    viewModelData: {
      unsavedChanges,
      ...restData
    },
    viewState,
    permissions: { crudOperations },
    customOperations,
    externalOperations,
    extraProps
  },
  {
    softRedirectView,
    exitView,
    saveInstance,
    saveAndNewInstance,
    ...dispatchProps
  },
  { i18n }
) => ({
  viewModel: {
    data: {
      unsavedChanges,
      ...restData
    },

    actions: {
      ...dispatchProps,
      ...(isAllowed(crudOperations, PERMISSION_VIEW) && { exitView })
    },

    /*
     * Operations requiering confirmation in case of unsaved changes
     * are supplied with "confirm" property containing an object with translation texts for Confirm Dialog.
     *
     * "show" property is removed from each custom/external operation
     * since operations with "show" set to "false" are not included in the result array.
     */
    operations: viewState ? [
      ...(isAllowed(crudOperations, PERMISSION_VIEW) && [{
        title: i18n.getMessage('crudEditor.cancel.button'),
        handler: exitView,
        style: 'link',
        ...(!!unsavedChanges && {
          confirm: {
            message: i18n.getMessage('crudEditor.unsaved.confirmation'),
            textConfirm: i18n.getMessage('crudEditor.confirm.action'),
            textCancel: i18n.getMessage('crudEditor.cancel.button')
          }
        })
      }]),
      ...[
        ...customOperations().map(expandCustomOperation({
          viewName: VIEW_NAME,
          viewState,
          softRedirectView
        })),
        ...externalOperations().map(expandExternalOperation({
          viewName: VIEW_NAME,
          viewState
        }))
      ].
        filter(operation => operation).
        map(operation => unsavedChanges ?
          ({
            ...operation,
            confirm: {
              message: i18n.getMessage('crudEditor.unsaved.confirmation'),
              textConfirm: i18n.getMessage('crudEditor.confirm.action'),
              textCancel: i18n.getMessage('crudEditor.cancel.button')
            }
          }) :
          operation
        ),
      {
        title: i18n.getMessage('crudEditor.saveAndNew.button'),
        disabled: !unsavedChanges,
        handler: saveAndNewInstance
      },
      {
        title: i18n.getMessage('crudEditor.save.button'),
        disabled: !unsavedChanges,
        handler: saveInstance,
        style: 'primary'
      }
    ] :
      [] // viewState is undefined when view is not initialized yet (ex. during Hard Redirect).
  },
  extraProps
});

export default Component => connect(
  /* istanbul ignore next */
  (storeState, { modelDefinition, externalOperations, extraProps }) => ({
    viewModelData: getViewModelData(storeState, modelDefinition),
    viewState: getViewState(storeState, modelDefinition),
    permissions: modelDefinition.permissions,
    customOperations: modelDefinition.ui.customOperations,
    externalOperations,
    extraProps
  }), {
    exitView: /* istanbul ignore next */ _ => softRedirectView({ name: VIEW_SEARCH }),
    saveInstance,
    selectTab,
    validateInstanceField,
    changeInstanceField,
    saveAndNewInstance,
    softRedirectView
  },
  mergeProps
)(
  /* istanbul ignore next */
  ({ viewModel, extraProps }) => <Component model={viewModel} extraProps={extraProps}/>
);
