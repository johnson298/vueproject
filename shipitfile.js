var utils = require('shipit-utils');
require('dotenv').config();

module.exports = shipit => {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      deployTo: process.env.DEPLOY_TO,
      repositoryUrl: process.env.DEPLOY_REPO,
      shared: {
        overwrite: true,
        files: [
          '.env',
        ],
      },
      workspace: process.env.DEPLOY_TO,
      // shallowClone: false
    },
    staging: {
      servers: [
        {
          host: process.env.DEPLOY_HOST,
          user: process.env.DEPLOY_USER
        }
      ],
      branch: 'master',
      workspace: process.env.DEPLOY_TO
    },
  });

  shipit.blTask('deploy:yarn', async () => {
    await shipit.remote('cd ' + process.env.DEPLOY_TO + '/current && cp .env.example .env');
    await shipit.remote('cd ' + process.env.DEPLOY_TO + '/current && yarn');
    await shipit.remote('cd ' + process.env.DEPLOY_TO +'/current && yarn build');
  });

  utils.registerTask(shipit, 'deploy', [
    'deploy:init',
    'deploy:fetch',
    'deploy:update',
    'deploy:publish',
    'deploy:yarn',
    'deploy:clean',
    'deploy:finish',
  ]);
};
