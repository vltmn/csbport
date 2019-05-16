const path = require("path");
require("dotenv").config({
  path: path.resolve(process.cwd(), ".env"),
  debug: true
});

const getTableConfig = () => {
  const readYaml = require('read-yaml');
  const sls = readYaml.sync('serverless.yml');
  const tableName = require('./src/config').PORTREQUESTS_TABLE_NAME;
  const tableProps = sls.resources.Resources.PortRequestDynamoTable.Properties
  tableProps.TableName = tableName;
  return tableProps;
}
const initTables = async ()  => {
  const AWS = require('aws-sdk');
  AWS.config.update(require('./src/config').AWS_CONFIG);
  const tableConfig = getTableConfig();
  const dynamoDb = new AWS.DynamoDB();
  const listTablesRet = await dynamoDb.listTables().promise();
  const tableNames = listTablesRet.TableNames;
  if(tableNames.filter(tn => tn == tableConfig.TableName).length > 0) {
    //table exists, return
    return;
  }
  //table does not exist, create
  await dynamoDb.createTable(tableConfig).promise();
}
const startLocalServer = () => {
  const app = require("./src/server");
  const port = 3000;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    // console.log(process.env)
  });
};
initTables().then(() => {
  startLocalServer()
});