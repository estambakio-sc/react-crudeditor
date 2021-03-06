import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ConfirmDialog from './';

export default class ConfirmUnsavedChanges extends PureComponent {
  static propTypes = {
    trigger: PropTypes.string,
    showDialog: PropTypes.func
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  render() {
    const { children, ...rest } = this.props;
    const { i18n } = this.context;

    return (
      <ConfirmDialog
        message={i18n.getMessage('crudEditor.unsaved.confirmation')}
        textConfirm={i18n.getMessage('crudEditor.confirm.action')}
        textCancel={i18n.getMessage('crudEditor.cancel.button')}
        {...rest}
      >
        {children}
      </ConfirmDialog>
    )
  }
}
