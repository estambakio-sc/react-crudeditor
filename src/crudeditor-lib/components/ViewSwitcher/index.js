import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import searchView from '../../views/search/container';
import createView from '../../views/create/container';
import editView from '../../views/edit/container';
import showView from '../../views/show/container';
import errorView from '../../views/error/container';

import {
  VIEW_SEARCH,
  VIEW_CREATE,
  VIEW_EDIT,
  VIEW_SHOW,
  VIEW_ERROR
} from '../../common/constants';

import WithAlerts from '../WithAlertsHOC';

const ViewSwitcher = ({ activeViewName, modelDefinition, externalOperations, extraProps }, { i18n }) => {
  if (!activeViewName) {
    return null;
  }

  const containers = {
    [VIEW_SEARCH]: searchView,
    [VIEW_CREATE]: createView,
    [VIEW_EDIT]: editView,
    [VIEW_SHOW]: showView,
    [VIEW_ERROR]: errorView
  }

  if (Object.keys(containers).indexOf(activeViewName) === -1) {
    return (
      <div>Unknown view <i>{activeViewName}</i></div>
    )
  }

  const ViewComponent = modelDefinition.ui[activeViewName].component;

  const ViewContainer = containers[activeViewName](ViewComponent);

  return (
    <ViewContainer
      modelDefinition={modelDefinition}
      externalOperations={externalOperations}
      extraProps={extraProps}
      i18n={i18n}
    />
  );
}

ViewSwitcher.propTypes = {
  activeViewName: PropTypes.string,
  modelDefinition: PropTypes.object.isRequired,
  externalOperations: PropTypes.func.isRequired,
  extraProps: PropTypes.object
}

ViewSwitcher.contextTypes = {
  i18n: PropTypes.object.isRequired
}

export default connect(
  storeState => ({ activeViewName: storeState.common.activeViewName })
)(WithAlerts(ViewSwitcher));
