import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PageTitle = (props) => (
  <h1 className="page-h1">
  <FontAwesomeIcon icon={props.titleProps()[1]} /> 
  {props.titleProps()[0]}
  </h1>
)

export default PageTitle