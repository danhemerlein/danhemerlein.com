import { useState, useEffect } from 'react'

const useScreenWidth = (breakpoint) => {
  const [isScreenBelowBreakpoint, setIsScreenBelowBreakpoint] = useState(
    window.innerWidth <= breakpoint
  )

  useEffect(() => {
    const handleResize = () => {
      setIsScreenBelowBreakpoint(window.innerWidth <= breakpoint)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [breakpoint])

  return isScreenBelowBreakpoint
}

export default useScreenWidth
