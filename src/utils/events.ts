/* eslint-disable import/prefer-default-export */

import FormControl from '../components/FormControl';

export const validateFormControls = (event: Event, formControls: FormControl) => {
  event.preventDefault();

  let validationErrorsCounter = 0;
  const formData: Record<string, string> = {};
  Object.entries(formControls)
    .filter(([key]) => key.startsWith('formControl'))
    .forEach(([,formControl]: FormControl[]) => {
      validationErrorsCounter += (formControl.validate() ? 0 : 1);
      formData[formControl.name] = formControl.getValue();
    }, false);
  // eslint-disable-next-line no-console
  if (validationErrorsCounter === 0) console.log(formData);
};
