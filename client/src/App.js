import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// React Components
import Users from './components/Users';
import UserProfil from './components/UserProfil';
import Comments from './components/comments';

//creating the client
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <h1 className='bg-primary text-white text-center'>
          Consuming JASONPlaceholder using GraphQL & React
        </h1>
        <div className='container'>
          <Route exact path='/' component={Users} />
          <Route exact path='/users/:userId' component={UserProfil} />
          <Route exact path='/comments/:postId' component={Comments} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
