const config = require('config');

const Application = require('./application');

init();

async function init() {
  try {
    const port = config.get('server.port');

    const application = new Application({ port });

    application.start(() => {
      console.log(`Express App Listening on Port ${port}`);
    });

  } catch (error) {
    console.error(error)
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
