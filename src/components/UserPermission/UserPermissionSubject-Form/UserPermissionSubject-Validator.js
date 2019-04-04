import {createValidator, required, maxLength, mustChooseAnItem} from 'utils/validation';

const widgetValidation = createValidator({
  description: [required, maxLength(255)],
  // platformId: [required, mustChooseAnItem],
  // tags: [required, mustChooseAnItem]
});
export default widgetValidation;
