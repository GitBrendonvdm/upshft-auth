const SuperTokens = require("supertokens-node");
const Dashboard = require("supertokens-node/recipe/dashboard");
const express = require("express");

const app = express();

SuperTokens.init({
  supertokens: {
    connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
    apiKey: process.env.SUPERTOKENS_API_KEY,
  },
  recipeList: [Dashboard.init()],
  appInfo: {
    appName: "Upshft Auth Dashboard",
    apiDomain: process.env.API_DOMAIN || "http://localhost:3000",
    websiteDomain: process.env.WEBSITE_DOMAIN || "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
});

app.use(SuperTokens.middleware());
app.use(SuperTokens.errorHandler());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Dashboard running on port ${port}`);
  console.log(`Access at http://localhost:${port}/auth/dashboard`);
});
