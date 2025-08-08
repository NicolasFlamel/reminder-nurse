import './styles.css';
import { AssistantAvatar, DailySummary } from 'components';

// Daily section of homepage
export const Daily = () => {
  return (
    <section>
      <h2 className="dmedHeader">Daily Medication</h2>
      <AssistantAvatar>Let's look at your medications today.</AssistantAvatar>
      <DailySummary />
    </section>
  );
};
