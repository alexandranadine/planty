export default function WateringList({ plants, onWater }) {
  const today = new Date();

  const getNextWaterDate = (plant) => {
    const lastDate = new Date(plant.lastWatered);
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + plant.wateringFrequency);
    return nextDate;
  };

  return (
    <div className="bg-white shadow p-4 rounded mb-4">
      <h2 className="text-lg font-semibold mb-2">Watering To-Do</h2>
      {plants.length === 0 ? (
        <p>You haven't added any plants yet. 🌱</p>
      ) : (
        <ul className="list-disc list-inside">
          {plants.map((plant) => {
            const nextWaterDate = getNextWaterDate(plant);
            const needsWatering = nextWaterDate <= today;
            return (
              <li
                key={plant.id}
                className="flex justify-between items-center py-1"
              >
                <div>
                  <strong>{plant.name}</strong>{" "}
                  <span
                    className={needsWatering ? "text-red-600" : "text-gray-500"}
                  >
                    {needsWatering
                      ? "Needs watering!"
                      : `Next: ${nextWaterDate.toISOString().slice(0, 10)}`}
                  </span>
                </div>
                {needsWatering && (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => onWater(plant.id)}
                  >
                    Mark Watered
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
