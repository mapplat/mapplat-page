import { computed } from 'vue';

function useVModel(props, key, emit, options = {}) {
  key = key || 'modelValue';
  const event = options.event || `update:${key}`;
  return computed({
    get() {
      return props[key];
    },
    set(value) {
      emit(event, value);
    },
  });
}

export {
  // eslint-disable-next-line import/prefer-default-export
  useVModel,
};
