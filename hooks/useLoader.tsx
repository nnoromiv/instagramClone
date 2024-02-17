import { useState } from 'react'

const useLoader = () => {
    const [load, setLoad] = useState(false)

    const handleLoader = () => {
        setLoad(!load)
    }

  return {load, setLoad, handleLoader}
}

export default useLoader