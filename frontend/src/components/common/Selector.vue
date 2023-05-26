<!--選択フォームのコンポーネント.-->

<template>
  <div>
    <b-form-group>
      <b-input-group size="sm">
        <b-input-group-prepend size="sm" is-text>
          <label class="label" :for="selectorId">{{ label }}</label>
        </b-input-group-prepend>
        <b-form-select
          :id="selectorId"
          :value="value"
          size="sm"
          :options="optionsWithPlaceholder"
          :disabled="noOptions"
          @change.native="$emit('input', $event.target.value)"
        />
      </b-input-group>
    </b-form-group>
  </div>
</template>
<script>
/**
 * id属性付与のための変数と関数.
 * 1ページに複数配置しても問題なく動作するために利用している.
 */
let nextBaseId = 0;
const getId = () => {
  return String(nextBaseId++);
};

export default {
  name: 'Selector',
  /**
   * セレクター Props.
   * @typedef {Object} Selector
   * @prop {String} label - ラベル
   * @prop {Array} options - オプション
   * @prop {String} value - 値
   * @prop {Boolean} selectFirstOption - 最初のoptionを選択する.
   */
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    selectFirstOption: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input'],
  data() {
    return {
      selectorId: `selector-${getId()}`,
    };
  },
  computed: {
    noOptions() {
      return this.options.length === 0;
    },
    optionsWithPlaceholder() {
      return [
        {
          text: this.noOptions ? 'No Options' : '--選択してください--',
          value: '',
          disabled: true,
        },
        ...this.options,
      ];
    },
  },
  watch: {
    options(newOptions) {
      const hasOldOption = (el) => {
        return el.value === this.value;
      };
      if (!newOptions.some(hasOldOption)) {
        this.$emit('input', '');
      }
    },
  },
  mounted() {
    if (this.value === '' && this.selectFirstOption) {
      if (this.options.length === 0) {
        throw new Error('must have one or more options');
      }
      this.$emit('input', this.options[0].value);
    }
  },
};
</script>
<style scoped>
.label {
  margin-bottom: 0;
}
</style>
