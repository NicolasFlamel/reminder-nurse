import icon from '../assets/images/rn_static_01.png';

// TODO: actions option for service workers
class Notifications {
  notification: Notification | undefined;
  permission: NotificationPermission;

  constructor(permission?: NotificationPermission) {
    this.notification = undefined;
    this.permission = permission || 'default';
  }
  checkPermission() {
    this.permission = Notification.permission;
    return this.permission;
  }
  async requestPermission() {
    this.permission = await Notification.requestPermission();
  }
  createNotification(time: string, name: string) {
    const title = name + '@' + time;
    const body = 'A reminder to take your medicine';

    this.notification = new Notification(title, { body, icon });
    this.notification.onclick = () => window.parent.focus();
  }
}

const notify = new Notifications();

export default notify;
