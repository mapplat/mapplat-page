import {
  ref, watch, getCurrentInstance, unref,
} from 'vue';

/**
 * 参考https://vee-validate.logaretm.com/
 */

const SCHEMAS_KEY = Symbol('schemas');
const CHECKERS_KEY = Symbol('checkers');
const ERRORS_KEY = Symbol('errors');
const OPTIONS_KEY = Symbol('options');

/**
 * useValue
 * @param {*} name useValue的checker,当是字符串时取useForm定义的checker,当是对象时可以使用自定义的checker格式为 { name: checker }
 * @param {*} params useValue 默认值
 * @param {*} options useField的配置
 * @returns {object} validate 和 errors
 */
const useValue = (name, params, options) => {
  const instance = getCurrentInstance();
  const value = ref(params);
  const schemas = unref(instance[SCHEMAS_KEY]);
  const errors = unref(instance[ERRORS_KEY]);
  if (typeof name !== 'string') {
    Object.assign(schemas, name);
  }
  const _name = typeof name === 'string' ? name : Object.keys(name)[0];

  const cb = () => {
    if (schemas[_name]) {
      errors[_name] = schemas[_name](unref(value));
    }
  };
  instance[CHECKERS_KEY].push(cb);

  watch(value, cb, {
    deep: false,
    immediate: false,
    ...instance[OPTIONS_KEY],
    ...options,
  });
  return {
    value,
    errors: errors[_name],
    validate: cb,
  };
};

/**
 * useSchema
 * @param {*} schemas useValue的默认checker
 * @param {*} options useValue的默认配置
 * @returns {object} validate 和 errors
 */
const useSchema = (schemas = {}, options = {}) => {
  const instance = getCurrentInstance();
  instance[CHECKERS_KEY] = [];
  instance[SCHEMAS_KEY] = ref(schemas);
  instance[ERRORS_KEY] = ref({});
  instance[OPTIONS_KEY] = ref(options);
  const validate = () => {
    const checkers = instance[CHECKERS_KEY];
    Object.keys(checkers).forEach((key) => {
      instance[ERRORS_KEY][key] = checkers[key]();
    });
  };
  return {
    validate,
    errors: instance[ERRORS_KEY],
  };
};

export {
  useValue,
  useSchema,
};
