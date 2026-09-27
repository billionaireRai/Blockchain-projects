import React from 'react'


export default function ViewClickPop({ children } : { children:React.ReactNode }) {
  
  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex items-center justify-center z-50 animate-in fade-in-0 zoom-in-95 duration-200">
      {/* Modal */}
      <div className="relative flex items-center justify-center h-full">
        {children}
      </div>
    </div>
  )
}
