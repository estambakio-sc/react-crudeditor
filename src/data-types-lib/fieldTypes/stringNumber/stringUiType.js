import Big from 'big.js';

import {
  ERROR_CODE_PARSING,
  EMPTY_FIELD_VALUE,
  ERROR_INVALID_NUMBER
} from '../../constants';

export default {

  /*
   * █████████████████████████████████████████████████████
   * ████ FIELD_TYPE_STRING_NUMBER --> UI_TYPE_STRING ████
   * █████████████████████████████████████████████████████
   *
   * UI_TYPE_STRING has no empty value => value may be EMPTY_FIELD_VALUE
   */
  formatter: value => value === EMPTY_FIELD_VALUE ? '' : new Big(value).toString(),

  /*
   * █████████████████████████████████████████████████████
   * ████ UI_TYPE_STRING --> FIELD_TYPE_STRING_NUMBER ████
   * █████████████████████████████████████████████████████
   */
  parser: value => {
    const optimized = value.trim();

    if (!optimized) {
      return EMPTY_FIELD_VALUE; // Considering whitespaces-only strings to be empty value.
    }

    try {
      return new Big(optimized).toString();
    } catch (ignoredError) {
      const error = {
        code: ERROR_CODE_PARSING,
        id: ERROR_INVALID_NUMBER,
        message: 'Invalid number'
      };

      throw error;
    }
  }
};