import asyncApi from './asyncApi';

export default {
  get({ instance }) {
    console.log('Making inlinedata API-get call', JSON.stringify(instance));
    return asyncApi.get({ instance });
  },
  search({ filter, sort, order, offset, max }) {
    console.log('Making inlinedata API-search call', JSON.stringify({ filter, sort, order, offset, max }));
    return asyncApi.search({ filter, sort, order, offset, max });
  },
  delete({ instances }) {
    console.log('Making inlinedata API-delete call', JSON.stringify(instances));
    return asyncApi.delete({ instances });
  },
  create({ instance }) {
    console.log('Making inlinedata API-create call', JSON.stringify(instance));
    return asyncApi.create({ instance }).
      then(instance => instance).
      catch(_ => ({
        code: 403,
        message: "This is already exists in the database"
      }))
  },
  update({ instance }) {
    console.log('Making inlinedata API-update call', JSON.stringify(instance));
    return asyncApi.update({ instance });
  }
}
