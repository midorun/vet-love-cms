'use strict';

/**
 * appointment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::appointment.appointment', ({ strapi }) => ({
  // async create(ctx) {
  //   const response = await super.create(ctx);
  //   const { data: newAppointment } = response
  //
  //   const { body: { data } } = ctx.request
  //
  //   const { clientId, doctorId } = data
  //
  //   const client = await strapi.entityService.findOne("api::client.client", clientId, {
  //     fields: [],
  //     populate: ['appointments']
  //   })
  //
  //   if (client) {
  //     const { appointments } = client
  //
  //     await strapi.entityService.update("api::client.client", clientId, {
  //       data: {
  //         appointments: [...appointments, newAppointment]
  //       }
  //     })
  //   }
  //
  //   const doctor = await strapi.entityService.findOne("api::doctor.doctor", doctorId, {
  //     fields: [],
  //     populate: ['appointments']
  //   })
  //
  //   if (doctor) {
  //     const { appointments } = doctor
  //
  //     await strapi.entityService.update("api::doctor.doctor", doctorId, {
  //       data: {
  //         appointments: [...appointments, newAppointment]
  //       }
  //     })
  //   }
  //
  //   return response;
  // }
}));

