import { buildCommonSelectorWrapper } from '../lib';

const wrapper = buildCommonSelectorWrapper();

export const

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getEntityConfigurationIndex = wrapper(({ entityConfigurationIndex }) => entityConfigurationIndex),

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getActiveView = wrapper(({ activeView }) => activeView),

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getIdField = wrapper((_, {
    model: { idField }
  }) => idField);
