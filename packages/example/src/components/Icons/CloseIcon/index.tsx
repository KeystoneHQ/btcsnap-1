import React from "react";
import "./index.css"

const CloseIcon = ({onClick}: {onClick: () => void}) => {
  return (
    <div className="Close-container" onClick={onClick}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L13 13M13 1L1 13" stroke="#111214" stroke-width="1.5"/>
      </svg>
    </div>
  )
}

export default CloseIcon
