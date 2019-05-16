# CSBPort - Serverless backend

## Development
### Preparations
Run the following in a terminal from the directory this file resides in
```bash
yarn
```
Create a file named .env in this directory with the following content (altered for your usage of course)
```
PORTREQUESTS_TABLE_NAME=portRequests # name of the table in dynamodb
AWS_CONFIG='{"region": "eu-west-2"}' # aws config as json string
PRIVATE_KEY=privkey # base64 encoded private RSA1024 key
PUBLIC_KEY=pubkey # base64 encoded public RSA1024 key
```
