import {createValidator, required, maxLength, mustChooseAnItem} from 'utils/validation';

const clipValidation = createValidator({
  description: [required, maxLength(255)]
  // tags: [required, mustChooseAnItem]
});
export default clipValidation;
