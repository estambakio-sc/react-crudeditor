import { VIEW_NAME } from './constants';
import { buildViewSelectorWrapper } from '../../selectorWrapper';
import { DEFAULT_FIELD_TYPE } from '../../common/constants';

const wrapper = buildViewSelectorWrapper(VIEW_NAME);

export const

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getStatus = wrapper(({ status }) => status),

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getViewName = _ => VIEW_NAME,

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getViewState = wrapper(({
    persistentInstance,
    activeTab: {
      tab
    } = {}
  }, {
    model: {
      logicalId: logicalIdFields
    }
  }) => ({
    instance: Object.entries(persistentInstance).reduce(
      (rez, [fieldName, fieldValue]) => logicalIdFields.includes(fieldName) ? {
        ...rez,
        [fieldName]: fieldValue
      } :
      rez,
      {}
    ),
    tab
  })),

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getPersistentInstance = wrapper(({ persistentInstance }) => persistentInstance),

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getFormInstance = wrapper(({ formInstance }) => formInstance),

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getInstanceDescription = wrapper(({ instanceDescription }) => instanceDescription),

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getTabs = wrapper(({ formLayout }) => formLayout.filter(({ tab }) => tab)),  // [] in case of no tabs.

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getActiveTab = wrapper(({ activeTab }) => activeTab),

  /* █████████████████████████████████████████████████████████████████████████████████████████████████████████
   *
   * An array of fields and sections. It is activeTab content when tabs exist or all sections/fields otherwise.
   */
  getActiveEntries = wrapper(({
    formLayout,
    activeTab
  }) => activeTab ?
    activeTab.entries || []:
    formLayout
  ),

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getErrors = wrapper(({ errors }) => errors),

  // █████████████████████████████████████████████████████████████████████████████████████████████████████████

  getFieldsMeta = wrapper((_, {
    model: { fields }
  }) => Object.entries(fields).reduce(
    (rez, [ name, info ]) => ({
      ...rez,
      [name]: {
        type: DEFAULT_FIELD_TYPE,
        constraints: {},
        ...info
      }
    }),
    {}
  ));
