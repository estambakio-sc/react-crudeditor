import React from 'react';
import PropTypes from 'prop-types';

export default function ExportView(props, { i18n }) {
  console.log('custom view', { props });

  const { headerLevel } = props.extraProps.uiConfig;
  const { redirect } = props.model.actions;

  const H = 'h' + headerLevel;

  return (<div style={{ marginBottom: '10px' }}>
    <H>
      <div className='row'>
        <div className='col-xs-8'>
          <a style={{ cursor: 'pointer' }} onClick={_ => redirect({ name: 'search' })}>
            {i18n.getMessage('model.name')}
          </a>
          <small> {' / Export'}</small>
        </div>
      </div>
    </H>

    <div className="panel panel-default">
      <div className="panel-body">
        This is a custom 'export' view.
      </div>
    </div>
  </div>);
}

ExportView.propTypes = {
  model: PropTypes.object.isRequired,
  extraProps: PropTypes.shape({
    uiConfig: PropTypes.shape({
      headerLevel: PropTypes.number
    })
  })
}

ExportView.defaultProps = {
  extraProps: {
    uiConfig: {
      headerLevel: 1
    }
  }
}

ExportView.contextTypes = {
  i18n: PropTypes.object.isRequired
}
