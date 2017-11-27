import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ViewSwitcher from '../ViewSwitcher';
import { hardRedirectView } from '../../common/actions';

class CrudMain extends Component {
  constructor(...args) {
    super(...args);

    // Initial initialization (viewState structure is unknown and depends on viewName value):
    this.props.hardRedirectView({
      viewName: this.props.viewName,
      viewState: this.props.viewState
    });
  }

  componentWillReceiveProps({ viewName, viewState }) {
    // Re-initialization (viewState structure is unknown and depends on viewName value):
    this.props.hardRedirectView({ viewName, viewState });
  }

  render = _ => (
    <ViewSwitcher
      modelDefinition={this.props.modelDefinition}
      onExternalOperation={this.props.onExternalOperation}
    />
  )
}

CrudMain.propTypes = {
  viewName: PropTypes.string,
  viewState: PropTypes.object,
  modelDefinition: PropTypes.object,
  hardRedirectView: PropTypes.func,
  onExternalOperation: PropTypes.objectOf(PropTypes.func)
}

export default connect(
  undefined,
  { hardRedirectView },
  undefined,
  { areOwnPropsEqual: _ => false }
)(CrudMain);
