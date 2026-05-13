const st = require('supertokens-node');
const Dashboard = require('supertokens-node/recipe/dashboard');
const express = require('express');
const app = express();

st.init({
  supertokens: { connectionURI: process.env.ST_URI, apiKey: process.env.ST_KEY },
  recipeList: [Dashboard.init()],
  appInfo: {
    appName: 'Upshft',
    apiDomain: process.env.API_DOMAIN,
    websiteDomain: process.env.WEBSITE_DOMAIN,
    apiBasePath: '/auth',
    websiteBasePath: '/auth'
  }
});

app.use(st.middleware());
app.use(st.errorHandler());
const port = parseInt(process.env.PORT) || 3568;
app.listen(port, () => console.log(`Dashboard on ${port}`));
