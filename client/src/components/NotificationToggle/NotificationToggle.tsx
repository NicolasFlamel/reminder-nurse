import './styles.css';
import { Alert, Button, ButtonProps } from 'react-bootstrap';
import { useNotify } from 'hooks/useNotify';

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
  return (
    <Button className="notification-btn" variant="secondary" {...props}>
      Request Notifications
    </Button>
  );
};
