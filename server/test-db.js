const sequelize = require('./config/db');

sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully'))
  .catch((err) => console.error('❌ Unable to connect:', err));
