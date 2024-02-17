import { DocumentData } from 'firebase/firestore'
import React, { useState } from 'react'

const useSinglePostInformation = () => {
    const [postInfo, setPostInfo] = useState<DocumentData>()

  return {
    postInfo, setPostInfo
  }
}

export default useSinglePostInformation