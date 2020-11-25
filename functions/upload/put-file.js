import AWS from 'aws-sdk';

const S3 = new AWS.S3;

export async function main(event, context) {
  const randomID = parseInt(Math.random() * 10000000);
  const Key = `${randomID}.jpg`;
  // const Key = `compressed/${basename(key, extname(key))}.jpg`;

  try {
    const params = {
      Bucket: process.env.bucket,
      Key,
      Expires: 300,
      ContentType: 'image/jpeg'
    };

    const uploadURL = await S3.getSignedUrlPromise('putObject', params);

    return {
      statusCode: 200,
      body: JSON.stringify({ uploadURL: uploadURL, Key }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  }
}