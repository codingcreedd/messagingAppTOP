export default function Loader({ description }) {
  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-3 bg-gradient-to-r from-[#1a2a3a] to-[#0f1923] p-3 rounded-full shadow-lg">
      <div className="relative w-6 h-6">
        <div className="absolute inset-0 border-t-2 border-r-2 border-[#3a7bd5] rounded-full animate-spin"></div>
        <div className="absolute inset-1 border-t-2 border-r-2 border-[#00d2ff] rounded-full animate-spin-reverse"></div>
      </div>
      <p className="text-sm text-white font-medium pr-2">{description}</p>
    </div>
  )
}