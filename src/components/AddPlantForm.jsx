import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddPlantForm({ onAdd }) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState(7);
  const [image, setImage] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlant = {
      id: uuidv4(),
      name,
      wateringFrequency: Number(frequency),
      lastWatered: new Date().toISOString().slice(0, 10),
      image,
      notes,
    };
    onAdd(newPlant);
    setName("");
    setFrequency(7);
    setImage("");
    setNotes("");
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
          type="url"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <span>I want to water this plant every</span>
          <input
            className="border p-2 rounded w-16 text-center"
            type="number"
            min="1"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          />
          <span>days.</span>
        </div>
        <button
          className="self-start bg-green-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add Plant
        </button>
      </div>
    </form>
  );
}
