import { config, validateConfig } from '@/config';
import { startServer } from '.';

// Validate environment variables
validateConfig();

// Start the server
startServer().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});
