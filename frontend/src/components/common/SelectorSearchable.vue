<!--検索機能付き選択フォームのコンポーネント.-->

<template>
  <div>
    <b-form-group>
      <b-input-group size="sm">
        <b-input-group-prepend size="sm" is-text>
          <label class="label" :for="inputTagId">{{ label }}</label>
        </b-input-group-prepend>
        <b-form-input
          :id="inputTagId"
          v-model="displayedText"
          :list="datalistTagId"
          size="sm"
          :placeholder="noOptions ? 'No options' : '--選択してください--'"
          :disabled="noOptions"
          @focus="handleFocus"
          @change="handleChange"
          @blur="handleBlur"
        ></b-form-input>
        <datalist :id="datalistTagId" data-testid="datalist">
          <option v-for="(option, i) in options" :key="option.value + '-' + i">
            {{ option.text }}
          </option>
        </datalist>
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
  name: 'SelectorSearchable',
  /**
   * セレクター Props.
   * @typedef {Object} SelectorSearchable
   * @prop {String} label - ラベル
   * @prop {Array} options - オプション
   * @prop {String} value - 値
   * @prop {Boolean} selectFirstOption - trueの時, mount時に最初のoptionを選択する.
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
    const opt = getOptionByValue(this.options, this.value);

    return {
      displayedText: opt.text, // 表示されている文字列.
      preText: opt.text, // 前回選択した選択肢の文字列.
      baseId: getId(), // id付与のために利用する文字列.
    };
  },
  computed: {
    inputTagId() {
      return `selector-searchable-${this.baseId}`;
    },
    datalistTagId() {
      return `selector-searchable-datalist-${this.baseId}`;
    },
    noOptions() {
      return this.options.length === 0;
    },
  },
  watch: {
    /**
     * 選択肢の更新時, props.valueが更新後の選択肢に含まれていない場合空文字でemitする.
     * @param {Array} newOptions - 新たなoptionリスト
     */
    options(newOptions) {
      const hasOldOption = (el) => {
        return el.value === this.value;
      };
      if (!newOptions.some(hasOldOption)) {
        this.updateSelectedOption({text: '', value: ''});
      }
    },
  },
  mounted() {
    if (this.value === '' && this.selectFirstOption) {
      if (this.options.length === 0) {
        throw new Error('must have one or more options');
      }
      this.updateSelectedOption(this.options[0]);
    }
  },
  methods: {
    /**
     * changeイベントのハンドラ.
     * 更新後の値が選択肢のなかにある場合, 選択している選択肢を更新.
     * そうでないなら, 前の値に戻す.
     * @param {String} event - 更新後のinputタグの値.
     */
    handleChange(event) {
      const opt = getOptionByText(this.options, event);
      if (opt.value) {
        this.updateSelectedOption(opt);
      } else {
        this.displayedText = this.preText;
      }
      // 値変更後, 自動でfocusを外す.
      document.activeElement.blur();
    },
    /**
     * focusイベントのハンドラ.
     * 表示中の文字列を空文字にして選択候補を表示することで,
     * ユーザがセレクトボックスのように選択可能にする.
     * @param {String} event - 更新後のinputタグの値.
     */
    handleFocus() {
      this.displayedText = '';
    },
    /**
     * blurイベントのハンドラ.
     * 何も操作されずにfocusが外れた時に表示文字列を元の値に戻す.
     * @param {String} event - 更新後のinputタグの値.
     */
    handleBlur() {
      if (!this.displayedText) {
        this.displayedText = this.preText;
      }
    },
    /**
     * 選択中の選択肢を更新する.
     * @param {Object} opt - 選択する選択肢.
     */
    updateSelectedOption(opt) {
      this.displayedText = opt.text;
      this.preText = opt.text;
      this.$emit('input', opt.value);
    },
  },
};

/**
 * 選択肢の表示文字列から選択肢を取得する.
 * 対象となる選択肢が存在しない場合は空文字がセットされた選択肢を返却する.
 * @param {Array} options - 選択肢一覧.
 * @param {String} text - 選択肢の表示文字列.
 * @return {Object} - 選択肢.
 *
 */
const getOptionByText = (options, text) => {
  const filteredOptions = options.filter((option) => {
    return option.text === text;
  });

  return filteredOptions.length > 0
    ? filteredOptions[0]
    : {text: '', value: ''};
};

/**
 * 選択肢の値から選択肢を取得する.
 * 対象となる選択肢が存在しない場合は空文字がセットされた選択肢を返却する.
 * @param {Array} options - 選択肢一覧.
 * @param {String} value - 選択肢の表示文字列.
 * @return {Object} - 選択肢.
 *
 */
const getOptionByValue = (options, value) => {
  const filteredOptions = options.filter((option) => {
    return option.value === value;
  });

  return filteredOptions.length > 0
    ? filteredOptions[0]
    : {text: '', value: ''};
};
</script>
<style scoped>
.label {
  margin-bottom: 0;
}
</style>
