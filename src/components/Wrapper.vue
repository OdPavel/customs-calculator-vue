<template>
  <div class="wrapper">
    <!-- <h1>Программа для расчета таможенных платежей</h1> -->

      <nav>
        <router-link to="/">Default</router-link> |
        <router-link to="/customs">Customs</router-link>
      </nav>


    <form-api v-if="!CHOOSE_FORM_DEFAULT.sum" />
    <result-table v-else />
  </div>
</template>

<script>
import FormApi from '@/components/FormApi';
import ResultTable from '@/components/Result-table';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Wrapper',
  components: {
    FormApi,
    ResultTable,
  },
  computed: {
    ...mapGetters(['CHOOSE_FORM_DEFAULT']),
  },
};
</script>

<style lang="scss"></style>
