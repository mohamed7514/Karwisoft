import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

for (const file of ['navigation', 'dual', 'services', 'budgets', 'responsive']) {
  const code = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [fileURLToPath(new URL(`./browser/${file}.mjs`, import.meta.url))], { stdio: 'inherit', windowsHide: true });
    child.on('error', reject);
    child.on('exit', resolve);
  });
  if (code !== 0) { process.exitCode = code || 1; break; }
}
