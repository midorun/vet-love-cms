export default () => ({
  // enable a plugin that doesn't require any configuration
  // i18n: false,

  // enable a custom plugin
  // myplugin: {
  //   // my-plugin is going to be the internal name used for this plugin
  //   enabled: true,
  //   resolve: './src/plugins/my-local-plugin',
  //   config: {
  //     // user plugin config goes here
  //   },
  // },

  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '5000',
      },
    },
  },

  // disable a plugin
  // myotherplugin: {
  //   enabled: false, // plugin installed but disabled
  // },
});
