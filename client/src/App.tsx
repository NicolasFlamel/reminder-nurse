import './App.css';
import { Suspense, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Providers } from 'context';
import Auth from 'utils/auth';
import {
  DesktopNavbar,
  Header,
  LoadingPage,
  MobileNavbar,
  NotificationToggle,
} from 'components';
import { Home, Medicine, Medicines, NotFound } from 'pages';
import { useNotify } from 'hooks/useNotify';
import { NotifyLazy } from 'pages/Notify';

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

          <Route
            path="notify"
            element={
              <Suspense fallback={<LoadingPage />}>
                <NotifyLazy />
              </Suspense>
            }
          />

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
