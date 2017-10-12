import { VIEW_CREATE } from '../../common/constants';

const namespace = VIEW_CREATE;

export const
  VIEW_NAME = VIEW_CREATE,

  /* ████████████████████████████████████████████*\
   *███ ACTION TYPES (in alphabetical order) ███*
  \*████████████████████████████████████████████*/

  AFTER_ACTION_NEW = 'new',
  INSTANCE_CREATE = namespace + '/INSTANCE_CREATE',
  INSTANCE_CREATE_FAIL = namespace + '/INSTANCE_CREATE_FAIL',
  INSTANCE_CREATE_REQUEST = namespace + '/INSTANCE_CREATE_REQUEST',
  INSTANCE_CREATE_SUCCESS = namespace + '/INSTANCE_CREATE_SUCCESS',

  INSTANCE_EDIT = namespace + '/INSTANCE_EDIT',

  INSTANCE_FIELD_CHANGE = namespace + '/INSTANCE_FIELD_CHANGE',
  INSTANCE_FIELD_VALIDATE = namespace + '/INSTANCE_FIELD_VALIDATE',

  INSTANCE_VALIDATE_REQUEST = namespace + '/INSTANCE_VALIDATE_REQUEST',
  INSTANCE_VALIDATE_FAIL = namespace + '/INSTANCE_VALIDATE_FAIL',
  INSTANCE_VALIDATE_SUCCESS = namespace + '/INSTANCE_VALIDATE_SUCCESS',

  INSTANCE_SAVE = namespace + '/INSTANCE_SAVE',
  INSTANCE_SAVE_FAIL = namespace + '/INSTANCE_SAVE_FAIL',
  INSTANCE_SAVE_REQUEST = namespace + '/INSTANCE_SAVE_REQUEST',
  INSTANCE_SAVE_SUCCESS = namespace + '/INSTANCE_SAVE_SUCCESS',

  TAB_SELECT = namespace + '/TAB_SELECT',
  VIEW_EXIT = namespace + '/VIEW_EXIT',

  VIEW_INITIALIZE_REQUEST = namespace + '/VIEW_INITIALIZE_REQUEST',
  VIEW_INITIALIZE_FAIL = namespace + '/VIEW_INITIALIZE_FAIL',
  VIEW_INITIALIZE_SUCCESS = namespace + '/VIEW_INITIALIZE_SUCCESS',

  VIEW_REDIRECT_REQUEST = namespace + '/VIEW_REDIRECT_REQUEST',
  VIEW_REDIRECT_FAIL = namespace + '/VIEW_REDIRECT_FAIL',
  VIEW_REDIRECT_SUCCESS = namespace + '/VIEW_REDIRECT_SUCCESS'

  /* ████████████████████████████████████████████████████*\
   *███ STATUSES OF THE VIEW (in alphabetical order) ███*
  \*████████████████████████████████████████████████████*/
