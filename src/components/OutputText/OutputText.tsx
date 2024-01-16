import * as React from "react";
import './OutputText.css';
export default function OutputText({id, value}) {
  return (
    <>
      <p id = {id} className={'OutputText'}>
        {value.split('<br/>').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
    </>
  )
}