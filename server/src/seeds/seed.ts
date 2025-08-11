import db from '../config/connection';
import { User, Medicine } from '../models';
import userSeeds from './userSeeds.json';
import medicineSeeds from './medicineSeeds.json';

db.once('open', async () => {
  try {
    await Medicine.deleteMany({});
    await User.deleteMany({});

    const userList = await User.create(userSeeds);

    await Promise.all(
      userList.map(async (user, i) => {
        const medicine = { ...medicineSeeds[i], userId: user._id };
        return Medicine.create(medicine);
      }),
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
