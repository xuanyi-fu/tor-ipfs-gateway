import { Command } from "commander";
import ProgressBar from "progress";
import bytes from "bytes";
import { torIPFSGetWithCID } from "./torGateway";
import fs from "fs";

const program = new Command();

program
  .option("-p, --port <port>", "Tor SOCKS5 Port", "9050")
  .requiredOption("-c, --cid <cid>", "CID to download")
  .requiredOption("-f, --file <file>", "Output file");

program.parse(process.argv);
const options = program.opts();

const download = async (cid: string, file: string) => {
  const response = await torIPFSGetWithCID(cid);
  const totalLength = response.headers["content-length"];
  console.log(`Starting Downloading\nCID: ${cid}`);
  const progressBar = new ProgressBar("[:bar] :percent :speed", {
    width: 30,
    complete: "=",
    incomplete: " ",
    renderThrottle: 100,
    total: parseInt(totalLength),
  });

  let receivedLength = 0;
  let prevTime = process.hrtime.bigint();

  response.data.on("data", (chunk) => {
    receivedLength = receivedLength + chunk.length;
    const curTime = process.hrtime.bigint();
    const timeDiff = Math.max(1, Number(curTime - prevTime));
    prevTime = curTime;
    let speedStr = "N/A";
    if (timeDiff >= 1) {
      const sTimeDiff = timeDiff / 1000 / 1000;
      const speed = receivedLength / sTimeDiff;
      speedStr = `${bytes(speed)}/s`;
    }
    progressBar.tick(chunk.length, {
      speed: speedStr,
    });
  });

  const writer = fs.createWriteStream(file);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

download(options.cid, options.file)
  .then(() => {
    console.log("Download finished\n");
  })
  .catch((err) => {
    console.error("Error while downloading:", err);
  });
