import React from 'react';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import isEqual from 'lodash/isEqual';
import crudTranslations from './i18n';
import notificationsMiddleware from './middleware/notifications';
import appStateChangeDetect from './middleware/appStateChangeDetect';

import Main from './components/Main';
import getReducer from './rootReducer';
import rootSaga from './rootSaga';

import { DEFAULT_VIEW } from './common/constants';

import {
  storeState2appState,
  fillDefaults,
  getModelPrefix,
  applyPrefixToTranslations
} from './utils';

const appName = 'crudEditor';

export default baseModelDefinition => {
  const modelDefinition = fillDefaults(baseModelDefinition);
  let onTransition = null;
  let lastState = {};

  class CrudWrapper extends React.Component {
    static propTypes = {
      view: PropTypes.shape({
        name: PropTypes.string,
        state: PropTypes.object
      }),
      onTransition: PropTypes.func
    }

    static propTypes = {
      locale: PropTypes.string,
      fallbackLocale: PropTypes.string,
      localeFormattingInfo: PropTypes.object
    };

    static contextTypes = {
      i18n: PropTypes.object.isRequired
    };

    static childContextTypes = {
      i18n: PropTypes.object,
      uniquePrefix: PropTypes.string
    }

    static defaultProps = {
      locale: 'en',
      fallbackLocale: 'en'
    };

    constructor(...args) {
      super(...args);
      onTransition = this.props.onTransition;

      // core crud translations

      this.context.i18n.register(appName, crudTranslations);

      // model translations
      const uniquePrefix = getModelPrefix(appName, modelDefinition.model.name);
      const prefixedTranslations = applyPrefixToTranslations(modelDefinition.model.translations, uniquePrefix);
      this.context.i18n.register(uniquePrefix, prefixedTranslations);

      const sagaMiddleware = createSagaMiddleware();

      this.store = createStore(
        getReducer(modelDefinition),
        (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(applyMiddleware(
          // XXX: ensure each middleware calls "next(action)" synchronously,
          // or else ensure that "redux-saga" is the last middleware in the call chain.
          appStateChangeDetect({
            lastState,
            onTransition,
            modelDefinition
          }),
          notificationsMiddleware(this.context),
          sagaMiddleware
        ))
      );

      this.runningSaga = sagaMiddleware.run(rootSaga, modelDefinition);
    }

    getChildContext() {
      console.log(this.context)
      const context = this.context;
      return {
        i18n: {
          getMessage(key) {
              const modelMessages = modelDefinition.model.translations;
              const isModelKey = Object.keys(Object.keys(modelMessages).
                reduce((acc, lang) => ({ ...acc, ...modelMessages[lang] }), {})
              ).indexOf(key) > -1;

              if (isModelKey) {
                key = `${getModelPrefix(appName, modelDefinition.model.name)}.${key}`;
              }

              const text = context.i18n.getMessage(key);

              return text !== key ?
                text :
                // TODO return last chunk capitalized
                key.charAt(0).toUpperCase() + key.slice(1).replace(/[^A-Z](?=[A-Z])/g, '$&\u00A0')
          },
          register(...args) {
            return context.i18n.register(...args);
          },
          formatDate(...args) {
            return context.i18n.formatDate(...args);
          }
        }
      }
    }

    componentWillReceiveProps(props) {
      onTransition = props.onTransition;
    }

    // Prevent duplicate API call when view name/state props are received in response to onTransition() call.
    // TODO: more sofisticated comparison by stripping defaults/EMPTY_FIELD_VALUE off newView.
    shouldComponentUpdate = ({
      view: {
        name = DEFAULT_VIEW,
        state = {}
      } = {}
    }) => !isEqual(storeState2appState(this.store.getState(), modelDefinition), { name, state })

    componentWillUnmount() {
      this.runningSaga.cancel()
    }

    render = _ =>
      (<Provider store={this.store}>
        <Main
          viewName={this.props.view ? this.props.view.name : undefined}
          viewState={this.props.view ? this.props.view.state : undefined}
          modelDefinition={modelDefinition}
        />
      </Provider>)
  }

  return CrudWrapper
};

