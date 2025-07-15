import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Dialog = ({ isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [headerText, setHeaderText] = useState("Dialog Header");
  const [contentText, setContentText] = useState("This is the content of the dialog.");

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    onClose();
  };
  const handleSave = () =>{
    setIsEditing(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 w-96 max-w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {isEditing ? (
              <input
                type="text"
                className="text-xl font-bold w-full mb-4 border border-gray-300 p-2 rounded"
                value={headerText}
                onChange={(e) => setHeaderText(e.target.value)}
              />
            ) : (
              <h2 className="text-xl font-bold mb-4">{headerText}</h2>
            )}

            {isEditing ? (
              <textarea
                className="w-full h-24 border border-gray-300 p-2 rounded mb-4"
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
              />
            ) : (
              <p className="mb-4 text-gray-700">{contentText}</p>
            )}

            <div className="flex justify-end space-x-4">
              {!isEditing && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
              {
                isEditing &&    <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleSave}
                >
                  Save
                </button>
              }
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Dialog