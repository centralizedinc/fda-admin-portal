<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div>
        <!-- PRODUCTS
        {{products}}
        PRIMARY
        {{primary}}
        SECONDARY
        {{secondary}}
        ADDITIONAL
        {{additional}}
        DECLARED
        {{declared}} -->

        {{groups}}

        <!-- ADD PRODUCT-->
        <v-flex xs12 sm6 md3>
          <v-card>
            <v-card-text>
              <v-text-field v-model="new_product.name" label="Product"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" @click="add_product">add</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <!-- ADD PRIMARY-->
        <v-flex xs12 sm6 md3>
          <v-card>
            <v-card-text>
              <v-text-field v-model="new_primary.name" label="Primary"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" @click="add_primary">add</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <!-- ADD declared-->
        <v-flex xs12 sm6 md3>
          <v-card>
            <v-card-text>
              <v-text-field v-model="new_declared.name" label="Declared Capital"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" @click="add_declared">add</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <!-- Edit Declared -->
        <v-flex xs12 sm6 md3>
          <v-card>
            <v-card-text>{{modified_declared}}</v-card-text>
            <v-card-actions>
              <v-btn color="success" @click="edit_declared">Edit</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <!-- ADD ADDITIONAL-->
        <v-flex xs12 sm6 md3>
          <v-card>
            <v-card-text>
              <v-text-field v-model="new_additional.name" label="Additional Activity"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" @click="add_additional">add</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

         

        <!-- edit -->
        <!-- <v-flex xs12>
          <v-card>
            <v-data-table :headers="headers" :items="primary" :search="search" class="elevation-1">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.secondary_activities }}</td>
                <td>{{ props.item.additional_activities }}</td>
                <td>{{ props.item.decalred_capital }}</td>
                <td>{{ props.item.date_created }}</td>
                <td class="justify-center layout px-0">
                  <v-icon
                    small
                    class="mr-2"
                    @click="edit_primary(props.item)"
                    flat
                    icon
                    color="primary"
                  >edit</v-icon>
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
        </v-flex>-->
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
      groups: {},
      provinces:{},
      products: {},
      cities:{},
      regions:{},
      new_product: {},
      primary: {},
      secondary: {},
      additional: {},
      declared: {},
      new_declared: {},
      modified_declared: {},
      new_additional:{},
      new_primary: {},
      edit_primary: {}
    };
  },

  methods: {


    // ADD_PRODUCT
    add_product() {
      this.$store.dispatch("ADD_PRODUCTS", this.new_product).then(result => {
        // this.modified_declared = this.new_product;
        console.log("added:product");
      });
    },

    // ADD_ADDITIONAL
    add_additional() {
      this.$store.dispatch("ADD_ADDITIONAL", this.new_additional).then(result => {
        // this.modified_declared = this.new_declared;
        console.log("added:additional");
      });
    },
    // EDIT_ADDITIONAL
    edit_additional(item) {
      this.dialog = true;
      this.$store.dispatch("EDIT_ADDITIONAL", item).then(result => {
        console.log("edited");
      });
    },
    // ADD_DECLARED
    add_declared() {
      this.$store.dispatch("ADD_DECLARED", this.new_declared).then(result => {
        this.modified_declared = this.new_declared;
        console.log("added:declared");
      });
    },
    // EDIT_DECLARED
    edit_declared(item) {
      this.dialog = true;
      this.$store.dispatch("EDIT_DECLARED", item).then(result => {
        console.log("edited");
      });
    },

    // ADD_PRIMARY
    add_primary() {
      this.$store.dispatch("ADD_PRIMARY", this.new_primary).then(result => {
        console.log("added");
      });
    },

    edit_primary(item) {
      this.dialog = true;
      this.$store.dispatch("EDIT_PRIMARY", item).then(result => {
        console.log("edited");
      });
    }
  },

  created() {


this.$store.dispatch("GET_GROUP").then(result =>
  this.groups = this.$store.state.group_table.groups
)




this.$store.dispatch("GET_PROVINCE").then(result => {
      console.log(
        JSON.stringify(
          "###############################" +
            this.$store.state.regional_tables.provinces
        )
      );
      this.regions = this.$store.state.regional_tables.provinces;
      console.log(
        JSON.stringify("###############################" + this.provinces)
      );
    });

    this.$store.dispatch("GET_REGION").then(result => {
      console.log(
        JSON.stringify(
          "###############################" +
            this.$store.state.regional_tables.regions
        )
      );
      this.regions = this.$store.state.regional_tables.regions;
      console.log(
        JSON.stringify("###############################" + this.regions)
      );
    });

    this.$store.dispatch("GET_PRODUCTS").then(result => {
      console.log(
        JSON.stringify(
          "###############################" +
            this.$store.state.reference_tables.products
        )
      );
      this.products = this.$store.state.reference_tables.products;
      console.log(
        JSON.stringify("###############################" + this.products)
      );
    });

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

    this.$store.dispatch("GET_SECONDARY").then(result => {
      console.log(
        JSON.stringify(
          "###############################" +
            this.$store.state.reference_tables.secondary
        )
      );
      this.secon0dary = this.$store.state.reference_tables.secondary;
      console.log(
        JSON.stringify("###############################" + this.secondary)
      );
    });

    this.$store.dispatch("GET_ADDITIONAL").then(result => {
      console.log(
        JSON.stringify(
          "###############################" +
            this.$store.state.reference_tables.additional
        )
      );
      this.additional = this.$store.state.reference_tables.additional;
      console.log(
        JSON.stringify("###############################" + this.additional)
      );
    });

    this.$store.dispatch("GET_DECLARED_CAPITAL").then(result => {
      console.log(
        JSON.stringify(
          "###############################" +
            this.$store.state.reference_tables.declaredCapital
        )
      );
      this.declared = this.$store.state.reference_tables.declaredCapital;
      console.log(
        JSON.stringify("###############################" + this.declaredCapital)
      );
    });
  }
};
</script>

<style>
</style>
