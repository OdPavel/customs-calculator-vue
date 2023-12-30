<template>
  <input :value="modelValue" @input="updateInput" class="my-input" :type="type" />
</template>
<script>
export default {
  name: 'my-input',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>
<style lang="scss"></style>
