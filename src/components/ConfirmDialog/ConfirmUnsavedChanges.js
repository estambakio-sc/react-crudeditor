import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ConfirmDialog from './';

export default class ConfirmUnsavedChanges extends PureComponent {
  static propTypes = {
    showDialog: PropTypes.func
  }

  static contextTypes = {
    i18n: PropTypes.object
  }

  render() {
    const { children, showDialog } = this.props;
    const { i18n } = this.context;

    return (
      <ConfirmDialog
        title="You have unsaved changes"
        message={i18n.getMessage('crudEditor.unsaved.confirmation')}
        textConfirm={i18n.getMessage('crudEditor.confirm.action')}
        textCancel={i18n.getMessage('crudEditor.cancel.button')}
        showDialog={showDialog}
      >
        {children}
      </ConfirmDialog>
    )
  }
}
