import './styles.css';
import { useState } from 'react';
import { useNotify } from 'hooks/useNotify';
import { Alert, Button, ButtonProps } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';

interface NotificationToggleProps {
  checkPermission: () => void;
}
export const NotificationToggle = ({
  checkPermission,
}: NotificationToggleProps) => {
  const { permission, requestPermission } = useNotify();

  const handleClick = async () => {
    const permission = await requestPermission();
    if (permission === 'granted') checkPermission();
  };

  return (
    <section className="notification-toggle">
      {permission === 'denied' ? (
        <Alert variant="danger" dismissible>
          Notification permission was denied
        </Alert>
      ) : (
        <NotificationBtn onClick={handleClick} />
      )}
    </section>
  );
};

const NotificationBtn = (props: ButtonProps) => {
  const [show, setShow] = useState(true);
  const variant: Variant = 'warning';

  return (
    <Alert show={show} variant={variant}>
      <Alert.Heading>Notification System</Alert.Heading>
      <p>
        Website does not currently have access to your system's notifications
      </p>
      <hr />
      <section className="notification-actions">
        <Button className="notification-btn" variant={variant} {...props}>
          Request Notifications
        </Button>
        <Button variant={variant} onClick={() => setShow(false)}>
          Close
        </Button>
      </section>
    </Alert>
  );
};
