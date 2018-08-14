import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import { getFieldLabel } from '../lib';
import FieldErrorLabel from '../FieldErrors/FieldErrorLabel';
import WithFieldErrors from '../FieldErrors/WithFieldErrorsHOC';
import './SearchForm.less';

class SearchForm extends Component {
  static propTypes = {
    model: PropTypes.shape({
      data: PropTypes.shape({
        formFilter: PropTypes.object.isRequired,
        formattedFilter: PropTypes.object.isRequired,
        searchableFields: PropTypes.arrayOf(PropTypes.object),
        resultFilter: PropTypes.object.isRequired
      }).isRequired,
      actions: PropTypes.objectOf(PropTypes.func)
    }).isRequired,
    toggledFieldErrors: PropTypes.object.isRequired,
    toggleFieldErrors: PropTypes.func.isRequired
  }

  static contextTypes = {
    i18n: PropTypes.object
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.model.actions.searchInstances({
      filter: this.props.model.data.formFilter
    });
  }

  handleFormFilterUpdate = fieldName => newFieldValue => {
    this.props.toggleFieldErrors(false, fieldName);

    this.props.model.actions.updateFormFilter({
      name: fieldName,
      value: newFieldValue
    });
  }

  handleFormFilterBlur = fieldName => _ => this.props.toggleFieldErrors(true, fieldName);

  fieldErrors = name => name ?
    (this.props.toggledFieldErrors[name] || []) :
    !!Object.keys(this.props.toggledFieldErrors).length

  render() {
    const {
      model: {
        data: {
          formattedFilter,
          searchableFields,
          formFilter,
          resultFilter
        },
        actions: {
          resetFormFilter
        }
      }
    } = this.props;

    const { i18n } = this.context;

    return (
      <form
        className="form-horizontal clearfix crud--search-form"
        onSubmit={this.handleSubmit}
      >
        <div className="crud--search-form__controls">
          {
            searchableFields.map(({ name, component: Component, valuePropName }) => (
              <FormGroup
                key={`form-group-${name}`}
                controlId={`fg-${name}`}
                validationState={this.fieldErrors(name).length ? 'error' : null}
                className="crud--search-form__form-group"
              >
                <ControlLabel>
                  {
                    getFieldLabel({ i18n, name })
                  }
                </ControlLabel>
                <Component
                  {...{ [valuePropName]: formattedFilter[name] }}
                  onChange={this.handleFormFilterUpdate(name)}
                  onBlur={this.handleFormFilterBlur(name)}
                />
                <FieldErrorLabel errors={this.fieldErrors(name)} fieldName={name}/>
              </FormGroup>
            ))
          }
        </div>
        <div className="crud--search-form__submit-group">
          <button
            type="button"
            className="btn btn-link"
            onClick={resetFormFilter}
          >
            {i18n.getMessage('crudEditor.reset.button')}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            ref={ref => (this.submitBtn = ref)}
            disabled={isEqual(formFilter, resultFilter) || this.fieldErrors()}
          >
            {i18n.getMessage('crudEditor.search.button')}
          </button>
        </div>
      </form>
    );
  }
}

export default WithFieldErrors(SearchForm);
