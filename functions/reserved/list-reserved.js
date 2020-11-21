import response from '../../libs/response-lib';
import dynamoDb from '../../libs/dynamoDB-lib';

export const main = response(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'reservedBy = :userId': only return items with matching 'userId'
    //   partition key
    KeyConditionExpression: "reservedBy = :userId",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId,
    },
  };

  const res = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return res.Items;
});