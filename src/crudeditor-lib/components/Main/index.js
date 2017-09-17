import React from 'react';

import { connect } from 'react-redux';
import ViewSwitcher from '../ViewSwitcher';
import { initializeView } from '../../common/actions';

@connect(
  undefined,
  { initializeView }
)
export default class extends React.PureComponent {
  constructor(...args) {
    super(...args);

    let {
      viewName,
      viewState,  // its structure is unknown and depends on viewName value.
      initializeView
    } = this.props;

    // Initial initialization:
    initializeView({ viewName, viewState });
  }

  componentWillReceiveProps({
    viewName,
    viewState  // its structure is unknown and depends on viewName value.
  }) {
    // Re-initialization:
    this.props.initializeView({ viewName, viewState });
  }

  render = _ => <ViewSwitcher modelDefinition={this.props.modelDefinition}/>
}