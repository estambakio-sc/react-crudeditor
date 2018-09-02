import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { containers as viewContainers } from '../../views';
import WithAlerts from '../WithAlertsHOC';

const ViewSwitcher = ({ activeViewName, modelDefinition, externalOperations, extraProps }, { i18n }) => {
  if (!activeViewName) {
    return null;
  }

  const containers = viewContainers(modelDefinition);

  if (Object.keys(containers).indexOf(activeViewName) === -1) {
    return (
      <div>Unknown view <i>{activeViewName}</i></div>
    )
  }

  const ViewComponent = (modelDefinition.ui.views[activeViewName] || {}).component;

  if (!ViewComponent) {
    console.log(`Component not defined for view "${activeViewName}"!`);
    return null;
  }

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
