import * as React from "react";
import './Button.css';
export default function Button({onClickFunction, text}) {
  return (
    <div style ={{display: 'flex', alignItems: 'top', justifyContent: "right"}}>
      <button className="Button" onClick={onClickFunction}>{text}</button>
    </div>
  )
}