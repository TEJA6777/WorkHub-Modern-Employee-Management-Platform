// Environment-specific API configuration
// Update these URLs based on your deployment environment

// Use localhost:8080 for local development
// Use your Heroku backend URL for production: https://your-app.herokuapp.com
// Use your AWS/Azure backend URL for cloud deployment

export const API_CONFIG = {
  // For local development
  LOCAL: {
    BACKEND_URL: 'http://localhost:8080',
    API_BASE: 'http://localhost:8080/api',
  },

  // For Heroku deployment
  HEROKU: {
    BACKEND_URL: 'https://your-heroku-backend.herokuapp.com',
    API_BASE: 'https://your-heroku-backend.herokuapp.com/api',
  },

  // For AWS deployment
  AWS: {
    BACKEND_URL: 'https://your-aws-backend.com',
    API_BASE: 'https://your-aws-backend.com/api',
  },

  // For Azure deployment
  AZURE: {
    BACKEND_URL: 'https://your-azure-backend.azurewebsites.net',
    API_BASE: 'https://your-azure-backend.azurewebsites.net/api',
  },

  // For Netlify frontend with Heroku backend
  NETLIFY: {
    BACKEND_URL: 'https://your-heroku-backend.herokuapp.com',
    API_BASE: 'https://your-heroku-backend.herokuapp.com/api',
  },
};

// Determine the current environment
function getEnvironment() {
  const host = window.location.hostname;

  if (host === 'localhost' || host === '127.0.0.1') {
    return 'LOCAL';
  } else if (host.includes('netlify.app')) {
    return 'NETLIFY';
  } else if (host.includes('herokuapp.com')) {
    return 'HEROKU';
  } else if (host.includes('azurewebsites.net')) {
    return 'AZURE';
  } else if (host.includes('amazonaws.com')) {
    return 'AWS';
  }

  // Default to local development
  return 'LOCAL';
}

// Get configuration for current environment
export const getConfig = () => {
  const env = getEnvironment();
  return API_CONFIG[env];
};

// Get API URL
export const getApiUrl = (endpoint) => {
  const config = getConfig();
  return `${config.API_BASE}${endpoint}`;
};

// Get backend URL
export const getBackendUrl = () => {
  const config = getConfig();
  return config.BACKEND_URL;
};

// Log current environment (for debugging)
export const logEnvironment = () => {
  const env = getEnvironment();
  const config = getConfig();
  console.log(`Environment: ${env}`);
  console.log(`Backend URL: ${config.BACKEND_URL}`);
  console.log(`API Base: ${config.API_BASE}`);
};

export default {
  getConfig,
  getApiUrl,
  getBackendUrl,
  logEnvironment,
};
