import { useQuery } from '@apollo/client';
import { QUERY_MEDICINES } from 'utils/queries';
import { MedicinesQueryType } from 'types';
import { ErrorPage } from 'pages/Error';
import { DailyMedication, Loading } from 'components';

// TODO: add logic for checkboxes / boolean
export const DailySummary = () => {
  // change query to all for caching purposes, handle isActive logic on this end
  const { loading, data, error } =
    useQuery<MedicinesQueryType>(QUERY_MEDICINES);

  if (loading) return <Loading />;
  else if (error || !data?.medicines) {
    console.error(error);
    return <ErrorPage error={error} />;
  }

  const activeMedicines = data.medicines.filter(
    (medicine) => medicine.isActive,
  );

  // sorts the queue array by time
  const withSortedQueue = activeMedicines.map((currentMed) => {
    const queue = [...currentMed.queue];
    queue.sort((a, b) => {
      const timeA = parseInt(a.time.replace(':', ''));
      const timeB = parseInt(b.time.replace(':', ''));
      return timeA - timeB;
    });
    return { ...currentMed, queue };
  });

  return (
    <ul className="d-flex flex-wrap justify-content-around dCardMob">
      {withSortedQueue.length ? (
        withSortedQueue.map((medicine) =>
          medicine.queue.map((item) => (
            <li
              key={item._id}
              className="card shadow m-2 p-3 mb-4 bg-white rounded dailyCard"
            >
              <DailyMedication medicine={medicine} queueItem={item} />
            </li>
          )),
        )
      ) : (
        <h2>You do not have any medication for today. </h2>
      )}
    </ul>
  );
};
