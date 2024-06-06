// config.js

const config = {
    development: {
      apiUrl: 'http://localhost:3000/api',
    },
    production: {
      apiUrl: 'https://your-production-api.com/api',
    },
  };
  
  // Use the appropriate environment configuration
  const environment = process.env.NODE_ENV || 'development';
  const currentConfig = config[environment];
  
  export default currentConfig;
  