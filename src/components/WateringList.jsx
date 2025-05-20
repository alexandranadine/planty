import { useState } from "react";

export default function WateringList({ plants, onWater, onEdit, onDelete }) {
  const today = new Date();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", wateringFrequency: 7 });

  const getNextWaterDate = (plant) => {
    const lastDate = new Date(plant.lastWatered);
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + plant.wateringFrequency);
    return nextDate;
  };

  const startEditing = (plant) => {
    setEditingId(plant.id);
    setEditData({
      name: plant.name,
      wateringFrequency: plant.wateringFrequency,
    });
  };

  const handleEditSave = (plant) => {
    onEdit({ ...plant, ...editData });
    setEditingId(null);
  };

  return (
    <div className="bg-white shadow p-4 rounded mb-4">
      <h2 className="text-lg font-semibold mb-2">Watering To-Do</h2>
      {plants.length === 0 ? (
        <p>No plants yet.</p>
      ) : (
        <ul className="list-disc list-inside">
          {plants.map((plant) => {
            const nextWaterDate = getNextWaterDate(plant);
            const needsWatering = nextWaterDate <= today;
            const isEditing = editingId === plant.id;

            return (
              <li key={plant.id} className="flex flex-col gap-2 py-2">
                {isEditing ? (
                  <div className="flex flex-col gap-1">
                    <input
                      className="border rounded p-1"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                    <input
                      className="border rounded p-1"
                      type="number"
                      value={editData.wateringFrequency}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          wateringFrequency: Number(e.target.value),
                        })
                      }
                    />
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleEditSave(plant)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    {/* Thumbnail to the left */}
                    {plant.image && (
                      <img
                        src={plant.image}
                        alt={`${plant.name} image`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <strong>{plant.name}</strong>{" "}
                          <span
                            className={
                              needsWatering ? "text-red-600" : "text-gray-500"
                            }
                          >
                            {needsWatering
                              ? "Needs watering!"
                              : `Next: ${nextWaterDate
                                  .toISOString()
                                  .slice(0, 10)}`}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {needsWatering && (
                            <button
                              className="bg-green-500 text-white px-2 py-1 rounded"
                              onClick={() => onWater(plant.id)}
                            >
                              Mark Watered
                            </button>
                          )}
                          <button
                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                            onClick={() => startEditing(plant)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() => onDelete(plant.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      {/* Notes below the plant name */}
                      {plant.notes && (
                        <p className="text-gray-700 italic">{plant.notes}</p>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
