import app from './app.js';
import { initDatabase } from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = parseInt(process.env.PORT || '5000', 10);

async function startServer() {
  console.log('--------------------------------------------------');
  console.log('          🛡️  ScamLens Cybersecurity API          ');
  console.log('--------------------------------------------------');

  // Attempt database connection
  await initDatabase();

  const server = app.listen(PORT, () => {
    console.log(`[Server] ScamLens backend listening on http://localhost:${PORT}`);
    console.log(`[Health] Status endpoint: http://localhost:${PORT}/api/health`);
  });

  // Graceful shutdown
  const shutdown = () => {
    console.log('\n[Server] Shutting down gracefully...');
    server.close(() => {
      console.log('[Server] Closed remaining connections.');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

startServer();
