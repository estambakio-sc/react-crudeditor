import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import { I18nManager } from '@opuscapita/i18n';
import translations from '../../crudeditor-lib/i18n';

// This @showroomScopeDecorator modify React.Component prototype by adding _renderChildren() method.
export default
@showroomScopeDecorator
class RangeInputScope extends PureComponent {
  static childContextTypes = {
    i18n: PropTypes.object
  };

  constructor(...args) {
    super(...args);

    // check for URL query parameter 'lang', otherwise use default language
    this.i18n = new I18nManager({ locale: 'en' });
    this.i18n.register('RangeInput', translations);
  }

  state = {
    value: {
      from: null,
      to: null
    }
  }

  getChildContext() {
    return { i18n: this.i18n }
  }

  handleChange = value => this.setState({ value }, _ => console.log(this.state.value))

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}
