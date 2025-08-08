import { useMutation } from '@apollo/client';
import { TOGGLE_CHECKED } from 'utils/mutations';
import { toggledQueueCheckedCache } from 'utils/handleCache';
import { MedicineType, QueueItemType } from 'types';

type MutationType = { checkQueue: MedicineType };
interface DailyMedicationProps {
  queueItem: QueueItemType;
  medicine: MedicineType;
}
export const DailyMedication = ({
  queueItem,
  medicine,
}: DailyMedicationProps) => {
  const [toggleChecked] = useMutation<MutationType>(
    TOGGLE_CHECKED,
    toggledQueueCheckedCache,
  );

  const handleCheck = async () => {
    const medicineId = medicine._id;
    await toggleChecked({ variables: { medicineId, queueId: queueItem._id } });
  };

  return (
    <section className="row">
      <article className="card-body px-4 pt-1 col-7 ">
        <h3 className="dailyHeader">{medicine.name}</h3>
        <hr />
        <p className="dailystext">
          Take {medicine.dosage} dosage at {queueItem.time}.
        </p>
        <p className="dailyRemain">
          You have {medicine.amount} remaining dosages.
        </p>
      </article>
      <aside className="col">
        <div className="form-check">
          <input
            onChange={handleCheck}
            checked={queueItem.checked}
            disabled={queueItem.checked}
            className="form-check-input dailyCheck"
            type="checkbox"
          />
        </div>
      </aside>
    </section>
  );
};

export default DailyMedication;
