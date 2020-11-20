import response from '../../libs/response-lib';
import dynamoDb from '../../libs/dynamoDB-lib';

export const main = response(async (event, context) => {
  const productId = event.params.productId;

  const params = {
    TableName: process.env.tableName,
    Key: {
      productId
    },
  };

  await dynamoDb.delete(params);

  return { success: true };
});