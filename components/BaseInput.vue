<template>
  <div class="form-control">
    <label v-if="label" class="label">
      <span class="label-text font-bold"> {{ label }}</span>
    </label>
    <input
      v-model="inputData"
      :type="type"
      :placeholder="placeholder"
      class="input input-bordered"
      :class="{ 'input-error': invalid }"
      :min="min"
      v-on="listeners"
    />
    <label v-if="errors && errors.length > 0 && errors[0]" class="label">
      <span class="label-text-alt text-error">{{ errors[0] }}</span>
    </label>
  </div>
</template>

<script>
import { validateAll } from "~/utils/validators";
export default {
  props: {
    label: {
      type: String,
      description: "Input label (text before input)",
      default: null,
    },
    labelEmoji: {
      type: String,
      description: "Input label emoji (emoji before label)",
      default: null,
    },
    type: {
      type: String,
      description: "Input type",
      default: "text",
    },
    rules: {
      type: Array,
      description: "Validation rules",
      default: () => {},
    },
    name: {
      type: String,
      description: "Input name (used for validation)",
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: null,
    },
    formControlClasses: {
      type: String,
      default: "",
    },
    min: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      inputData: null,
      errors: [],
      validated: false,
      invalid: false,
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
  watch: {
    value(newVal) {
      this.inputData = newVal;
    },
    inputData(newVal) {
      if (newVal === null) {
        return;
      }
      this.errors = validateAll(newVal, this.rules, this.name);
      this.validated = true;
      this.invalid = this.errors && this.errors.length > 0;
      this.$emit("invalid", this.invalid);
    },
  },
  mounted() {
    this.inputData = this.value;
  },
  methods: {
    updateValue(evt) {
      const value = evt.target.value;
      this.$emit("input", value);
    },
  },
};
</script>

<style scoped></style>
