import * as React from "react";
import InputText from "../InputText/InputText";
import {useCallback, useEffect, useState} from "react";
import "./VocabularyForm.css";
import OutputText from "../OutputText/OutputText";
import Button from "../Button/Button";
import Label from "../Label/Label";
export default function VocabularyForm({url}) {
  const [inputTextValue, setInputTextValue] = useState('computer')
  const [outputTextValue, setOutputTextValue] = useState('output value')
  const [loading, setLoading] = useState(false)

  const textInputName = 'textInput';
  const textResultsName = 'textResultsName';
  const submitButtonText = 'Submit'

  function inputTextChange(event) {
    setInputTextValue(event.target.value);
  }

  function prepareOutputText(textObject) {
    let textRows = "";

    for (let key in textObject) {
      if (textObject.hasOwnProperty(key)) {
        textRows += key + ": " + textObject[key] + " <br/> ";
      }
    }
    return textRows;
  }

  async function send() {
    setLoading(true)

    try {
      const response = await fetch(url, {
        method: 'POST',
        keepalive: true,
        mode: "same-origin",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({data: inputTextValue})
      })

      const data = await response.json()
      setOutputTextValue(prepareOutputText(data))
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const getOutputText = useCallback(async () => {
    setLoading(true)

    try {
      const response = await fetch(url, {
        method: 'POST',
        keepalive: true,
        mode: "same-origin",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({data: inputTextValue})
      })

      const data = await response.json()
      setOutputTextValue(prepareOutputText(data))
      setLoading(false)
    } catch (e) {
      console.log(e)
    }

  }, [])

  useEffect(() => {
    getOutputText()
  }, [getOutputText])

  return (
    <div className='VocabularyForm'>
      <form style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Label
          text={'Input Text'}
          htmlFor={textInputName}
        ></Label>

        <InputText
          id = {textInputName}
          value = {inputTextValue}
          onChange = {inputTextChange}
        >
        </InputText>

        <Label
          text={'Results'}
          htmlFor={textResultsName}
        ></Label>

        <OutputText
          id = {textResultsName}
          value = {loading ? 'Loading...' : outputTextValue}
        >
        </OutputText>

        <Button
          onClickFunction = {(event) => {
            event.preventDefault();
            send()
          }}
          text = {submitButtonText}
        >
        </Button>
      </form>
    </div>
  )
}