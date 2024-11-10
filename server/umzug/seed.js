import { seeder } from './umzug.js';

async function runSeeders() {
  try {
    await seeder.up();
    console.log('Seeders applied successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

runSeeders();
