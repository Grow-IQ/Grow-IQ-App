
const CONFIG = {
    appName: import.meta.env.VITE_APP_NAME || "GrowIQ",
    appVersion: import.meta.env.VITE_APP_VERSION || "0.0.0",
    nodeEnv: import.meta.env.VITE_NODE_ENV || "development",
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
    enableLogging: import.meta.env.VITE_ENABLE_LOGGING === 'true',

    // Helper methods
    isDevelopment: () => CONFIG.nodeEnv === 'development',
    isProduction: () => CONFIG.nodeEnv === 'production',

    // Firebase config access
    firebase: {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    }
};

export default CONFIG;