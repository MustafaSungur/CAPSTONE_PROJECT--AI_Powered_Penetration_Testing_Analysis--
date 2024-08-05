import {exec} from "child_process";

export async function runNmap(cmd)
{
  console.log(cmd);

  const timeout = 10 * 60 * 1000;

  let outputChanged = false;

  let output;
  await new Promise((resolve) => {
    exec('nmap ' + cmd, (error, stdout, stderr) =>
    {
      output = stdout;
      outputChanged = true;
    });
    resolve(true);
  });

  const endTime = Date.now() + timeout;
  while (!outputChanged) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Check every second
  }

  return await output;
}

export async function runTheHarvester(cmd)
{
  console.log(cmd);

  const timeout = 10 * 60 * 1000;

  let outputChanged = false;

  let output;
  await new Promise((resolve) => {
    exec('/home/linuxbrew/.linuxbrew/bin/theHarvester ' + cmd, (error, stdout, stderr) =>
    {
      console.log(error);
      console.log(stderr);
      output = stdout;
      outputChanged = true;
    });
    resolve(true);
  });

  const endTime = Date.now() + timeout;
  while (!outputChanged) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Check every second
  }

  return await output;
}

export async function runNuclei(cmd)
{
  console.log(cmd);

  const timeout = 10 * 60 * 1000;

  let outputChanged = false;

  let output;
  await new Promise((resolve) => {
    exec('/home/linuxbrew/.linuxbrew/bin/nuclei ' + cmd, (error, stdout, stderr) =>
    {
      console.log(error);
      console.log(stderr);
      output = stdout;
      outputChanged = true;
    });
    resolve(true);
  });

  const endTime = Date.now() + timeout;
  while (!outputChanged) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Check every second
  }

  return await output;
}
