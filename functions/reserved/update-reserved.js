import response from '../../libs/response-lib';
import dynamoDb from '../../libs/dynamoDB-lib';

export const main = response(async (event, context) => {
  const reservedBy = event.requestContext.identity.cognitoIdentityId;
  const { productId } = JSON.parse(event.body);

  await Promise.all(productId.map(async id => {
    const params = {
      TableName: process.env.tableName,
      Key: { productId: id },
      UpdateExpression: 'set reservedBy = :userId', //defines the attributes to be updated
      ExpressionAttributeValues:
        { ':userId': reservedBy },//defines the value in the update expression
    };
    await dynamoDb.update(params);
  }));

  return { success: true };
});