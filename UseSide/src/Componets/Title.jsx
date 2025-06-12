import React from 'react'
import { Helmet } from 'react-helmet'

function Title({title}) {
  return (
        <Helmet>
            {title}
        </Helmet>
  )
}

export default Title
