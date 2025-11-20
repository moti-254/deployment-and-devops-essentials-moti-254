const monitoring = {
  // Error tracking
  logError: (error, context = {}) => {
    console.error('Application Error:', {
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack,
      context
    });
  },

  // Performance monitoring
  startTimer: () => {
    return process.hrtime();
  },

  endTimer: (startTime) => {
    const diff = process.hrtime(startTime);
    return (diff[0] * 1e9 + diff[1]) / 1e6; // Convert to milliseconds
  },

  // Memory usage monitoring
  getMemoryUsage: () => {
    const used = process.memoryUsage();
    return {
      rss: Math.round(used.rss / 1024 / 1024 * 100) / 100, // MB
      heapTotal: Math.round(used.heapTotal / 1024 / 1024 * 100) / 100, // MB
      heapUsed: Math.round(used.heapUsed / 1024 / 1024 * 100) / 100, // MB
      external: Math.round(used.external / 1024 / 1024 * 100) / 100, // MB
    };
  }
};

module.exports = monitoring;