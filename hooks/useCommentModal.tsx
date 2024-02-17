import React, { useState } from 'react'


const useCommentModal = () => {
    const [isModal, setIsModal] = useState<boolean>(false)

    const handleModal = () => {
        setIsModal(!isModal)
    }
  return {
    isModal,
    handleModal,
    setIsModal
  }
}

export default useCommentModal