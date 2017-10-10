import { buildViewSelectorWrapper } from '../../selectorWrapper';
import { getLogicalKeyBuilder } from '../lib';
import { VIEW_NAME } from './constants';

import {
  STATUS_INITIALIZING,
  STATUS_REDIRECTING
} from '../../common/constants';

const wrapper = buildViewSelectorWrapper(VIEW_NAME);

export const

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getViewState = wrapper(({
    persistentInstance,
    activeTab: { tab } = {}
  }, {
    model: { fields }
  }) => ({
    instance: getLogicalKeyBuilder(fields)(persistentInstance),
    ...(tab ? { tab } : {})
  })),

  getViewModelData = wrapper((storeState, {
    model: modelMeta
  }) => ({
    activeEntries: storeState.activeTab || storeState.formLayout,
    activeTab: storeState.activeTab,
    entityName: modelMeta.name,
    formatedInstance: storeState.formatedInstance,
    fieldsMeta: modelMeta.fields,
    generalErrors: storeState.errors.general,
    instanceLabel: storeState.instanceLabel,
    isLoading: ~[STATUS_INITIALIZING, STATUS_REDIRECTING].indexOf(storeState.status),
    persistentInstance: storeState.persistentInstance,
    tabs: storeState.formLayout.filter(({ tab }) => tab),
    status: storeState.status,
    viewName: VIEW_NAME
  }));