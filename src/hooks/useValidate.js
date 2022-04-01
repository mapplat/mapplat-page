import { ref, watch, unref } from 'vue';
import parameter from '@/utils/parameter';

function getFields(fields) {
  if (fields) {
    return Array.isArray(fields) ? fields : Object.keys(fields);
  }
}
/**
 * 验证表单字段
 * @param {*} formChecker 验证规则
 * @param {*} formOptions 可选参数
 * @returns
 */
const useForm = (formChecker = {}, formOptions = {}) => {
  const validates = {};
  const resets = {};
  const clears = {};
  const checker = unref(formChecker);
  const formError = ref({});
  const formValidate = (fields) => {
    (getFields(fields) || Object.keys(validates)).forEach((field) => validates[field]());
    const errors = Object.values(unref(formError)).filter((error) => !!error);
    return Array.isArray(errors) && errors.length ? errors : undefined;
  };
  const formReset = (fields) => (getFields(fields) || Object.keys(resets)).forEach((field) => resets[field]());
  const formClear = (fields) => (getFields(fields) || Object.keys(clears)).forEach((field) => clears[field]());

  const useField = (fieldChecker, defaultValue, fieldOptions) => {
    const value = ref(defaultValue);
    const fieldError = ref();
    if (typeof fieldChecker !== 'string') {
      Object.assign(checker, fieldChecker);
    }
    const field = typeof fieldChecker === 'string' ? fieldChecker : Object.keys(fieldChecker)[0];

    const fieldValidate = () => {
      const check = checker[field];
      if (check && typeof fieldCh === 'function') {
        fieldError.value = check(unref(value));
      } else {
        const error = parameter.validate({ value: unref(check) }, { value: unref(value) });
        fieldError.value = (Array.isArray(error) && error.length) ? error[0].message : undefined;
      }
      formError.value[field] = fieldError;
      return unref(fieldError);
    };
    const fieldClear = () => {
      fieldError.value = undefined;
    };

    const fieldReset = () => {
      value.value = defaultValue;
    };

    validates[field] = fieldValidate;
    resets[field] = fieldReset;
    clears[field] = fieldClear;

    watch(value, fieldValidate, {
      deep: false,
      immediate: false,
      ...formOptions,
      ...fieldOptions,
    });
    return {
      value,
      validate: fieldValidate,
      reset: fieldReset,
      clear: fieldClear,
      errors: fieldError,
    };
  };

  return {
    useField,
    validate: formValidate,
    reset: formReset,
    clear: formClear,
    errors: formError,
  };
};

export { useForm };
