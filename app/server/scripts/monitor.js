#!/usr/bin/env node

const axios = require('axios');

class ChatMonitor {
  constructor(backendUrl) {
    this.backendUrl = backendUrl;
  }

  async checkHealth() {
    try {
      const response = await axios.get(`${this.backendUrl}/api/health`);
      console.log('✅ Health Check:', response.data);
      return true;
    } catch (error) {
      console.error('❌ Health Check Failed:', error.message);
      return false;
    }
  }

  async checkMetrics() {
    try {
      const response = await axios.get(`${this.backendUrl}/api/metrics`);
      console.log('📊 Metrics:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Metrics Check Failed:', error.message);
      return null;
    }
  }

  async simulateLoad() {
    console.log('🚀 Simulating load...');
    
    // Simulate multiple health checks
    const checks = Array(5).fill().map((_, i) => 
      this.checkHealth().then(() => console.log(`Check ${i + 1} completed`))
    );
    
    await Promise.all(checks);
    console.log('✅ Load test completed');
  }
}

// CLI interface
const backendUrl = process.argv[2] || 'http://localhost:5000';
const command = process.argv[3] || 'health';

const monitor = new ChatMonitor(backendUrl);

switch (command) {
  case 'health':
    monitor.checkHealth();
    break;
  case 'metrics':
    monitor.checkMetrics();
    break;
  case 'load':
    monitor.simulateLoad();
    break;
  case 'all':
    monitor.checkHealth().then(() => monitor.checkMetrics());
    break;
  default:
    console.log('Available commands:');
    console.log('  health    - Check backend health');
    console.log('  metrics   - Get application metrics');
    console.log('  load      - Simulate load');
    console.log('  all       - Run all checks');
    break;
}