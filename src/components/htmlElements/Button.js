import React from 'react'

const Button = (props) => (
  <button 
    className={props.options.classname} 
    onClick={() => props.options.onclick(props.options.argument)} 
    type="button">
      {props.children}
  </button>
)

export default Button