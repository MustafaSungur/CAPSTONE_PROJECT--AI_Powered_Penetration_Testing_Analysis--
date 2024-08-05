import Docker from "dockerode";

const docker = new Docker();

export async function runTool(imageName, cmd) {
  console.log(cmd);
  const containerOptions = {
    Image: imageName,
    Tty: true,
    Cmd: cmd,
    AttachStdout: true,
    AttachStderr: true,
  };

  try {
    // Create the container
    const container = await docker.createContainer(containerOptions);
    const timeout = 10 * 60 * 1000;

    // Start the container
    await container.start();

    // Initialize a flag to track if output has changed
    let outputChanged = false;

    // Attach to the container's output stream
    const stream = await container.logs({
      follow: true,
      stdout: true,
      stderr: true,
    });

    // Capture the initial output
    let output = "";
    await new Promise((resolve) => {
      stream.on("data", (chunk) => {
        output += chunk.toString();
        outputChanged = true; // Set flag to true upon receiving data
      });
      stream.on("end", resolve);
    });

    // Wait for the specified timeout or until output changes
    const endTime = Date.now() + timeout;
    while (Date.now() < endTime && !outputChanged) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Check every second
    }

    const containerInfo = await container.inspect();
    if (containerInfo.State.Running) {
      // Stop and remove the container
      await container.stop();
    }
    // await container.remove({ force: true });

    return output;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
