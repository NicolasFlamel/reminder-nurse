import Notifications from 'utils/Notifications';
import { Button, Container } from 'react-bootstrap';

export const Notify = () => {
  const testNotification = () => {
    if (Notifications.permission !== 'granted')
      Notifications.requestPermission();

    Notifications.createNotification('time', 'name');
  };

  return (
    <Container>
      <h2>Test if notifications work here</h2>
      <Button onClick={testNotification}>Click me</Button>
    </Container>
  );
};
