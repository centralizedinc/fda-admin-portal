<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div>
        <!-- PRODUCTS
        {{products}} -->
        PRIMARY
        {{primary}}
        <!-- SECONDARY
        {{secondary}}
        ADDITIONAL
        {{additional}}
        DECLARED
        {{declared}} -->

        <!-- ADD -->
        <v-flex xs12 sm6 md3>
          <v-card>
            <v-card-text>
              <v-text-field v-model="new_primary.name" label="Regular"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" @click="add_primary">add</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>



        <!-- edit -->
        <v-flex xs12 >
          <v-card>
            <v-data-table :headers="headers" :items="primary" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.secondary_activities }}</td>
        <td>{{ props.item.additional_activities }}</td>
        <td>{{ props.item.decalred_capital }}</td>
        <td>{{ props.item.date_created }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="edit_primary(props.item)" flat icon color="primary">edit</v-icon>
          <v-icon small @click="viewItem(props.item)" flat icon color="primary">visibility</v-icon>
        </td>
      </template>
      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >Your search for "{{ search }}" found no results.</v-alert>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
          </v-card>
        </v-flex>
        
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  // data: () =>({
  //     products:[]
  // }),
  data() {
    return {
      products: {},
      primary: {
        name:"",
        date_created:"",
        _id:""
      },
      secondary: {},
      additional: {},
      declared: {},
      new_primary: {
        name: ""
      },
      edit_primary:{}
    };
  },
methods:{

  add_primary(){
    this.$store.dispatch("ADD_PRIMARY", this.new_primary).then(result => {
      console.log("added")
    });
  },

  edit_primary(item){
    this.$store.dispatch("EDIT_PRIMARY", this.edit_primary).then(result => {
      console.log("edited")
      });
  }

},

  created() {
  //   this.$store.dispatch("GET_PRODUCTS").then(result => {
  //     console.log(
  //       JSON.stringify(
  //         "###############################" +
  //           this.$store.state.reference_tables.products
  //       )
  //     );
  //     this.products = this.$store.state.reference_tables.products;
  //     console.log(
  //       JSON.stringify("###############################" + this.products)
  //     );
  //   });

    this.$store.dispatch("GET_PRIMARY").then(result => {
      console.log(
        JSON.stringify(
          "###############################" +
            this.$store.state.reference_tables.primary
        )
      );
      this.primary = this.$store.state.reference_tables.primary;
      console.log(
        JSON.stringify("###############################" + this.primary)
      );
    });

  //   this.$store.dispatch("GET_SECONDARY").then(result => {
  //     console.log(
  //       JSON.stringify(
  //         "###############################" +
  //           this.$store.state.reference_tables.secondary
  //       )
  //     );
  //     this.secon0dary = this.$store.state.reference_tables.secondary;
  //     console.log(
  //       JSON.stringify("###############################" + this.secondary)
  //     );
  //   });

  //   this.$store.dispatch("GET_ADDITIONAL").then(result => {
  //     console.log(
  //       JSON.stringify(
  //         "###############################" +
  //           this.$store.state.reference_tables.additional
  //       )
  //     );
  //     this.additional = this.$store.state.reference_tables.additional;
  //     console.log(
  //       JSON.stringify("###############################" + this.additional)
  //     );
  //   });

  //   this.$store.dispatch("GET_DECLARED_CAPITAL").then(result => {
  //     console.log(
  //       JSON.stringify(
  //         "###############################" +
  //           this.$store.state.reference_tables.declaredCapital
  //       )
  //     );
  //     this.declared = this.$store.state.reference_tables.declaredCapital;
  //     console.log(
  //       JSON.stringify("###############################" + this.declaredCapital)
  //     );
  //   });
  },
  
};
</script>

<style>
</style>
