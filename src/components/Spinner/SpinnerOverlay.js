import React, { PureComponent } from 'react';
import SVG from '@opuscapita/react-svg/lib/SVG';
import spinnerSVG from '!!raw-loader!./spinner2.svg';
import './SpinnerOverlay.less';

export default
class SpinnerOverlay extends PureComponent {
  render() {
    return (
      <div className="crud--spinner-overlay">
        <SVG svg={spinnerSVG} style={{ width: '64px', height: '64px' }} />
      </div>
    );
  }
}