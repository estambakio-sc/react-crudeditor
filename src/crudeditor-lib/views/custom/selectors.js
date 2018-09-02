import { buildViewSelectorWrapper } from '../../selectorWrapper';
import { STATUS_REDIRECTING, STATUS_CREATING } from '../../common/constants';

export const getViewModelData = viewName => buildViewSelectorWrapper(viewName)((storeState, {
  model,
  ui: { spinner }
}) => ({
  spinner,
  entityName: model.name,
  isLoading: ([STATUS_REDIRECTING, STATUS_CREATING].indexOf(storeState.status) !== -1),
  viewName
}));
