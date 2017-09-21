const { exec } = require("child_process");
log(`inside exec`);
exec("npm run test", (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  log(`stdout: ${stdout}`);
  log(`stderr: ${stderr}`);
});
