import React from 'react'

const Title = ({title, fontSize, margin}) => {
  return (
    <h1 style={{fontSize, margin, color:'#66161'}}>{title}</h1>
  )
}

export default Title