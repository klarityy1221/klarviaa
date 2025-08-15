// Simple API connectivity test (uses global fetch in Node 18+)
import dotenv from 'dotenv';
dotenv.config();

const API = 'http://localhost:4000/api';

async function run() {
  try {
    const users = await fetch(`${API}/users`).then(r => r.json());
    console.log('Users:', users);
    const resources = await fetch(`${API}/resources`).then(r => r.json());
    console.log('Resources count:', resources.length);
    console.log('API test complete');
  } catch (e) {
    console.error('API test failed', e);
    process.exit(1);
  }
}
run();
