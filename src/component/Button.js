import React from 'react'

const Button = ({color, text}) => {

    return (
        <button  
            style={{backgroundColor: color}}
            className = 'button'
        >
            {text}
        </button>
    )
}

Button.defaultProps = {
    color: '#C8A2C8',
  }

export default Button
