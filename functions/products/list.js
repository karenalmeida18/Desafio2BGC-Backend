import response from '../../libs/response-lib';
import dynamoDb from '../../libs/dynamoDB-lib';

export const main = response(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
  };

  const res = await dynamoDb.scan(params);

  // Return the matching list of items in response body
  return res.Items;
});