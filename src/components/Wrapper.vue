<template>
  <div class="wrapper">
    <h1>Программа для расчета платежей</h1>
    <form-api v-if="!CHOOSE_FORM_DEFAULT.sum"/>
    <result-table v-else/>
  </div>
</template>

<script>
import FormApi from "@/components/Form-api";
import ResultTable from "@/components/Result-table";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "Wrapper",
  components: {
    FormApi,
    ResultTable
  },
  computed:{
    ...mapGetters(['CHOOSE_FORM_DEFAULT'])
  },


}
</script>

<style lang="scss">


</style>
