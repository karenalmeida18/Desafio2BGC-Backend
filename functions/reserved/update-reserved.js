import mail from '../../libs/mail-lib';
import dynamoDb from '../../libs/dynamoDB-lib';

export const main = mail(async (event, context) => {
  const reservedBy = event.requestContext.identity.cognitoIdentityId;
  const productId = event.pathParameters.id;
  const { email } = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Key: { productId },
    UpdateExpression: 'set reservedBy = :userId', //defines the attributes to be updated
    ExpressionAttributeValues:
      { ':userId': reservedBy },//defines the value in the update expression
  };

  await dynamoDb.update(params);

  return email;
});