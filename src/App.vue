<template>
  <div id="app">
    <router-view/>
    <nav>
      <router-link to="/">Default</router-link> |
      <router-link to="/customs">Customs</router-link>
    </nav>
<!--    <form-api v-if="!CHOOSE_FORM_DEFAULT.sum" />-->
<!--    <result-table v-else />-->
  </div>
</template>

<script>

import FormApi from "@/components/FormApi";
import ResultTable from "@/components/Result-table";
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    FormApi,
    ResultTable,
  },
  computed: {
    ...mapGetters(['CHOOSE_FORM_DEFAULT']),
  },
};
</script>

<style lang="scss">
#app {
  text-align: center;
  margin-top: 60px;
}
a{
  color: white;
  font-size: 30px;
}
</style>
