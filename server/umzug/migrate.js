import { migrator } from './umzug.js';

try {
  migrator.runAsCLI();
  console.log('Migration completed successfully');
} catch (error) {
  console.error('Migration failed:', error);
}
