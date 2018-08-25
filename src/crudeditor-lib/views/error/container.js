import React from 'react';
import { connect } from 'react-redux';
import { getViewModelData } from './selectors';
import { softRedirectView } from '../../common/actions';
import { VIEW_SEARCH, PERMISSION_VIEW } from '../../common/constants';
import { isAllowed } from '../../lib';

const mergeProps = /* istanbul ignore next */ (
  {
    viewModelData,
    permissions: {
      crudOperations
    },
    extraProps
  },
  {
    goHome,
    ...dispatchProps
  }
) => ({
  viewModel: {
    data: viewModelData,
    actions: {
      ...(isAllowed(crudOperations, PERMISSION_VIEW) && { goHome }),
      ...dispatchProps
    }
  },
  extraProps
});

export default Component => connect(
  /* istanbul ignore next */
  (storeState, { modelDefinition, extraProps }) => ({
    viewModelData: getViewModelData(storeState, modelDefinition),
    permissions: modelDefinition.permissions,
    extraProps
  }),
  {
    goHome: /* istanbul ignore next */ _ => softRedirectView({
      name: VIEW_SEARCH
    })
  },
  mergeProps
)(
  /* istanbul ignore next */
  ({ viewModel, extraProps }) => <Component model={viewModel} extraProps={extraProps}/>
);
