import { s3Client } from "./s3/s3Client.js.js";
import { ListObjectsCommand } from "@aws-sdk/client-s3";

const params = {
    Bucket: "",
    Prefix: 'test'
};

const run = async () => {
  try {
    try {
        const data = await s3Client.send(new ListObjectsCommand(params));
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
