import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import Modal from "./Modal";

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
          className="bg-forest text-white px-4 py-2 rounded"
          type="submit"
        >
          Add
        </button>
      </form>
      <ul className="list-disc list-inside">
        {list.map((item) => (
          <li key={item.id} className="flex justify-between items-center py-1">
            <span>{item.name}</span>
            <div className="flex gap-2">
              <button
                className="bg-moss text-white px-2 py-1 rounded"
                onClick={() => startEditing(item)}
              >
                <PencilIcon className="w-5 h-5" />
              </button>
              <button
                className="bg-rose text-white px-2 py-1 rounded"
                onClick={() => onRemove(item.id)}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for Editing */}
      <Modal isOpen={!!editingId} onClose={() => setEditingId(null)}>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Edit Wishlist Item</h3>
          <input
            className="border p-2 rounded flex-1"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder="Edit plant name"
          />
          <div className="flex gap-2 mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() =>
                saveEdit(list.find((item) => item.id === editingId))
              }
            >
              Save
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => setEditingId(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
