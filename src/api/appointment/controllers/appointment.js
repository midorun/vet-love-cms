"use strict";

/**
 * appointment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::appointment.appointment",
  ({ strapi }) => ({
    async create(ctx) {
      const { doctorId, time } = ctx.request.body.data;

      ctx.request.body.data = {
        ...ctx.request.body.data,
        time: new Date(time),
      };

      const doctor = await strapi.entityService.findOne(
        "api::doctor.doctor",
        doctorId
      );

      if (doctor) {
        const date = time.slice(0, 10);
        const hours = time.slice(-5);
        doctor.reception[date][hours] = false;

        await strapi.entityService.update("api::doctor.doctor", doctorId, {
          data: {
            reception: doctor.reception,
          },
        });
      }

      const response = await super.create(ctx);

      return response;
    },
  })
);
