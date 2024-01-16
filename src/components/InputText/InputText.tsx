import * as React from "react";
import './InputText.css';

export default function InputText({id, value, onChange}) {
  return (
    <input
      type="text"
      placeholder={'Type something...'}
      id={id}
      className="InputTextCss"
      value={value}
      onChange={onChange}
    />
  )
}