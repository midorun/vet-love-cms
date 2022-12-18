'use strict';

/**
 * client service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::client.client', ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx)

    return response
  }
}));
