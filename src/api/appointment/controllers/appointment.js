"use strict";

/**
 * appointment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::appointment.appointment",
  ({ strapi }) => ({
    async create(ctx) {
      const { doctorId, date } = ctx.request.body.data;

      ctx.request.body.data.date = new Date(date)


      const doctor = await strapi.entityService.findOne(
        "api::doctor.doctor",
        doctorId
      );

      if (doctor) {
        const [_date, time] = date.replace(':', '.').split('.')
        doctor.reception[_date][time] = false;

        await strapi.entityService.update("api::doctor.doctor", doctorId, {
          data: {
            reception: doctor.reception,
          },
        });
      }


      const response = await super.create(ctx); //TODO мне кажется сначала должен вызываться метод super а потом уже побочная логика, а то у врача время забито, а appointment не создался

      return response;
    },
  })
);
