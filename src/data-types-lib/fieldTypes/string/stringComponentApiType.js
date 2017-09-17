import { EMPTY_FIELD_VALUE } from '../../constants';

export default {

  /*
   * █████████████████████████████████████████████████████████
   * ████ FIELD_TYPE_STRING --> COMPONENT_API_TYPE_STRING ████
   * █████████████████████████████████████████████████████████
   *
   * COMPONENT_API_TYPE_STRING has no empty value => value may be EMPTY_FIELD_VALUE
   */
  formatter: value => value === EMPTY_FIELD_VALUE ? '' : value,

  /*
   * █████████████████████████████████████████████████████████
   * ████ COMPONENT_API_TYPE_STRING --> FIELD_TYPE_STRING ████
   * █████████████████████████████████████████████████████████
   */
  parser: value => value.trim() || EMPTY_FIELD_VALUE
};