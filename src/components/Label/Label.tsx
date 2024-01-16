import * as React from "react";
import './Label.css';

export default function Label({htmlFor, text}) {
  return (
    <div className="LabelDiv">
      <label className="Label" htmlFor={htmlFor}>{text}</label>
    </div>
  )
}