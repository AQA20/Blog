import { migrator } from './umzug.js';

async function runMigrations() {
  try {
    await migrator.up();
    console.log('Migrations applied successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

runMigrations();
