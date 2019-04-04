import {createValidator, required, maxLength, mustChooseAnItem} from 'utils/validation';

const widgetValidation = createValidator({
  description: [required, maxLength(255)]
});
export default widgetValidation;
