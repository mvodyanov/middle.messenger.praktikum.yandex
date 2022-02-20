import FormControl from '../components/FormControl';
import { Children } from '../types/types';

export const validateFormControls = (children: Children) => {
  let validationErrorsCounter = 0;
  const formData: Record<string, string> = {};
  Object.entries(children)
    .filter(([key]) => key.startsWith('formControl'))
    .forEach(([,formControl]: FormControl[]) => {
      validationErrorsCounter += (formControl.validate() ? 0 : 1);
      formData[formControl.name] = formControl.getValue();
    }, false);

  if (validationErrorsCounter !== 0) {
    throw new Error('Validation error');
  }

  return formData;
};
