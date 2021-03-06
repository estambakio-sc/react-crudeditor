import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ViewSwitcher from '../ViewSwitcher';
import { hardRedirectView } from '../../common/actions';

class CrudMain extends PureComponent {
  static propTypes = {
    viewName: PropTypes.string,
    viewState: PropTypes.object,
    modelDefinition: PropTypes.object.isRequired,
    hardRedirectView: PropTypes.func.isRequired,
    externalOperations: PropTypes.func.isRequired,
    extraProps: PropTypes.object
  }

  constructor(...args) {
    super(...args);

    // Initial initialization (viewState structure is unknown and depends on viewName value):
    this.props.hardRedirectView({
      viewName: this.props.viewName,
      viewState: this.props.viewState
    });
  }

  componentWillReceiveProps({ viewName, viewState }) {
    if (viewName !== this.props.viewName || viewState !== this.props.viewState) {
      // Re-initialization (viewState structure is unknown and depends on viewName value):
      this.props.hardRedirectView({ viewName, viewState });
    }
  }

  render = _ => (
    <ViewSwitcher
      modelDefinition={this.props.modelDefinition}
      externalOperations={this.props.externalOperations}
      extraProps={this.props.extraProps}
    />
  )
}

export default connect(
  undefined,
  { hardRedirectView },
  undefined,
  { areOwnPropsEqual: _ => false }
)(CrudMain);
