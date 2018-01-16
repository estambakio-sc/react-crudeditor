import React from 'react';
import ReactDOM from 'react-dom';
import DefaultSpinner from './DefaultSpinner';

class Spinner {
  constructor() {
    this.loadingTasks = 0;
    this.setDefaultComponent();
  }

  setComponent(component, props) {
    this.component = React.createElement(component, props);
    return this
  }

  setDefaultComponent() {
    this.component = React.createElement(DefaultSpinner);
    return this
  }

  start() {
    this.loadingTasks++;

    if (this.loadingTasks === 1) {
      this.render()
    }
  }

  stop() {
    if (this.loadingTasks > 0) {
      this.loadingTasks--
    }

    if (this.loadingTasks === 0 && ReactDOM.findDOMNode(this.container)) {
      ReactDOM.unmountComponentAtNode(this.container)
    }
  }

  render() {
    if (!this.container) {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
    }

    ReactDOM.render(this.component, this.container)
  }
}

export default new Spinner();