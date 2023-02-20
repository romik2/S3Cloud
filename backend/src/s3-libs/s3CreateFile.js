import { s3Client } from "./s3/s3Client.js.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const params = {
    Bucket: "",
    Key: "tes1t/",
    Body: "Hello world!",
};

const run = async () => {
  try {
    const results = await s3Client.send(new PutObjectCommand(params));
    console.log(
        "Successfully created " +
        params.Key +
        " and uploaded it to " +
        params.Bucket +
        "/" +
        params.Key
    );
    return results; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};

run();
