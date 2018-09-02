import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CustomTabComponent extends PureComponent {
  static propTypes = {
    viewName: PropTypes.string.isRequired,
    instance: PropTypes.object.isRequired
  }

  render() {
    return (
      <p>Custom component here</p>
    )
  }
}
