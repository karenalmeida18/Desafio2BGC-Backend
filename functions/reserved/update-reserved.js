import response from '../../libs/response-lib';
import dynamoDb from '../../libs/dynamoDB-lib';

export const main = response(async (event, context) => {
  const reservedBy = event.params.reservedBy;
  const productId = event.params.productId;

  const params = {
    TableName: process.env.tableName,
    Key: { userId: '123', productId },
    UpdateExpression: 'set reservedBy = :userId', //defines the attributes to be updated
    ExpressionAttributeValues:
      { ':userId': reservedBy || null },//defines the value in the update expression
  };

  await dynamoDb.update(params);

  return { success: true };
});