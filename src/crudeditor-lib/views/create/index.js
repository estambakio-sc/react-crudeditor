import { VIEW_NAME } from './constants';
import { buildFormLayout, getViewMeta } from '../lib';

export { getViewState } from './selectors';

export const getUi = modelDefinition => {
  const createMeta = getViewMeta({ modelDefinition, viewName: VIEW_NAME });

  if (!createMeta.defaultNewInstance) {
    createMeta.defaultNewInstance = _ => ({});
  }

  // TODO add validation for object shape

  createMeta.formLayout = buildFormLayout({
    customBuilder: createMeta.formLayout,
    viewName: VIEW_NAME,
    fieldsMeta: modelDefinition.model.fields
  });

  return createMeta;
}
