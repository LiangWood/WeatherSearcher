import './App.css';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from '@apollo/client';

import Home from './Pages/Home';

function App() {
    const client = new ApolloClient({
        connectToDevTools: true,
        cache: new InMemoryCache(),
        uri: "https://graphql-weather-api.herokuapp.com/",
    });

  return (
      <ApolloProvider client={client}>
          <div className="App">
              <Home />
            </div>
    </ApolloProvider>
  );
}

export default App;
