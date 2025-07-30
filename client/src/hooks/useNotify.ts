import { useState } from 'react';
import icon from '../assets/images/rn_static_01.png';

export const useNotify = () => {
  const [notification, setNotification] = useState<Notification>();
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification.permission,
  );

  const checkPermission = () => {
    const currentPermissions = Notification.permission;
    setPermission(currentPermissions);

    return currentPermissions;
  };
  const requestPermission = async () => {
    const currentPermissions = await Notification.requestPermission();
    setPermission(currentPermissions);

    return currentPermissions;
  };
  const createNotification = (time: string, name: string) => {
    if (permission !== 'granted')
      throw new Error('Notification permission not granted');

    const title = name + '@' + time;
    const body = 'A reminder to take your medicine';

    const newNotification = new Notification(title, { body, icon });
    newNotification.onclick = () => window.parent.focus();

    setNotification(newNotification);
  };

  return {
    notification,
    permission,
    checkPermission,
    requestPermission,
    createNotification,
  };
};
