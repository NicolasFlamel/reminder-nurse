import { useState } from 'react';
import icon from '../assets/images/rn_static_01.png';

export const useNotify = () => {
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

    newNotification(title, { body });
  };

  return {
    permission,
    checkPermission,
    requestPermission,
    createNotification,
  };
};

// create notification without using hook
export const newNotification = (
  title: string,
  options: NotificationOptions,
) => {
  const newNotification = new Notification(title, { ...options, icon });
  newNotification.onclick = () => window.parent.focus();
};
