const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const grapQlSchema = require('./schema/index');
const graphQlResolvers = require('./resolvers/index');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use('/graphql', graphqlHttp({
  schema: grapQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
}));

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@clusterdiog-shard-00-00-gkgim.mongodb.net:27017,clusterdiog-shard-00-01-gkgim.mongodb.net:27017,clusterdiog-shard-00-02-gkgim.mongodb.net:27017/${
  process.env.MONGO_DB}?ssl=true&replicaSet=ClusterDiog-shard-0&authSource=admin&retryWrites=true&w=majority`
, {useNewUrlParser: true}).then(() => {
  app.listen(PORT, () => {
    console.log(`Check out the app at http://localhost:${PORT}`);
   })
})
.catch(err => {
  console.log(err)
});
