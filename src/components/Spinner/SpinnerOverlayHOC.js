import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { SVG as Svg } from '@opuscapita/react-svg';
// import spinnerSVG from './spinner2.svg';
// import './SpinnerOverlay.less';

const withSpinner = WrappedComponent => {
  return class WithSpinner extends PureComponent {
    static propTypes = {
      model: PropTypes.shape({
        data: PropTypes.shape({
          isLoading: PropTypes.bool
        }).isRequired
      }).isRequired
    }

    static contextTypes = {
      spinner: PropTypes.object.isRequired
    }

    constructor(...args) {
      super(...args);

      const { isLoading } = this.props.model.data;
      const { spinner } = this.context;

      if (isLoading) {
        spinner.start()
      } else {
        spinner.stop()
      }
    }

    componentWillReceiveProps(nextProps) {
      const { spinner } = this.context;

      const prevLoading = this.props.model.data.isLoading;
      const nextLoading = nextProps.model.data.isLoading;

      if (prevLoading !== nextLoading) {
        if (nextLoading) {
          spinner.start()
        } else {
          spinner.stop()
        }
      }
    }

    render() {
      const {
        children,
        ...props
      } = this.props;

      return (
        <WrappedComponent {...props}>
          {children}
        </WrappedComponent>
      )
    }
  }
}

export default withSpinner;
