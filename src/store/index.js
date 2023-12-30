import {createStore} from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        codes: [
            {
                code: 7605110000,
                percent: 0,
                id: 0,
            },
            {
                code: 8544609090,
                percent: 2,
                id: 1,
            },
            {
                code: 8544499100,
                percent: 7,
                id: 2,
            },
            {
                code: 8544609010,
                percent: 10,
                id: 3,
            },
        ],
        rate: '',
        choose_form_default: [],
        choose_form_customs: [],
        // forms: []
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
        GET_RATE_FROM_API({commit}, currency) {
            axios(
                `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency}&json`,
                {
                    methods: 'GET',
                },
            ).then((rates) => {
                commit('SET_RATES_TO_STATE', rates.data[0].rate);
            });
        },

        CLEAN_FORM_STORE({commit}) {
            commit('CLEAN_FORM')
        },

        WRITE_FROM_FORM({commit}, data) {

            // axios(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${this.state.choose_form_default.currency}&json`, {
            //     methods: 'GET'
            // })
            //
            //     .then((rates) => {
            //         commit('SET_RATES_TO_STATE', rates.data[0].rate)
            //     })

            const calc = (data) => {

                const res = data.reduce((acc, el) => {
                    let sum = null;
                    if (el.transport) {
                        sum = +el.price * this.state.rate + +el.transport;
                    } else {
                        sum = +el.price * this.state.rate
                    }

                    if (!el.preference) {
                        let duty = (sum * el.percent) / 100
                        return acc + (duty + sum) * 0.2 + duty;

                    }

                    if (el.preference) {
                        return acc + (sum * 0.2);

                    }

                }, 0)
                data.sum = res.toFixed(2) + ' ' + 'грн';

                // let trans = +data.price * this.state.rate + +data.transport;
                //
                //
                // if (!data.preference) {
                //   sum = ((trans * data.percent) / 100 + trans) * 0.2;
                // }
                // if (data.preference) {
                //   sum = trans * 0.2;
                // }
                //
                // data.sum = sum.toFixed(2) + ' ' + 'грн';
            };

            if (data[0].price && data[0].percent) {
                calc(data);

                commit('WRITE_FORM_DEFAULT', {
                    price: data.reduce((acc, el) => (acc + +el.price), 0),
                    transport: data[0].transport,
                    rate: this.state.rate,
                    sum: data.sum
                });

                // if (data.price_customs) {
                //   data.price = data.netto * data.price_customs;
                //   calc(data);
                //   commit('WRITE_FORM_CUSTOMS', data);
                // }

                // commit('WRITE_FORM_CUSTOMS', data);
            }
        },

        CUSTOMS_PRICE_CALC({commit}, data) {
            const calculation = (data) => {
                const res = data.reduce((acc, el) => {

                    let sum = +el.price * this.state.rate * +el.netto

                    if (!el.preference) {
                        let duty = (sum * el.percent) / 100
                        return acc + (duty + sum) * 0.2 + duty;
                    }

                    if (el.preference) {
                        return acc + (sum * 0.2);
                    }

                }, 0)
                data.sum = res.toFixed(2) + ' ' + 'грн';

            }
            if (data[0].price && data[0].percent && data[0].netto) {
                calculation(data)

                commit('WRITE_FORM_CUSTOMS', {
                    price: data.reduce((acc, el) => (acc + +el.price), 0),
                    rate: this.state.rate,
                    sum: data.sum
                });
            }
        }
    },

    modules: {},
});
