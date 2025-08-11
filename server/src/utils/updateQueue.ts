import { Medicine } from '../models';
import { MedicineType, QueueType } from '../types/schemaTypes';

interface MedicineTypeDoc extends MedicineType {
  fillQueue: () => Promise<boolean>;
}
type UpdateQueueTypeArg = MedicineTypeDoc[];
// updates the queue object on all medicine
// TODO: fix typing for arg
const updateQueue = async (userMedicines: UpdateQueueTypeArg) => {
  // new object to be returned with all medicines
  const updatedMedicines: MedicineType[] = [];

  await Promise.all(
    userMedicines.map(async (medicine) => {
      const times = medicine.times;
      const queues = medicine.queue;
      // returns true/false if the particular medicine's queue has to be refilled depending on how often they take it
      const fillQueue = await medicine.fillQueue();
      // if a single medicine has to be refilled then run this else just push onto updatedMedicine obj
      if (fillQueue && times && queues) {
        // concat medicine queue with medicines returned from filter which checks for times not on the queue already
        const arr: QueueType[] = queues.filter((queueItem) => {
          for (let i = 0; i < queues.length; i++) {
            if (queueItem.time === queues[i]?.time) return false;
          }
          return true;
        });
        const newQueue = queues.concat(arr || []);

        // updates the document on Medicine model then when its returned it gets pushed into the updatedMedicines array
        const updatedMedicine = await Medicine.findOneAndUpdate(
          { _id: medicine._id },
          {
            queue: [...newQueue],
            queueLastFilled: new Date().setHours(0, 0, 0, 0),
          },
          { new: true },
        );
        if (updatedMedicine) updatedMedicines.push(updatedMedicine);
      } else updatedMedicines.push(medicine);
    }),
  );

  return updatedMedicines;
};

export { updateQueue };
