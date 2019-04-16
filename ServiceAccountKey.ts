import * as dotenv from 'dotenv';

/** Load .env config **/
const result = dotenv.config();

if (result.error) {
    console.log(result.error);
}

const serviceAccountKey = {
    "type": process.env.SERVICE_ACCOUNT_KEY_TYPE,
    "project_id": process.env.SERVICE_ACCOUNT_KEY_PROJECT_ID,
    "private_key_id": process.env.SERVICE_ACCOUNT_KEY_PRIVATE_KEY_ID,
    "private_key": process.env.SERVICE_ACCOUNT_KEY_PRIVATE_KEY,
    "client_email": process.env.SERVICE_ACCOUNT_KEY_CLIENT_EMAIL,
    "client_id": process.env.SERVICE_ACCOUNT_KEY_CLIENT_ID,
    "auth_uri": process.env.SERVICE_ACCOUNT_KEY_AUTH_URI,
    "token_uri": process.env.SERVICE_ACCOUNT_KEY_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.SERVICE_ACCOUNT_KEY_PROVIDER_CERT_URL,
    "client_x509_cert_url": process.env.SERVICE_ACCOUNT_KEY_CLIENT_CERT_URL
};

export default serviceAccountKey;