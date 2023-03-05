import { useState } from 'react'
import useValidation from "./useValidation.js";

const useInput = (initialValue, validations) => {
  const [ value, setValue ] = useState(initialValue);
  const [ isDirty, setIsDirty ] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onBlur = () => {
    setIsDirty(true)
  }

  return {
    value,
    isDirty,
    onChange,
    onBlur,
    ...valid,
  }
}

export default useInput;
