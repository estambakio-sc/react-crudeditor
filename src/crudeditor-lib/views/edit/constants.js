import { commonConstants } from '../../common';

export const
  VIEW_NAME = commonConstants.VIEW_EDIT,

  /*███████████████████████████████████████*\
   *███ ACTIONS (in alphabetical order) ███*
  \*███████████████████████████████████████*/

  INSTANCE_EDIT         = VIEW_NAME + '/INSTANCE_EDIT',
  INSTANCE_EDIT_FAIL    = VIEW_NAME + '/INSTANCE_EDIT_FAIL',
  INSTANCE_EDIT_REQUEST = VIEW_NAME + '/INSTANCE_EDIT_REQUEST',
  INSTANCE_EDIT_SUCCESS = VIEW_NAME + '/INSTANCE_EDIT_SUCCESS',

  /*████████████████████████████████████████*\
   *███ STATUSES (in alphabetical order) ███*
  \*████████████████████████████████████████*/

  EXTRACTING = VIEW_NAME + '/EXTRACTING',
  DELETING   = VIEW_NAME + '/DELETING',
  READY      = VIEW_NAME + '/READY',
  UPDATING   = VIEW_NAME + '/UPDATING';
