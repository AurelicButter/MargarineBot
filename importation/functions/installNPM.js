const { exec } = require("child_process");

module.exports = module => new Promise((resolve, reject) => {
  exec(`npm i ${module}`, (e, stdout, stderr) => {
    if (e) {
      console.log("=====NEW DEPENDANCY INSTALL FAILED HORRIBLY=====");
      reject(e);
    } else {
      console.log("=====INSTALLED NEW DEPENDANCY=====");
      console.log(stdout);
      console.error(stderr);
      resolve();
    }
  });
});
