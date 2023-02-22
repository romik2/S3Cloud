import { s3Client } from "./s3-libs/s3Client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

const file = "src/index.js";
const fileStream = fs.createReadStream(file);

const params = {
    Bucket: "",
    Key: 'test.js',
    Body: fileStream,
};

const run = async () => {
  try {
    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log("Success", data);
        return data; // For unit tests.
      } catch (err) {
        console.log("Error", err);
      }    
  } catch (err) {
    console.log("Error", err);
  }
};

run();
