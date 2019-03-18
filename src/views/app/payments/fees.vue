<template>
  <div>
    <v-toolbar flat color="white">
      <v-flex xs4>
        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
      </v-flex>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-btn fab medium color="fdaMed" top right absolute @click="addItem">
        <v-icon medium color="fdaSilver">add</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- ADD | EDIT -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title
            primary-title
            class="headline"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="new_fees.description" label="Fees"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="new_fees.productType"
                    :disabled="isUpdating"
                    :items="productType"
                    label="Product Type"
                    item-text="name"
                    item-value="_id"
                  >
                    <template slot="item" slot-scope="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="new_fees.primaryActivity"
                    :disabled="isUpdating"
                    :items="primaryActivity"
                    label="Primary Type"
                    item-text="name"
                    item-value="_id"
                  >
                    <template slot="item" slot-scope="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="new_fees.declaredCapital"
                    :disabled="isUpdating"
                    :items="declaredCapital"
                    label="Declared Capital"
                    item-text="name"
                    item-value="_id"
                  >
                    <template slot="item" slot-scope="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="new_fees.appType"
                    :disabled="isUpdating"
                    :items="appTypes"
                    label="Application Type"
                    item-text="label"
                    item-value="value"
                  >
                    <template slot="item" slot-scope="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.label"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="close">Cancel</v-btn>
            <v-btn color="success" v-if="mode==0" @click="submit">Submit</v-btn>
            <v-btn color="success" v-else @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- VIEW -->
      <v-dialog v-model="dialogView" max-width="800px">
        <v-card>
          <v-card-title
            primary-title
            class="headline"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="headline">View Location</span>
          </v-card-title>
          <v-divider class="mx-3" inset vertical></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Name</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_fees.description}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Product Type</span>
                  <v-divider></v-divider>
                  <v-card-text>{{product_details(new_fees.productType)}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Primary Activity</span>
                  <v-divider></v-divider>
                  <v-card-text>{{primary_details(new_fees.primaryActivity)}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Declared Capital</span>
                  <v-divider></v-divider>
                  <v-card-text>{{declared_details(new_fees.declaredCapital)}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Application Type</span>
                  <v-divider></v-divider>
                  <v-card-text>{{ App(new_fees.appType) }}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Fee</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_fees.fee}}</v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="close">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="fees" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.description }}</td>
        <td>{{ product_details(props.item.productType) }}</td>
        <td>{{ primary_details(props.item.primaryActivity) }}</td>
        <td>{{ declared_details(props.item.declaredCapital) }}</td>
        <td>{{ App(props.item.appType) }}</td>
        <td>{{ props.item.fee }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)" flat icon color="primary">edit</v-icon>
          <v-icon small @click="viewItem(props.item)" flat icon color="primary">visibility</v-icon>
        </td>
      </template>
      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >Your search for "{{ search }}" found no results.</v-alert>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    mode: 0, // 0 - create, 1 - edit
    products: {},
    productLine: [],
    declared: [],
    fees:[],
    new_fees: {},
    modified_fees: {},
    select: { state: "Product Type" },
    select_declared: { state: "Declared Capital" },
    appType: "",
    appTypes: [{ value: "0", label:'New License' }, { value: "2", label:'Renewal' }],
    dialog: false,
    dialogView: false,
    isUpdating: false,
    search: "",
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: "true",
        value: "description"
      },
      {
        text: "Product Type",
        align: "left",
        sortable: "true",
        value: "product"
      },
      {
        text: "Primary Activity",
        align: "left",
        sortable: "true",
        value: "primary"
      },
      {
        text: "Declared Capital",
        align: "left",
        sortable: "true",
        value: "declared"
      },
      {
        text: "Application Type",
        align: "left",
        sortable: "true",
        value: "appType"
      },
      {
        text: "Fee",
        align: "left",
        value: "fee"
      },
      {
        text: "Action",
        value: "editStatus"
      }
    ],
    productType: [],
    declaredCapital: [],
    primaryActivity: [],
    Fee: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      product_type: "",
      primary: "",
      status: ""
    },
    defaultItem: {
      name: ""
    }
  }),

  computed: {
    formTitle() {
      return this.mode === 0 ? "Add Fees" : "Edit Fees";
    }
  },
  created() {
    this.init();
  },

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },

    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    product_details(product_id) {
      return this.getProduct(product_id)
        ? this.getProduct(product_id).name
        : "";
    },
    primary_details(primary_id) {
      return this.getPrimary(primary_id)
        ? this.getPrimary(primary_id).name
        : "";
    },
     declared_details(declared_id) {
      return this.getDeclared(declared_id)
        ? this.getDeclared(declared_id).name
        : "";
    },
    isEmpty(str) {
      return !str || str === null || str === "";
    },
    init() {
      //declared
      this.$store.dispatch("GET_DECLARED_CAPITAL").then(result => {
        this.declaredCapital = this.$store.state.reference_tables.declaredCapital;
      });
      //primary
      this.$store.dispatch("GET_PRIMARY").then(result => {
        this.primaryActivity = this.$store.state.reference_tables.primary;
      });
      //FEES
      this.$store.dispatch("GET_FEES").then(result => {
        this.fees = this.$store.state.fees_tables.fees;
      });
      this.$store
        .dispatch("GET_PRODUCT_LINE")
        .then(result => {
          this.productLine = this.$store.state.product_line_tables.productLine;
          return this.$store.dispatch("GET_PRODUCTS");
        })
        .then(result => {
          // GET product data
          this.productType = this.$store.state.reference_tables.products;
        });
    },
    remove(item) {
      const index = this.product.indexOf(item.name);
      if (index >= 0) this.product.splice(index, 1);
    },
    addItem() {
      this.mode = 0; // Create
      this.new_fees = {}; // holds the filled up item
      this.dialog = true;
    },
    editItem(item) {
      this.mode = 1; // Edit
      this.new_fees = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },

    viewItem(item) {
      this.new_fees = item;
      this.dialogView = true;
    },

    close() {
      this.dialog = false;
      this.dialogView = false;
      this.new_fees = {};
    },
    submit() {
      // console.log('###########added:new_fee: ' + JSON.stringify(this.new_fee));
      this.$store.dispatch("ADD_FEES", this.new_fees).then(result => {
        console.log("added:product_line: " + JSON.stringify(result));
        this.init();
        this.$notify({
              message: "You have successfully created a new Fee",
              color: "primary"
            });
        this.close();
      });
    },
    save() {
      console.log('###########edited:new_fees: ' + JSON.stringify(this.new_fees));
      this.$store.dispatch("EDIT_FEES", this.new_fees).then(result => {
        console.log("edited:product_line: " + JSON.stringify(result));
        this.init();
        this.$notify({
              message: "You have successfully edited a Fee",
              color: "primary"
            });
        this.close();
      });
    }
  }
};
</script>
<style>
</style>
