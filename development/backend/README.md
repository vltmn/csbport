# CSBPort - Serverless backend

## Development
### Preparations
Run the following in a terminal from the directory this file resides in
```bash
yarn
```
Create a file named *.local.env* in this directory with the following content (altered for your usage of course)
```
PORTREQUESTS_TABLE_NAME=portRequests # name of the table in dynamodb
AWS_CONFIG='{"region": "eu-west-2"}' # aws config as json string
AWS_ACCESS_KEY_ID=key # aws access key id
AWS_SECRET_ACCESS_KEY=secret # aws secret access key
PRIVATE_KEY=privkey # base64 encoded private RSA1024 key
PUBLIC_KEY=pubkey # base64 encoded public RSA1024 key
```
