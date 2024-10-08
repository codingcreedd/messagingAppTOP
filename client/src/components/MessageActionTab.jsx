export default function MessageActionTab({ onEdit, onDelete, cancel }){
  return (
    <div className="absolute bottom-0 -right-full z-10 transform flex space-x-1 bg-gradient-to-r from-[#1a2a3a] to-[#0f1923] p-1 rounded-r-lg shadow-lg">
      <button
        onClick={onEdit}
        className="px-2 py-1 text-xs font-medium text-white bg-gradient-to-r from-[#3a7bd5] to-[#00d2ff] rounded hover:from-[#00d2ff] hover:to-[#3a7bd5] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00d2ff] focus:ring-opacity-50"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="px-2 py-1 text-xs font-medium text-white bg-gradient-to-r from-[#d53a3a] to-[#ff0000] rounded hover:from-[#ff0000] hover:to-[#d53a3a] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:ring-opacity-50"
      >
        Delete
      </button>
      <button
        onClick={cancel}
        className="px-2 py-1 text-xs font-medium text-white bg-gradient-to-r from-[#5f5e5e] to-[#383636] rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:ring-opacity-50"
      >
        Cancel
      </button>

    </div>
  )
}