import net from 'net';
import { spawn } from 'child_process';

const PORT = 4000;

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => {
      resolve(false);
    });
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '::');
  });
}

(async () => {
  const free = await isPortFree(PORT);
  if (!free) {
    console.log(`Port ${PORT} is already in use. Server may already be running. Aborting start.`);
    process.exit(0);
  }

  console.log(`Port ${PORT} is free — starting backend server...`);
  const child = spawn('npm', ['--prefix', 'server', 'start'], { stdio: 'inherit', shell: true });
  child.on('exit', (code) => process.exit(code ?? 0));
})();
