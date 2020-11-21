import response from '../../libs/response-lib.js';
import dynamoDb from '../../libs/dynamoDB-lib.js';

export const main = response(async (event, context) => {
  const productId = event.pathParameters.id;

  const params = {
    TableName: process.env.tableName,
    Key: {
      productId,
    },
  };

  const res = await dynamoDb.get(params);
  if (!res.Item) throw new Error("Product not found");
  return res.Item;
});