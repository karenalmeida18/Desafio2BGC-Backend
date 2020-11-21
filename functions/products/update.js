import response from '../../libs/response-lib';
import dynamoDb from '../../libs/dynamoDB-lib';

export const main = response(async (event, context) => {
  const { title, price, image } = JSON.parse(event.body);
  const productId = event.pathParameters.id;

  const params = {
    TableName: process.env.tableName,
    Key: { productId },
    UpdateExpression: 'set title = :title, price =:price, image =:image', //defines the attributes to be updated
    ExpressionAttributeValues:
      { ':title': title || null, ':price': price || null, ':image': image || null },//defines the value in the update expression
  };

  await dynamoDb.update(params);

  return { success: true };
});