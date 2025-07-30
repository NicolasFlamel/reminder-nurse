import './styles.css';
import { SetState } from 'types';
import { Button, ButtonProps } from 'react-bootstrap';
import notify from 'utils/Notifications';

interface NotificationToggleProps {
  setIsNotifying: SetState<boolean>;
}
export const NotificationToggle = ({
  setIsNotifying,
}: NotificationToggleProps) => {
  const handleClick = async () => {
    const permission = await notify.requestPermission();
    setIsNotifying(permission === 'granted');
  };
  return (
    <section className="notification-toggle">
      <NotificationBtn onClick={handleClick} />
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
