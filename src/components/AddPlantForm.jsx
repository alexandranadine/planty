import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddPlantForm({ onAdd }) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState(7);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlant = {
      id: uuidv4(),
      name,
      wateringFrequency: Number(frequency),
      lastWatered: new Date().toISOString().slice(0, 10),
    };
    onAdd(newPlant);
    setName("");
    setFrequency(7);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-4">
      <h2 className="text-lg font-semibold mb-2">Add a Plant</h2>
      <div className="flex flex-col gap-2">
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          type="number"
          min="1"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          required
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add Plant
        </button>
      </div>
    </form>
  );
}
