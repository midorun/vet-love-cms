"use strict";

/**
 * doctor controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::doctor.doctor", ({ strapi }) => ({
  async update(ctx) {
    const { id } = ctx.params;
    const req = ctx.request.body.reception.split(":");
    const date = req[0];
    const time = req[1] + ":" + req[2];

    const entry = await strapi.entityService.findOne("api::doctor.doctor", id);

    console.log(entry.reception);
    console.log(date);
    entry.reception[date][time] = false;

    ctx.request.body.data = {
      ...entry,
    };

    const response = await super.update(ctx);

    return response;
  },
}));
