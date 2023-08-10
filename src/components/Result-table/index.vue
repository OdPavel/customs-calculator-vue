<template>
  <div class="result">
    <h1>Result</h1>
    <div class="result__tables">
      <div class="">
        <h2>Дефолтная таблица</h2>
        <table class="result__table">
          <tr v-for="(item, index) in CHOOSE_FORM_DEFAULT" :key="item.id">
            <td class="result__td">{{ index }}</td>
            <td class="result__td">{{ item }}</td>
          </tr>
        </table>
      </div>

      <div v-if="CHOOSE_FORM_DEFAULT.price_customs">
        <h2>Цена с суммой таможни</h2>
        <table class="result__table">
          <tr v-for="(item, index) in CHOOSE_FORM_CUSTOMS" :key="item.id">
            <template v-if="item">
              <td class="result__td">{{ index }}</td>
              <td class="result__td">{{ item }}</td>
            </template>
          </tr>
        </table>
      </div>
    </div>

    <button class="btn result__btn" @click="backToForm">Назад</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'index',

  computed: {
    ...mapGetters(['CHOOSE_FORM_DEFAULT', 'CHOOSE_FORM_CUSTOMS']),
  },

  methods: {
    ...mapMutations(['CLEAN_FORM']),
    backToForm() {
      this.CLEAN_FORM();
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
