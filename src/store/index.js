import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    codes: [
      {
        code: 8544499100,
        percent: 7,
        id: 1,
      },
      {
        code: 8544609010,
        percent: 10,
        id: 2,
      },
      {
        code: 8544609090,
        percent: 2,
        id: 3,
      },
    ],
    rate: '',
    choose_form_default: {},
    choose_form_customs: {},
  },
  getters: {
    CODES(state) {
      return state.codes;
    },
    CHOOSE_FORM_DEFAULT(state) {
      return state.choose_form_default;
    },
    CHOOSE_FORM_CUSTOMS(state) {
      return state.choose_form_customs;
    },
  },
  mutations: {
    TO_STATE: (state, data) => {
      state.choose_form_default = data;
    },
    WRITE_FORM_DEFAULT: (state, data) => {
      state.choose_form_default = data;
    },
    WRITE_FORM_CUSTOMS: (state, data) => {
      state.choose_form_customs = data;
    },
    CLEAN_FORM: (state) => {
      state.choose_form_default = {};
      state.choose_form_customs = {};
      state.rate = '';
    },
    SET_RATES_TO_STATE: (state, rates) => {
      state.rate = rates;
    },
  },
  actions: {
    GET_RATE_FROM_API({ commit }) {
      axios(
        `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${this.state.choose_form_default.currency}&json`,
        {
          methods: 'GET',
        },
      ).then((rates) => {
        commit('SET_RATES_TO_STATE', rates.data[0].rate);
      });
    },

    WRITE_FROM_FORM({ commit }, data) {
      // axios(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${this.state.choose_form_default.currency}&json`, {
      //     methods: 'GET'
      // })
      //
      //     .then((rates) => {
      //         commit('SET_RATES_TO_STATE', rates.data[0].rate)
      //     })

      const calc = (data) => {
        let sum = null;
        let trans = +data.price * this.state.rate + +data.transport;

        if (!data.preference) {
          if (data.code === '8544499100') {
            sum = ((trans * 7) / 100 + trans) * 0.2;
          }
          if (data.code === '8544609010') {
            sum = ((trans * 10) / 100 + trans) * 0.2;
          }
        }
        if (data.preference) {
          sum = trans * 0.2;
        }

        data.sum = sum.toFixed(2) + ' ' + 'грн';
      };

      if (data.price && data.code) {
        calc(data);
        commit('WRITE_FORM_DEFAULT', data);

        if (data.price_customs) {
          data.price = data.netto * data.price_customs;
          calc(data);
          commit('WRITE_FORM_CUSTOMS', data);
        }

        commit('WRITE_FORM_CUSTOMS', data);
      }
    },
  },
  modules: {},
});
