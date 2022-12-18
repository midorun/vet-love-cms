'use strict';

/**
 * pet controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pet.pet', ({ strapi }) => ({
  // async create(ctx) {
  //   const response = await super.create(ctx)
  //   const { data: newPet } = response
  //
  //   const { body: { data } } = ctx.request
  //   const { clientId } = data
  //
  //   const client = await strapi.entityService.findOne("api::client.client", clientId, {
  //     fields: [],
  //     populate: ['pets']
  //   })
  //
  //   if (client) {
  //     const { pets } = client
  //
  //     await strapi.entityService.update('api::client.client', clientId, {
  //       data: {
  //         pets: [...pets, newPet]
  //       }
  //     })
  //   }
  //
  //   return response
  // }
}));
