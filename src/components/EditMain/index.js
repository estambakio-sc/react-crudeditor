import React from 'react';
import PropTypes from 'prop-types';
import Heading from '../EditHeading';
import Tab from '../EditTab';
import WithFieldErrors from '../FieldErrors/WithFieldErrorsHOC';
import WithSpinner from '../Spinner/SpinnerOverlayHOC';
import { VIEW_NAME } from '../../crudeditor-lib/views/edit/constants';

const EditMain = ({ model, toggledFieldErrors, toggleFieldErrors, extraProps }) => {
  const ActiveTabComponent = model.data.activeTab && model.data.activeTab.component;

  return (<div>
    <Heading model={model} extraProps={extraProps}/>
    {ActiveTabComponent ?
      <ActiveTabComponent viewName={model.data.viewName} instance={model.data.persistentInstance} /> :
      <Tab model={model} toggledFieldErrors={toggledFieldErrors} toggleFieldErrors={toggleFieldErrors}/>
    }
  </div>);
};

EditMain.propTypes = {
  model: PropTypes.shape({
    data: PropTypes.shape({
      activeTab: PropTypes.array,
      viewName: PropTypes.oneOf([VIEW_NAME]).isRequired,
      persistentInstance: PropTypes.object
    }).isRequired
  }).isRequired,
  toggledFieldErrors: PropTypes.object.isRequired,
  toggleFieldErrors: PropTypes.func.isRequired,
  extraProps: PropTypes.shape({
    uiConfig: PropTypes.shape({
      headerLevel: PropTypes.number
    })
  })
}

EditMain.defaultProps = {
  extraProps: {
    uiConfig: {
      headerLevel: 1
    }
  }
}

export default WithSpinner(WithFieldErrors(EditMain));
