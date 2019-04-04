import {createValidator, required, maxLength, mustChooseAnItem} from 'utils/validation';

const jobDescValidation = createValidator({
  title: [required, maxLength(255)],
  name: [required, maxLength(255)]
});
export default jobDescValidation;
