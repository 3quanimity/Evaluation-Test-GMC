const express = require('express');
const graphqlHTTP = require('express-graphql');
// using cors to allow cross communication between 2 different servers
const cors = require('cors');
const schema = require('./schema');

// initializing the app using express
const app = express();

//allowing cross-origin communication
app.use(cors());

// setting a unique endpoint using graphql
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
