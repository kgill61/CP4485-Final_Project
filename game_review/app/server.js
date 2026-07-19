//We might not need this file anymore but keeping it just in case

// //Backend file to work with the Frontend
// require('dotenv').config({ path: '.env.local' });

// const express = require('express');
// const cors = require('cors');
// const cookieSession = require('cookie-session');
// const authRoutes = require('./authentication/route.js');

// const app = express();

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
// }));

// app.use(cookieSession({
//     name: 'session',
//     keys: [process.env.SESSION_KEY],
//     maxAge: 24 * 60 * 60 * 1000,
// }));

// app.use(express.json());

// app.use('/auth', authRoutes);

// app.listen(4000, () => {
//     console.log('Backend running on http://localhost:4000');
// });

// console.log("CLIENT ID:", process.env.GOOGLE_CLIENT_ID);
// console.log("CLIENT SECRET:", process.env.GOOGLE_CLIENT_SECRET);
// console.log("REDIRECT URI:", process.env.GOOGLE_REDIRECT_URI);
