<template>
  <div class="result">
    <h1>Результат вычислений</h1>
    <div class="result__tables">
      <div class="">
        <h2>Цена таможни таблица</h2>
        <table class="result__table">
          <tr >
            <td class="result__td">Цена таможни </td>
            <td class="result__td">{{ CHOOSE_FORM_CUSTOMS.price }} $/kg</td>
          </tr>
          <tr >
            <td class="result__td">Курс валюты </td>
            <td class="result__td">{{ CHOOSE_FORM_CUSTOMS.rate }} грн</td>
          </tr>
          <tr >
            <td class="result__td">Сумма до уплаты</td>
            <td class="result__td">{{ CHOOSE_FORM_CUSTOMS.sum }}</td>
          </tr>
        </table>
      </div>

    </div>

    <button class="btn result__btn" @click="backToForm">Назад</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'index',

  computed: {
    ...mapGetters(['CHOOSE_FORM_CUSTOMS']),
  },

  methods: {
    // ...mapMutations(['CLEAN_FORM']),
    ...mapActions(['CLEAN_FORM_STORE']),
    backToForm() {
      this.CLEAN_FORM_STORE();
    },
  },
};
</script>

<style lang="scss">
.result {
  margin-top: 60px;

  &__table {
    margin: 0 auto;
    padding: 1px;
    border: 1px solid #ccc;
  }

  &__td {
    border: 1px solid #ccc;
    padding: 10px;
  }

  &__btn {
    margin-top: 40px;
  }

  &__tables {
    display: flex;
    justify-content: space-around;
  }
}
</style>
