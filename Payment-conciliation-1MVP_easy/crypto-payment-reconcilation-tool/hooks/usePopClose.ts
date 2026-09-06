
import { RefObject, useEffect } from 'react'

const usePopClose = (state: boolean , setter: (value: boolean) => void , ref: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    if (!state) return ;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target ;

      if (target instanceof Node && ref.current && !ref.current.contains(target))  setter(false) ;
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [state, setter, ref])
}

export default usePopClose