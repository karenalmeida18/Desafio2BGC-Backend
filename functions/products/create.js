import * as uuid from "uuid";
import response from '../../libs/response-lib';
import dynamoDb from '../../libs/dynamoDB-lib';

export const main = response(async (event, context) => {
  const { title, price, image } = JSON.parse(event.body);

  const productId = uuid.v1();
  const reservedBy = null;

  const params = {
    TableName: process.env.tableName,
    Item: {
      // The attributes of the item to be created
      productId,
      reservedBy,
      title,
      price,
      image,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});