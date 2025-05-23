const { connect, connection } = require('mongoose');

const connectToDatabase = async () => {
  try {
    await connect(process.env.DATABASE_LOCAL);
  } catch (error) {
    console.error(`[-] database connection > ${error}`);
    console.info('[i] process terminated.');

    process.exit(1);
  }
};

connection.once('connected', () => {
  console.log('[+] database connected.');
});

connection.on('disconnected', () => {
  console.info('[i] database disconnected.');
});

connection.on('reconnected', () => {
  console.info('[i] database reconnected.');
});

connection.on('error', (err) => {
  console.error(`[-] database error > ${err}.`);
});

module.exports = { connectToDatabase };
