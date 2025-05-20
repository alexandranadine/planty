import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Wishlist({ list, onAdd, onRemove }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ id: uuidv4(), name });
    setName("");
  };

  return (
    <div className="bg-white shadow p-4 rounded">
      <h2 className="text-lg font-semibold mb-2">🌱 Plant Wishlist</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded flex-1"
          type="text"
          placeholder="Add plant to wishlist"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add
        </button>
      </form>
      <ul className="list-disc list-inside">
        {list.map((item) => (
          <li key={item.id} className="flex justify-between items-center py-1">
            {item.name}
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
