// loader components for mini purposes...

export function MiniLoader ({ colorhex='#FF7A5C' }:{ colorhex?:string }) {
  return (    
   <div className="flex flex-row gap-1">
    <div style={{ backgroundColor: colorhex }} className={`w-2 h-2 rounded-full animate-bounce`}></div>
    <div style={{ backgroundColor: colorhex }} className={`w-2 h-2 rounded-full animate-bounce [animation-delay:-.3s]`}></div>
    <div style={{ backgroundColor: colorhex }} className={`w-2 h-2 rounded-full animate-bounce [animation-delay:-.5s]`}></div>
   </div>
 )}
