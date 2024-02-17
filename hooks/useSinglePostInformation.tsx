import { DocumentData } from 'firebase/firestore'
import { useState } from 'react'

const useSinglePostInformation = () => {
    const [postInfo, setPostInfo] = useState<DocumentData>()

  return {
    postInfo, setPostInfo
  }
}

export default useSinglePostInformation