import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ReactSelectSpecificProps,
  ReferenceAutocomplete,
  ReferenceSearchInput,
  isServiceRegistryConfiguredFor,
  ReferenceInputBaseProps
} from '@opuscapita/react-reference-select';
import translations from './i18n';
import ReferenceSearchService from './service';

const SERVICE_NAME = 'ReferenceSearch';

/*
 * Parses Content-range header and returns response count
 */
function getTotalCount(response) {
  let range = response.headers['content-range'];
  let index = range.indexOf('/');
  let totalCount = range.substring(index + 1);
  return parseInt(totalCount, 10);
}

export default class ReferenceSearch extends PureComponent {

    static propTypes = {
      ...ReferenceInputBaseProps,
      reactSelectSpecificProps: React.PropTypes.shape(ReactSelectSpecificProps),
      serviceRegistry: isServiceRegistryConfiguredFor(SERVICE_NAME)
    };

    static contextTypes = {
      i18n: React.PropTypes.object.isRequired
    };

    static defaultProps = {
      serviceRegistry: serviceName => ({ url: 'http://localhost:3000' })
    }

    componentWillMount() {
      this.context.i18n.register('ReferenceSearch', translations)
    }

    render() {
      const { contractId, onBlur, onFocus, onChange, multiple, disabled, readOnly } = this.props;

      const referenceSearchProps = {
        contractId,
        onBlur,
        onChange: v => {
          console.log('ReferenceSearch onChange value')
          console.log(v)
          return onChange(v.contractId)
        },
        readOnly,
        ...{
          value: this.props.value,
          referenceSearchAction: (searchParams, callback) => {
            let referenceSearchService = new ReferenceSearchService(this.props.serviceRegistry(SERVICE_NAME).url);
            return referenceSearchService.getIds(searchParams).then((response) => {
              return callback(
                {
                  count: response.items.length,
                  items: response.items
                }
              )
            });
          },
          searchFields: [
            {
              name: 'contractId',
              label: this.context.i18n.getMessage('model.field.contractId')
            }
          ],
          resultFields: [
            {
              name: 'contractId',
              label: this.context.i18n.getMessage('model.field.contractId')
            }
          ],

          title: this.context.i18n.getMessage('crudEditor.search.header', {
            payload: this.context.i18n.getMessage('model.field.contractId')
          }),
          labelProperty: 'contractId',
          valueProperty: 'contractId'
        }
      }

      const autocompleteProps = {
        labelProperty: referenceSearchProps.labelProperty,
        valueProperty: referenceSearchProps.valueProperty,
        autocompleteAction: (searchTerm, callback) => {
          let referenceSearchService = new ReferenceSearchService(this.props.serviceRegistry(SERVICE_NAME).url);
          return referenceSearchService.getIds({ contractId: searchTerm }).then((response) => {
            return {
              options: response.body,
              complete: false
            };
          });
        },
        reactSelectSpecificProps: this.props.reactSelectSpecificProps
      };

      return (
        <ReferenceSearchInput {...referenceSearchProps}>
          <ReferenceAutocomplete {...autocompleteProps}/>
        </ReferenceSearchInput>
      );
    }
  }