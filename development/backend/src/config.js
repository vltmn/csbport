const {PORTREQUESTS_TABLE_NAME, PUBLIC_KEY, PRIVATE_KEY} = process.env;
let AWS_CONFIG = {};
if(process.env.AWS_CONFIG) {
	AWS_CONFIG = JSON.parse(process.env.AWS_CONFIG);
}

module.exports = {
    PORTREQUESTS_TABLE_NAME,
    AWS_CONFIG,
    PRIVATE_KEY,
    PUBLIC_KEY
};
