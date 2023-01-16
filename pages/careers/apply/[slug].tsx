import React from 'react'
import {useRouter} from 'next/router'
import SingleFileUploadForm from '../../../components/fileUploadForm'

function Apply() {
  const router = useRouter()
  const {job} = router.query
  return (
    <SingleFileUploadForm />
  )
}

export default Apply