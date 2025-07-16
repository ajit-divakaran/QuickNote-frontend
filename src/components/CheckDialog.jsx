import { AnimatePresence, motion } from 'framer-motion';

const CheckDialog = ({ isDeleteOpen, onDeleteClose, onDelete }) => {
  return (
    <div className='dark:text-black'>
       <AnimatePresence>
        {isDeleteOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-sm mx-4 shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <h2 className="text-lg font-semibold mb-4 text-center">Are you sure you want to delete this note?</h2>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={onDeleteClose}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={onDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CheckDialog