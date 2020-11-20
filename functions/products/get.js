import response from '../../libs/response-lib';
import dynamoDb from '../../libs/dynamoDB-lib';

export const main = response(async (event, context) => {
  const productId = event.params.productId;

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