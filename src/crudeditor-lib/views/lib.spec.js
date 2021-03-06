import 'regenerator-runtime/runtime'
import assert from 'assert'
import { expect } from 'chai';
import sinon from 'sinon';

import {
  buildFieldRender,
  // buildFormLayout,
  getLogicalKeyBuilder,
  findFieldLayout,
  getTab,
  expandOperation
} from './lib'

import /* models , */ { fields } from '../../demo/models/contracts'

// import {
//   FIELD_TYPE_BOOLEAN,
//   FIELD_TYPE_STRING_DATE,
//   FIELD_TYPE_STRING_NUMBER,
//   FIELD_TYPE_STRING
// } from '../../data-types-lib/constants';

const formLayout = [
  [
    {
      "field": "contractId",
      "readOnly": true,
      "render": {
        "value": {
          "propName": "value",
          "type": "string"
        }
      }
    },
    {
      "field": "description",
      "readOnly": true,
      "render": {
        "value": {
          "propName": "value",
          "type": "string"
        }
      }
    },
    {
      "field": "statusId",
      "readOnly": true,
      "render": {
        "value": {
          "type": "number",
          "propName": "value"
        }
      }
    },
    [
      {
        "field": "createdBy",
        "readOnly": true,
        "render": {
          "value": {
            "propName": "value",
            "type": "string"
          }
        }
      },
      {
        "field": "createdOn",
        "readOnly": true,
        "render": {
          "value": {
            "propName": "value",
            "type": "string"
          }
        }
      },
      {
        "field": "changedOn",
        "readOnly": true,
        "render": {
          "value": {
            "propName": "value",
            "type": "string"
          }
        }
      },
      {
        "field": "changedBy",
        "readOnly": true,
        "render": {
          "value": {
            "propName": "value",
            "type": "string"
          }
        }
      }
    ]
  ],
  [
    [
      {
        "field": "minOrderValue",
        "readOnly": true,
        "render": {
          "value": {
            "propName": "value",
            "type": "string"
          }
        }
      },
      {
        "field": "minOrderValueRequired",
        "readOnly": true,
        "render": {
          "value": {
            "type": "boolean",
            "propName": "value"
          }
        }
      },
      {
        "field": "maxOrderValue",
        "readOnly": true,
        "render": {
          "value": {
            "propName": "value",
            "type": "string"
          }
        }
      },
      {
        "field": "freeShippingBoundary",
        "readOnly": true,
        "render": {
          "value": {
            "propName": "value",
            "type": "string"
          }
        }
      },
      {
        "field": "freightSurcharge",
        "readOnly": true,
        "render": {
          "value": {
            "propName": "value",
            "type": "string"
          }
        }
      },
      {
        "field": "smallVolumeSurcharge",
        "readOnly": true,
        "render": {
          "value": {
            "propName": "value",
            "type": "string"
          }
        }
      },
      {
        "field": "totalContractedAmount",
        "readOnly": true,
        "render": {
          "value": {
            "propName": "value",
            "type": "string"
          }
        }
      }
    ],
    [
      {
        "field": "isStandard",
        "readOnly": true,
        "render": {
          "value": {
            "type": "boolean",
            "propName": "value"
          }
        }
      },
      {
        "field": "isPreferred",
        "readOnly": true,
        "render": {
          "value": {
            "type": "boolean",
            "propName": "value"
          }
        }
      },
      {
        "field": "isFrameContract",
        "readOnly": true,
        "render": {
          "value": {
            "type": "boolean",
            "propName": "value"
          }
        }
      },
      {
        "field": "isInternal",
        "readOnly": true,
        "render": {
          "value": {
            "type": "boolean",
            "propName": "value"
          }
        }
      },
      {
        "field": "isOffer",
        "readOnly": true,
        "render": {
          "value": {
            "type": "boolean",
            "propName": "value"
          }
        }
      }
    ]
  ]
];

describe('Crudeditor-lib / views / lib', () => {
  const instance = {
    a: 10,
    contractId: "777",
    c: "Hi"
  }

  describe('getLogicalKeyBuilder', () => {
    it('should create an object with primary keys', () => {
      const result = getLogicalKeyBuilder(fields)(instance)
      assert.deepEqual(
        result,
        { contractId: instance.contractId }
      );
    });
  });

  describe('findFieldLayout', () => {
    it('should return a proper layout for a given field', () => {
      const result = findFieldLayout('contractId')(formLayout)
      assert.deepEqual(
        result,
        {
          "field": "contractId",
          "readOnly": true,
          "render": {
            "value": {
              "propName": "value",
              "type": "string"
            }
          }
        }
      );
    });
  });

  // describe('buildFormLayout', () => {
  //   it('should build a form layout', () => {
  //     const result = buildFormLayout({
  //       customBuilder: models.ui.edit.formLayout,
  //       viewName: 'create',
  //       fieldsMeta: fields
  //     })(instance)
  //     assert(
  //       Array.isArray(result) && result.length > 0,
  //       true
  //     );
  //   });
  //   it('should return an empty object if not received a customBuilder', () => {
  //     const result = buildFormLayout({
  //       viewName: 'show',
  //       fieldsMeta: Object.keys(fields).reduce((obj, f) => [
  //         FIELD_TYPE_BOOLEAN,
  //         FIELD_TYPE_STRING,
  //         FIELD_TYPE_STRING_DATE,
  //         FIELD_TYPE_STRING_NUMBER
  //       ].indexOf(fields[f].type) > -1 ?
  //         {
  //           ...obj,
  //           [f]: fields[f]
  //         } :
  //         obj
  //         , {})
  //     })(instance)
  //     assert(
  //       Array.isArray(result) && result.length > 0,
  //       true
  //     );
  //   });
  // });

  describe('buildFieldRender', () => {
    it('should throw for unknown field type', () => {
      try {
        buildFieldRender({
          type: '&6783g5E^&^@fewK'
        })
        assert.fail()
      } catch (e) {
        assert(true)
      }
    });

    // it('should return an object', () => {
    //   const result = buildFieldRender({
    //     type: FIELD_TYPE_STRING_NUMBER
    //   })
    //   assert(
    //     typeof result,
    //     "object"
    //   )
    // });
  });

  describe('getTab', () => {
    const storeState = {
      formLayout: [
        [{ field: "one" }],
        [{ field: "two" }]
      ]
    };
    storeState.formLayout[0].tab = "general";
    storeState.formLayout[1].tab = "additional";

    it('should return a tab from formLayout', () => {
      const result = getTab(storeState.formLayout, 'additional');
      assert.deepEqual(
        result,
        storeState.formLayout[1]
      )
    });

    it('should return the first tab if name is not specified', () => {
      const result = getTab(storeState.formLayout);
      assert.deepEqual(
        result,
        storeState.formLayout[0]
      )
    });

    it('should return the first tab if name is unknown', () => {
      const result = getTab(storeState.formLayout, 'kwhe8923o23y8[023');
      assert.deepEqual(
        result,
        storeState.formLayout[0]
      )
    });
  });

  describe.skip('expandOperation', () => {
    it('should return an array with operation objects', () => {
      const softRedirectView = sinon.spy();
      const operations = _ => [{
        name: 'one',
        handler: _ => ({
          name: 'viewName1'
        })
      }];
      const ops = expandOperation({
        viewName: 'aaa',
        viewState: {},
        operations,
        softRedirectView
      })({});
      expect(ops).to.be.instanceof(Array); // eslint-disable-line no-unused-expressions
      const op = ops[0];
      expect(op.name).to.equal('one'); // eslint-disable-line no-unused-expressions
      expect(op.handler).to.be.instanceof(Function); // eslint-disable-line no-unused-expressions
      op.handler();
      expect(softRedirectView.calledWith({ // eslint-disable-line no-unused-expressions
        name: 'viewName1'
      })).to.be.true
    });

    it('should return an empty array for empty undefined/null viewState', () => {
      const softRedirectView = sinon.spy();
      const operations = _ => [{
        name: 'one',
        handler: _ => ({
          name: 'viewName1'
        })
      }];
      const ops = expandOperation({
        viewName: 'aaa',
        viewState: null,
        operations,
        softRedirectView
      })({});
      expect(ops).to.be.instanceof(Array); // eslint-disable-line no-unused-expressions
      expect(ops.length).to.equal(0); // eslint-disable-line no-unused-expressions
    });
  });
});

