import './App.css';
import { useState } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Auth from 'utils/auth';
import {
  DesktopNavbar,
  Header,
  MobileNavbar,
  NotificationToggle,
} from 'components';
import { Home, Medicine, Medicines, NotFound, Notify } from 'pages';
import { useNotify } from 'hooks/useNotify';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());
  const { permission, checkPermission } = useNotify();

  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <DesktopNavbar access={{ loggedIn, setLoggedIn }} />
        <Container>
          <Routes>
            <Route
              path="/"
              element={<Home access={{ loggedIn, setLoggedIn }} />}
            />
            <Route
              path="/medicines"
              element={loggedIn ? <Medicines /> : <Navigate to="/" />}
            />
            <Route
              path="/medicine/:medicineId"
              element={loggedIn ? <Medicine /> : <Navigate to="/" />}
            />
            <Route path="notify" element={<Notify />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        {permission !== 'granted' ? (
          <NotificationToggle checkPermission={checkPermission} />
        ) : null}
        <MobileNavbar access={{ loggedIn, setLoggedIn }} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
