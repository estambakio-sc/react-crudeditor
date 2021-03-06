import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from '../SearchForm';
import Result from '../SearchResult';
import { getModelMessage } from '../lib';
import './SearchMain.less';

export default class SearchMain extends PureComponent {
  static propTypes = {
    model: PropTypes.shape({
      actions: PropTypes.objectOf(PropTypes.func),
      data: PropTypes.shape({
        hideSearchForm: PropTypes.bool
      })
    }).isRequired,
    extraProps: PropTypes.shape({
      uiConfig: PropTypes.shape({
        headerLevel: PropTypes.number
      })
    })
  }

  static contextTypes = {
    i18n: PropTypes.object
  }

  static defaultProps = {
    extraProps: {
      uiConfig: {
        headerLevel: 1
      }
    }
  }

  render() {
    const {
      model,
      extraProps: {
        uiConfig: {
          headerLevel
        }
      }
    } = this.props;

    const {
      data: {
        hideSearchForm
      },
      actions: {
        toggleSearchForm,
        createInstance
      }
    } = model;

    const { i18n } = this.context;
    const H = 'h' + headerLevel;

    return (
      <div className="crud--search-main">
        <H>
          <Row>
            <Col xs={8}>

              {getModelMessage({ i18n, key: 'model.name' })}

              <Button
                bsStyle="link"
                onClick={toggleSearchForm}
                title={i18n.getMessage(`crudEditor.search.${hideSearchForm ? 'show' : 'hide'}SearchForm`)}
              >
                <Glyphicon glyph={`chevron-${hideSearchForm ? 'right' : 'left'}`} className="small"/>
              </Button>
            </Col>
            <Col xs={4}>
              <div style={{ float: "right" }}>
                {
                  createInstance &&
                  <button
                    type="button"
                    className="btn btn-sm btn-default"
                    onClick={createInstance}
                  >
                    {i18n.getMessage('crudEditor.create.button')}
                  </button>
                }
              </div>
            </Col>
          </Row>
        </H>

        <div className="crud--search-main__container">
          <div className={ hideSearchForm ?
            "crud--search-main__search-container" :
            "crud--search-main__search-container form-open"
          }
          >
            <Form model={model} />
          </div>

          <div className={ hideSearchForm ?
            "crud--search-main__results-container" :
            "crud--search-main__results-container form-open"
          }
          >
            <Result model={model} />
          </div>
        </div>
      </div>
    );
  }
}
