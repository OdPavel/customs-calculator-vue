<template>
  <div class="form">
    <h2>Заполните данные</h2>

    <form>
      <div class="form-wrapper">
        <label>
          <p>Введите цену</p>
          <input
              type="text"
              v-model="choose_form.price"
          >
        </label>
      </div>

      <div class="form-wrapper">
        <label>
          <p>Выберите код</p>
          <select v-model="choose_form.code">
            <option
                v-for="(code, percent) in CODES"
                :key="code.id"
            >
              {{ code.code }}
            </option>
          </select>
        </label>
      </div>

      <div class="form-wrapper">
        <label>
          <p>Введите сумму траспорта</p>
          <input type="text"
                 v-model="choose_form.transport"
          >
        </label>
      </div>

      <div class="form-block">
        <div class="form-wrapper">
          <label>
            <p>Введите вес нетто</p>
            <input type="text"
                   v-model="choose_form.weight"
            >
          </label>
        </div>

        <div class="form-wrapper">
          <label>
            <p>Введите цену таможни</p>
            <input type="text"
                   v-model="choose_form.price_customs"
            >
          </label>
        </div>
      </div>
      <div class="">
        <label class="form__checkbox">
          Преференция
          <input type="checkbox" name="preference" v-model="choose_form.preference">
        </label>
        <label>
          USD
          <input type="radio" value="usd" v-model="choose_form.currency" @change="getRate">
        </label>
        <label>
          EUR
          <input type="radio" value="eur" v-model="choose_form.currency" @change="getRate">
        </label>


      </div>
    </form>
    <button class="form-btn btn" type="button" @click="writeFromFormToState">Рассчитать</button>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: "Form",

  data() {
    return {
      choose_form: {
        price: '',
        netto: '',
        price_customs: '',
        code: '',
        percent: '',
        transport: '',
        preference: false,
        currency: ''
      }
    }
  },

  methods: {
    ...mapActions(['WRITE_FROM_FORM', 'GET_RATE_FROM_API']),
    ...mapMutations(['TO_STATE']),
    writeFromFormToState() {
      this.WRITE_FROM_FORM(this.choose_form)
    },
    getRate(){
      this.GET_RATE_FROM_API()
    }
  },
  mounted() {
    this.TO_STATE(this.choose_form)
  },

  computed: {
    ...mapGetters(['CODES'])
  }
}
</script>

<style lang="scss">
.form-wrapper {
  display: inline-block;
  width: 220px;
  padding: $padding;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: $margin * 2;
  margin-bottom: $margin * 2;
}

.form-block {
  //margin-top: $margin * 2;
}

.form-btn {
  margin-top: $margin * 5;
}

.form__checkbox {
  margin-right: $margin * 5;
}

</style>
