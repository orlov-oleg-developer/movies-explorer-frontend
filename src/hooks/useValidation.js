import {useEffect, useState} from 'react'

const useValidation = (inputValue, validations) => {
  const [ minLengthError, setMinLengthError ] = useState({ state: false, errorMessage: ""});
  const [ maxLengthError, setMaxLengthError ] = useState({ state: false, errorMessage: ""});
  const [ isEmpty, setIsEmpty ] = useState({ state: true, errorMessage: "Поле не может быть пустым"});
  const [ isEmailError, setIsEmailError ] = useState({ state: false, errorMessage: "Неверно указан email"});
  const [ isNameError, setIsNameError ] = useState({ state: false, errorMessage: "Поле должно содержать только латиницу, кириллицу, пробел или дефис"})
  const [ isInputValid, setIsInputValid ] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          inputValue.length < validations[validation] ? setMinLengthError({errorMessage: `В поле не может быть меньше ${validations[validation]} символов`, state: true})
            : setMinLengthError({...minLengthError, state: false});
          break;

        case 'maxLength':
          inputValue.length >= validations[validation] ? setMaxLengthError({errorMessage: `В поле не может быть больше ${validations[validation]} символов`, state: true})
            : setMaxLengthError({...maxLengthError, state: false});
          break;

        case 'isEmpty':
          inputValue ? setIsEmpty({...isEmpty, state: false}) : setIsEmpty({...isEmpty, state: true});
          break;

        case 'isEmail':
          const mailRegex = new RegExp('.+@.+\\..+');
          mailRegex.test(String(inputValue).toLowerCase()) ? setIsEmailError({...isEmailError, state: false})
            : setIsEmailError({...isEmailError, state: true});
          break;

        case 'isName':
          const nameRegex = /[\wа-я\sё]/gi;
          nameRegex.test(String(inputValue).toLowerCase()) ? setIsNameError({...isNameError, state: false})
            : setIsNameError({...isNameError, state: true});
          break;
      }
    }
  }, [inputValue])

  useEffect(() => {
    if (minLengthError.state || maxLengthError.state || isEmpty.state || isEmailError.state || isNameError.state) {
      setIsInputValid(false)
    }
    else setIsInputValid(true)
  }, [minLengthError, maxLengthError, isEmpty, isEmailError, isNameError])

  return {
    minLengthError,
    maxLengthError,
    isEmpty,
    isEmailError,
    isNameError,
    isInputValid,
  }
}

export default useValidation;
