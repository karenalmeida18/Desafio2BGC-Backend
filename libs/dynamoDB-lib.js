import DynamoDB from "aws-sdk/clients/dynamodb";

const client = new DynamoDB.DocumentClient();

export default {
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  scan: (params) => client.scan(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
};