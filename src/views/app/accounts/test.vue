<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div>
          <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.calories }}</td>
      <td class="text-xs-right">{{ props.item.fat }}</td>
      <td class="text-xs-right">{{ props.item.carbs }}</td>
      <td class="text-xs-right">{{ props.item.protein }}</td>
      <td class="text-xs-right">{{ props.item.iron }}</td>
    </template>
  </v-data-table>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("GET_PRODUCTS");
    console.log(
      JSON.stringify(
        "###############################" +
          this.$store.state.reference_tables.test
      )
    );
    // this.$store.dispatch("GET_PRIMARY")
    // console.log(JSON.stringify("###############################"+this.$store.state.product.test))
  }
};
</script>

<style>
</style>
