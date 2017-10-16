import assert from 'assert';
import entries from 'object.entries';
import {
  get,
  create,
  update,
  search,
  deleteMany,
  getNumberOfInstances,
  getContracts
} from './api';

import asyncApi from './asyncApi';

if (!Object.entries) {
  entries.shim();
}

const realInstance = {
  "contractId": "Excision of mouth NEC",
  "extContractId": "Dilation of R Fem Art with 4+ Intralum Dev, Perc Approach",
  "description": "Person outside 3-whl mv inj in clsn w hv veh in traf, subs",
  "statusId": "105",
  "currencyId": "PEN",
  "minOrderValueRequired": null,
  "minOrderValue": null,
  "maxOrderValue": null,
  "isStandard": true,
  "isFrameContract": true,
  "isOffer": false,
  "isPreferred": false,
  "isInternal": true,
  "createdOn": "2011-02-19T00:03:43Z",
  "changedOn": "2016-12-14T18:06:34Z",
  "createdBy": "Gabbi Detheridge",
  "changedBy": "Murvyn Grouer",
  "validRange": {
    "from": "2017-07-19T22:09:36Z",
    "to": "2017-12-24T12:02:43Z"
  },
  "extContractLineId": "Mult birth NOS-nonhosp",
  "freeShippingBoundary": 18827,
  "totalContractedAmount": 6085,
  "smallVolumeSurcharge": 82038,
  "freightSurcharge": 36792
};

describe('client-side api functions:', () => {
  describe('get ', () => {
    const before = getNumberOfInstances();
    it('should get a contract instance', () => {
      const instance = get({ instance: { "contractId": realInstance.contractId } });
      const after = getNumberOfInstances();
      assert.deepEqual(
        instance,
        realInstance
      );
      assert.equal(before, after, 'Source data length changed unexpectedly!')
    });
  });

  describe('create ', () => {
    const instance = { "contractId": "t0tALly RanD0m ContracT ID", "description": "random description" };

    it('should return a saved contract instance', () => {
      const before = getNumberOfInstances();
      const savedInstance = create({ instance });
      const after = getNumberOfInstances();
      assert.deepEqual(
        instance,
        savedInstance
      );
      assert.equal(before + 1, after, 'Source data length changed unexpectedly!')
    });

    it('should return Error if contract already exists', () => {
      const error = create({ instance });

      assert.equal(
        error instanceof Error,
        true
      );
    });
  });

  describe('update ', () => {
    const updatedInstance = {
      ...realInstance,
      description: "UPDATED!"
    }

    it('should return an updated instance', () => {
      const before = getNumberOfInstances();
      const result = update({ instance: updatedInstance });
      const after = getNumberOfInstances();
      assert.deepEqual(
        result,
        updatedInstance
      );
      assert.equal(before, after, 'Source data length changed unexpectedly!')

      // restore updated value
      update({ instance: realInstance });
    });

    it('should return an error for unknown contractId', () => {
      const before = getNumberOfInstances();
      const instance = { contractId: "mP%*}RSI{E6>g~}~}(4|.NdJ]9w&<q-c-suS56G/f#oB(zXR=xHq1BlB*T}GJssU" };
      const result = update({ instance });
      const after = getNumberOfInstances();
      assert.deepEqual(
        result,
        { error: `Contract [${instance.contractId}] not found` }
      );
      assert.equal(before, after, 'Source data length changed unexpectedly!')
    });
  });

  describe('deleteMany ', () => {
    const numToDelete = 14;
    it('should return a number of deleted instances', () => {
      const before = getNumberOfInstances();
      const itemsToDelete = getContracts().slice(100, 100 + numToDelete)
      const numDeleted = deleteMany({ instances: itemsToDelete });
      const after = getNumberOfInstances();
      assert.deepEqual(
        numDeleted,
        numToDelete
      );
      assert.equal(before - numToDelete, after, "Deleted wrong number of items")

      // restore deleted items
      for (const instance of itemsToDelete) {
        create({ instance })
      }
      const afterRestore = getNumberOfInstances();
      assert.equal(before, afterRestore, "Not properly restored deleted items")
    });
  });

  describe('search ', () => {
    const filter = {
      "contractId": "Excision of mouth NEC",
      "extContractId": "Dilation of R Fem Art with 4+ Intralum Dev, Perc Approach",
      "isFrameContract": true,
      "isOffer": false,
    }

    it('should find proper instance', () => {
      const before = getNumberOfInstances();
      const { instances } = search({ filter })
      const after = getNumberOfInstances();

      assert.deepEqual(
        instances[0],
        realInstance
      );

      assert.equal(before, after, 'Source data length changed unexpectedly!')
    });

    it('should find by string', () => {
      const before = getNumberOfInstances();
      const filter = {
        description: 'cavity'
      }
      const { instances, totalCount } = search({ filter })
      const after = getNumberOfInstances();

      assert.deepEqual(
        instances,
        getContracts().filter(c => c.description && ~c.description.indexOf(filter.description))
      );

      assert.equal(
        totalCount,
        instances.length
      )

      assert.equal(before, after, 'Source data length changed unexpectedly!')
    });

    it('should find by dateString', () => {
      const before = getNumberOfInstances();
      const filter = {
        createdOn: "2012-06-02T09:28:45Z"
      }
      const { instances } = search({ filter })
      const after = getNumberOfInstances();

      assert.deepEqual(
        instances,
        getContracts().filter(c => c.createdOn && c.createdOn === filter.createdOn)
      );

      assert.equal(before, after, 'Source data length changed unexpectedly!')
    });

    it('should find by boolean value', () => {
      const before = getNumberOfInstances();
      const filter = {
        isOffer: true,
        isPreferred: false
      }
      const { instances } = search({ filter })
      const after = getNumberOfInstances();

      assert.deepEqual(
        instances,
        getContracts().filter(c => c.isOffer === filter.isOffer && c.isPreferred === filter.isPreferred)
      );

      assert.equal(before, after, 'Source data length changed unexpectedly!')
    });

    it('should sort by field', () => {
      const before = getNumberOfInstances();
      const filter = { extContractId: 'Replacement' };
      const sort = 'statusId';
      const { instances } = search({ filter, sort })
      const after = getNumberOfInstances();

      assert.equal(
        instances.length,
        getContracts().filter(
          c => c.extContractId && ~c.extContractId.indexOf(filter.extContractId)
        ).length
      );

      assert.deepEqual(
        instances.map(e => e[sort]),
        instances.map(e => e[sort]).sort(),
        "Result was not sorted properly"
      )

      assert.equal(before, after, 'Source data length changed unexpectedly!')
    });

    it('should sort in ascending order', () => {
      const before = getNumberOfInstances();
      const filter = { extContractId: 'Replacement' };
      const sort = 'statusId';
      const { instances } = search({ filter, sort, order: 'asc' })
      const after = getNumberOfInstances();

      assert.equal(
        instances.length,
        getContracts().filter(
          c => c.extContractId && ~c.extContractId.indexOf(filter.extContractId)
        ).length
      );

      assert.deepEqual(
        instances.map(e => e[sort]),
        instances.map(e => e[sort]).sort(),
        "Result was not sorted properly"
      )

      assert.equal(before, after, 'Source data length changed unexpectedly!')
    });

    it('should sort in descending order', () => {
      const before = getNumberOfInstances();
      const filter = { extContractId: 'Replacement' };
      const sort = 'statusId';
      const { instances } = search({ filter, sort, order: 'desc' })
      const after = getNumberOfInstances();

      assert.equal(
        instances.length,
        getContracts().filter(
          c => c.extContractId && ~c.extContractId.indexOf(filter.extContractId)
        ).length
      );

      assert.deepEqual(
        instances.map(e => e[sort]),
        instances.map(e => e[sort]).sort().reverse(),
        "Result was not sorted properly"
      )

      assert.equal(before, after, 'Source data length changed unexpectedly!')
    });

    it('should handle offset properly', () => {
      const before = getNumberOfInstances();
      const offset = 13;
      const { instances, totalCount } = search({ offset })
      const after = getNumberOfInstances();

      assert.equal(
        instances.length,
        getContracts().length - offset
      );

      assert.deepEqual(
        instances,
        getContracts().slice(offset),
        "Returned array is not the one expected"
      )

      assert.equal(
        totalCount,
        instances.length + offset
      )

      assert.equal(before, after, 'Source data length changed unexpectedly!')
    });

    it('should handle max properly', () => {
      const before = getNumberOfInstances();
      const max = 23;
      const { instances } = search({ max })
      const after = getNumberOfInstances();

      assert.equal(
        instances.length,
        max
      );

      assert.deepEqual(
        instances,
        getContracts().slice(0, max),
        "Returned array is not the one expected"
      )

      assert.equal(before, after, 'Source data length changed unexpectedly!')
    });
  });
});

// TODO
// write tests for async api functions
// TEST BELOW WORKED BUT NOW BROKEN ;(
// TODO: investigate and fix

describe('Async (converted to a promise with fake timeout) api', _ => {
  describe('async get', _ => {
    it('should return a proper instance', done => {
      asyncApi.get({ instance: { "contractId": realInstance.contractId } }).
        then(res => {
          assert.deepEqual(
            res,
            realInstance
          );
          done()
        }).
        catch(done)
    });
  });
});

