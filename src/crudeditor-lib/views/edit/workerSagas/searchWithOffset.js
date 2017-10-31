import { call, select } from 'redux-saga/effects';
import { VIEW_SEARCH } from '../../../common/constants';
import searchSaga from '../../search/workerSagas/search';

export default function(incNum) {
  return function* ({
    modelDefinition,
    meta,
    instance,
    searchParams
  }) {
    // retrieve search params
    const filter = yield select(storeState => storeState.views[VIEW_SEARCH].resultFilter);
    const { field: sort, order } = yield select(storeState => storeState.views[VIEW_SEARCH].sortParams);

    const { navOffset, nextInc } = searchParams;

    // nextInc is a scenario-scoped iterator
    // it resets when 'edit' view (namely edit/scenario.js) is loaded
    // it increments on nextInc.next(1) call
    // or decrements on nextInc.next(-1) call

    let { i, init } = nextInc.next({ i: incNum }).value

    // the first iteration initializes iterator
    // if this is the first one, we need to re-iterate in order to
    // receive a proper value
    // 'init' === false for any iteration after the first one
    if (init) {
      i = nextInc.next({ i: incNum }).value.i
    }

    const offset = navOffset + i;

    try {
      const { instances, totalCount } = yield call(searchSaga, {
        modelDefinition,
        action: {
          payload: {
            filter,
            sort,
            order,
            offset
          },
          meta
        }
      });

      // return instances, totalCount and new navOffset
      // BEWARE: navOffset is scoped to workerSagas/edit.js and is used to decide about showing/hiding a button
      // it does not propagate to edit/scenario.js, neither does the whole searchParams object
      return { instances, totalCount, navOffset: offset };
    } catch (err) {
      throw err; // Initialization error(s) are forwarded to the parent saga.
    }
  }
}