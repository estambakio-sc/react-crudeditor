import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Svg from '@opuscapita/react-svg/lib/SVG';
import spinnerSVG from '!!raw-loader!./spinner2.svg';
import './SpinnerOverlay.less';

const withSpinner = WrappedComponent => {
  return class WithSpinner extends PureComponent {
    static propTypes = {
      model: PropTypes.shape({
        data: PropTypes.object.isRequired
      })
    }

    render() {
      const { children, model, ...props } = this.props;

      const defaultSpinner = (<Svg svg={spinnerSVG} style={{ width: '64px', height: '64px' }} />);

      const CustomSpinner = model.data.Spinner;

      const spinner = model.data.isLoading ?
        (
          <div className="crud--spinner-overlay">
            { CustomSpinner ? <CustomSpinner/> : defaultSpinner }
          </div>
        ) :
        null;

      return (
        <div className="ready-for-spinner">
          {spinner}
          <div className={`${spinner ? 'under-active-spinner' : ''}`}>
            <WrappedComponent model={model} {...props}>
              {children}
            </WrappedComponent>
          </div>
        </div>
      );
    }
  }
}

export default withSpinner;