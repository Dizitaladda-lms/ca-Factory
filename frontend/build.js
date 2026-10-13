import { build } from 'vite';

async function run() {
  try {
    await build();
    console.log('✓ Build completed successfully!');
  } catch (err) {
    console.error('==================== BUILD FAILED ====================');
    console.error('Root error message:', err?.message || err);
    if (err?.errors && Array.isArray(err.errors)) {
      console.error(`Total individual errors: ${err.errors.length}`);
      err.errors.forEach((e, i) => {
        console.error(`\n--- [Error #${i + 1}] ---`);
        console.error('Name:', e?.name);
        console.error('Message:', e?.message);
        console.error('File / ID:', e?.id || e?.filename || e?.file);
        if (e?.loc) console.error('Location:', JSON.stringify(e.loc));
        if (e?.frame) console.error('Frame:\n' + e.frame);
        if (e?.stack) console.error('Stack:\n' + e.stack);
      });
    } else {
      if (err && typeof err === 'object') {
        const { watchFiles, ...cleanErr } = err;
        console.error(cleanErr);
      } else {
        console.error(err);
      }
    }
    process.exit(1);
  }
}

run();
