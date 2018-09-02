import { VIEW_NAME } from './constants';
import { buildFormLayout, getViewMeta } from '../lib';

export { getViewState } from './selectors';

export const getUi = modelDefinition => {
  const editMeta = getViewMeta({ modelDefinition, viewName: VIEW_NAME });

  // TODO add validation for object shape

  editMeta.formLayout = buildFormLayout({
    customBuilder: editMeta.formLayout,
    viewName: VIEW_NAME,
    fieldsMeta: modelDefinition.model.fields
  });

  console.log({ editMeta });

  return editMeta;
}
