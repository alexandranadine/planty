import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/16/solid";

export default function Wishlist({ list, onAdd, onRemove, onEdit }) {
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ id: uuidv4(), name });
    setName("");
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditValue(item.name);
  };

  const saveEdit = (item) => {
    onEdit({ ...item, name: editValue });
    setEditingId(null);
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
            {editingId === item.id ? (
              <div className="flex gap-2 w-full">
                <input
                  className="border p-1 rounded flex-1"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => saveEdit(item)}
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
            ) : (
              <>
                <span>{item.name}</span>
                <div className="flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => startEditing(item)}
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => onRemove(item.id)}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
