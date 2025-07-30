import { useNotify } from 'hooks/useNotify';
import { Button, Container } from 'react-bootstrap';

export const Notify = () => {
  const { permission, requestPermission, createNotification } = useNotify();
  const testNotification = () => {
    if (permission !== 'granted') requestPermission();

    createNotification('time', 'name');
  };

  return (
    <Container>
      <h2>Test if notifications work here</h2>
      <Button onClick={testNotification}>Click me</Button>
    </Container>
  );
};
