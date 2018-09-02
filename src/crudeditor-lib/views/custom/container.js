import React from 'react';
import { connect } from 'react-redux';
import { softRedirectView } from '../../common/actions';
import { getViewModelData } from './selectors';

const mergeProps = (
  {
    viewModelData,
    extraProps
  },
  {
    softRedirectView
  }
) => ({
  viewModel: {
    data: viewModelData,
    actions: {
      redirect: softRedirectView,
    }
  },
  extraProps
});

export default viewName => Component => connect(
  /* istanbul ignore next */
  (storeState, { modelDefinition, externalOperations, extraProps }) => ({
    viewModelData: getViewModelData(viewName)(storeState, modelDefinition),
    customOperations: modelDefinition.ui.customOperations,
    externalOperations,
    extraProps
  }),
  {
    softRedirectView
  },
  mergeProps
)(
  /* istanbul ignore next */
  ({ viewModel, extraProps }) => <Component model={viewModel} extraProps={extraProps}/>
);
