<template>
  <div class="form" v-if="!CHOOSE_FORM_DEFAULT.sum">
    <h2>Заполните данные</h2>

    <!--    <form >-->
    <!--      <div class="form-wrapper">-->
    <!--        <label>-->
    <!--          <p>Введите цену</p>-->
    <!--          <my-input v-model="forms.price" />-->
    <!--        </label>-->
    <!--      </div>-->

    <!--      <div class="form-wrapper">-->
    <!--        <label>-->
    <!--          <p>Процентная ставка</p>-->
    <!--          <select v-model="forms.percent">-->
    <!--            <option v-for="code in CODES" :key="code.id" :value="code.percent">-->
    <!--              {{ code.percent }}-->
    <!--            </option>-->
    <!--          </select>-->
    <!--          <span>%</span>-->
    <!--        </label>-->
    <!--      </div>-->

    <!--      <div class="form-wrapper">-->
    <!--        <label>-->
    <!--          <p>Введите сумму траспорта</p>-->
    <!--          <my-input v-model="forms.transport" />-->
    <!--        </label>-->
    <!--      </div>-->

    <!--&lt;!&ndash;      <div class="form-block">&ndash;&gt;-->
    <!--&lt;!&ndash;        <div class="form-wrapper">&ndash;&gt;-->
    <!--&lt;!&ndash;          <label>&ndash;&gt;-->
    <!--&lt;!&ndash;            <p>Введите вес нетто</p>&ndash;&gt;-->
    <!--&lt;!&ndash;            <my-input v-model="choose_form.weight" />&ndash;&gt;-->
    <!--&lt;!&ndash;          </label>&ndash;&gt;-->
    <!--&lt;!&ndash;        </div>&ndash;&gt;-->

    <!--&lt;!&ndash;        <div class="form-wrapper">&ndash;&gt;-->
    <!--&lt;!&ndash;          <label>&ndash;&gt;-->
    <!--&lt;!&ndash;            <p>Введите цену таможни</p>&ndash;&gt;-->
    <!--&lt;!&ndash;            <my-input v-model="choose_form.price_customs" />&ndash;&gt;-->
    <!--&lt;!&ndash;          </label>&ndash;&gt;-->
    <!--&lt;!&ndash;        </div>&ndash;&gt;-->
    <!--&lt;!&ndash;      </div>&ndash;&gt;-->
    <!--      <div class="">-->
    <!--        <label class="form__checkbox">-->
    <!--          Преференция-->
    <!--          <input type="checkbox" name="preference" v-model="forms.preference" />-->
    <!--        </label>-->
    <!--        <label>-->
    <!--          USD-->
    <!--          <input type="radio" value="usd" v-model="choose_form.currency" @change="getRate" />-->
    <!--          {{CHOOSE_FORM_DEFAULT.currency}}-->
    <!--        </label>-->
    <!--        <label>-->
    <!--          EUR-->
    <!--          <input type="radio" value="eur" v-model="choose_form.currency" @change="getRate" />-->
    <!--        </label>-->
    <!--      </div>-->
    <!--    </form>-->


    <div class="list-group" v-for="(form, index) in forms">
      <form @submit.prevent>
        <div class="form-wrapper">
          <label>
            <p>Введите цену</p>
            <my-input v-model="forms[index].price"/>
          </label>
        </div>

        <div class="form-wrapper">
          <label>
            <p>Процентная ставка</p>
            <select v-model="forms[index].percent">
              <option v-for="code in CODES" :key="code.id" :value="code.percent">
                {{ code.percent }}
              </option>
            </select>
            <span>%</span>
          </label>
        </div>

        <div class="form-wrapper">
          <label>
            <p>Введите сумму траспорта</p>
            <my-input v-model="forms[index].transport"/>
          </label>
        </div>

        <div class="">
          <label class="form__checkbox">
            Преференция
            <input type="checkbox" name="preference" v-model="forms[index].preference"/>
          </label>
          <button @click="removeProduct(form.id)">Удалить товар</button>
        </div>
      </form>
    </div>

    <div>
      <label>
        USD
        <input type="radio" value="usd" v-model="currency" @change="getRate"/>
      </label>
      <label>
        EUR
        <input type="radio" value="eur" v-model="currency" @change="getRate"/>
      </label>
    </div>

    <div>
      <button @click="addTableProduct" class="form-btn btn" type="button">Добавить еще один товар</button>
    </div>
    <button class="form-btn btn" type="button" @click="writeFromFormToState">Рассчитать</button>
  </div>
  <result-table v-else/>
</template>

<script>
import MyInput from '@/components/UI/MyInput.vue';
import ResultTable from "@/components/Result-table";
import {mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  components: {MyInput, ResultTable},
  name: 'Form',

  data() {
    return {
      forms: [
        {
          price: '',
          percent: '',
          transport: '',
          preference: false,
          id: Date.now()
        }
      ],
      currency: '',
    };
  },

  methods: {
    ...mapActions(['WRITE_FROM_FORM', 'GET_RATE_FROM_API']),
    ...mapMutations(['TO_STATE']),
    writeFromFormToState() {
      this.WRITE_FROM_FORM(this.forms);
    },
    getRate(e) {
      this.GET_RATE_FROM_API(e.target.value);
    },
    addTableProduct() {
      this.forms.push({
        price: '',
        percent: '',
        preference: false,
        id: Date.now()
      })
    },
    removeProduct(id) {
      this.forms = this.forms.filter((form) => form.id !== id)
    }
  },
  mounted() {
    // this.TO_STATE(this.choose_form);

    this.TO_STATE(this.forms);
  },

  computed: {
    ...mapGetters(['CODES', 'CHOOSE_FORM_DEFAULT']),
  },
};
</script>

<style lang="scss">
form {
  display: inline-block;
  border: 2px solid #fff;
  margin-bottom: 20px;
  padding: 25px;
}

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
