import { seeder } from './umzug.js';

try {
  seeder.runAsCLI();
  console.log('Seeding completed successfully');
} catch (error) {
  console.error('Seeding failed:', error);
}
