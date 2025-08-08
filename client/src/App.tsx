import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Providers } from 'context';
import Auth from 'utils/auth';
import {
  DesktopNavbar,
  Header,
  MobileNavbar,
  NotificationToggle,
} from 'components';
import { Home, Medicine, Medicines, NotFound, Notify } from 'pages';
import { useNotify } from 'hooks/useNotify';

function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());
  const { permission, checkPermission } = useNotify();

  return (
    <Providers>
      <Header />
      <DesktopNavbar access={{ loggedIn, setLoggedIn }} />
      <Container as={'main'}>
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
    </Providers>
  );
}

export default App;
