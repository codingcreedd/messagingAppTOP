export default function PopUpMessage({status, message}) {
    const baseStyles = "fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center space-x-3 text-white"
    const successStyles = "bg-gradient-to-r from-emerald-500 to-emerald-700"
    const failureStyles = "bg-gradient-to-r from-rose-500 to-rose-700"
  
    return (
      <div className={`${baseStyles} ${status === 'success' ? successStyles : failureStyles}`}>
        <div className="flex-shrink-0">
          {status === 'success' ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          )}
        </div>
        <p className="font-medium">{message}</p>
      </div>
    )
  }