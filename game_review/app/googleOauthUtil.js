const { google } = require('googleapis');

const oauthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://c09qn72r-3000.use.devtunnels.ms/auth/google/callback',
);

//Im following the Linked in learning guide, this is the starter code for now