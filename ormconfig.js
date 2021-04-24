module.exports =
  process.env.NODE_ENV === 'production'
    ? require('./dist/config/database')
    : require('./src/config/database');
