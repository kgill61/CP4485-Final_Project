const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const { getGoogleOauthUrl, oauthClient } = require('../googleOauthUtil');

router.get('/google', (req, res) => {
    const url = getGoogleOauthUrl();
    return res.redirect(url);
});

// Callback for Google Oauth
router.get('/google/callback', async (req, res) => {
    try {
        const code = req.query.code;

        const { tokens } = await oauthClient.getToken(code);
        oauthClient.setCredentials(tokens);

        const oauth2 = google.oauth2({ version: 'v2', auth: oauthClient });
        const { data: userInfo } = await oauth2.userinfo.get();

        req.session.user = {
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture,
        };

        return res.redirect('http://localhost:3000');
    } catch (error) {
        console.error('Google OAuth callback error:', error);
        return res.redirect('http://localhost:3000/login-error');
    }
});

router.get('/session', (req, res) => {
    return res.json(req.session.user || null);
});

router.get('/logout', (req, res) => {
    req.session = null;
    return res.redirect('http://localhost:3000');
});

module.exports = router;
