import React from 'react';

import connect from '../../../../connect';
import { getEntityName } from '../../../../common/selectors';

export default connect({
  entityName: getEntityName
})(({ entityName }) =>
  <div>
    <h1>
      Create {entityName}
    </h1>
  </div>
);
