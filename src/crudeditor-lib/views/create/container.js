import React from 'react';
import { connect } from 'react-redux';
import Main from '../../../components/CreateMain';
import {
  getViewModelData,
  getViewState
} from './selectors';
import { softRedirectView } from '../../common/actions';
import { viewOperations } from '../lib';
import {
  exitView,
  saveInstance,
  selectTab,
  validateInstanceField,
  changeInstanceField,
  saveAndNewInstance
} from './actions';
import { VIEW_NAME } from './constants';

const mergeProps = ({
  viewModelData,
  viewState,
  operations
}, {
  softRedirectView,
  ...dispatchProps
},
ownProps) => ({
  ...ownProps,
  viewModel: {
    data: {
      ...viewModelData,
      operations: viewOperations({
        viewName: VIEW_NAME,
        viewState,
        operations,
        softRedirectView
      })
    },
    actions: dispatchProps
  }
});

export default connect(
  (storeState, { modelDefinition }) => ({
    viewModelData: getViewModelData(storeState, modelDefinition),
    viewState: getViewState(storeState, modelDefinition),
    operations: modelDefinition.ui.operations
  }), {
    exitView,
    saveInstance,
    selectTab,
    validateInstanceField,
    changeInstanceField,
    saveAndNewInstance,
    softRedirectView
  },
  mergeProps
)(({
  viewModel,
  children,
  ...props
}) =>
  (<Main model={viewModel} {...props}>
    {children}
  </Main>)
);
