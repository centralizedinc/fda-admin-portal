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
                  <v-text-field v-model="new_fees.description" :rules="[rules.required]" label="Name"></v-text-field>
                </v-flex>
                 <v-flex xs12>
                  <v-text-field v-model="new_fees.fee" :rules="[rules.required]" label="Amount of Fee"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="new_fees.productType"
                    :rules="[rules.required]"
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
                    :rules="[rules.required]"
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
                    :rules="[rules.required]"
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
                    :rules="[rules.required]"
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
      <v-dialog v-model="dialogView" max-width="700px">
        <v-card>
          <v-card-title
            primary-title
            class="headline"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="headline">View Details</span>
          </v-card-title>
          <v-divider class="mx-3" inset vertical></v-divider>
          <v-card-text>
            <v-container grid-list-xl>
              <v-layout row wrap align-center justify-center fill-height>
                <!-- <v-flex xs6> -->
                <v-flex xs6>
                  <label class="title">Description:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_fees.description}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Product Type:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{product_details(new_fees.productType)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Primary Activity:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{primary_details(new_fees.primaryActivity)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Declared Capital:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{declared_details(new_fees.declaredCapital)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Application Type:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{ App(new_fees.appType) }}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Amount of Fee:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">₱ {{ numberWithCommas(new_fees.fee) }}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Created By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_fees.created_by).last_name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Created:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_fees.date_created)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Modified By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_fees.modified_by).first_name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Modified:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_fees.date_modified)}}</label>
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
        <td>₱ {{ numberWithCommas(props.item.fee) }}</td>
        <td>{{ getAdmin(props.item.created_by).last_name }}</td>
        <td>{{ formatDate(props.item.date_created) }}</td>
        <td>{{ getAdmin(props.item.modified_by).first_name }}</td>
        <td>{{ formatDate(props.item.date_modified) }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item, props.index)" flat icon color="primary">edit</v-icon>
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
    fees: [],
    new_fees: {},
    modified_fees: {},
    select: { state: "Product Type" },
    select_declared: { state: "Declared Capital" },
    appType: "",
    appTypes: [
      { value: "0", label: "New License" },
      { value: "2", label: "Renewal" }
    ],
    dialog: false,
    dialogView: false,
    isUpdating: false,
    search: "",
    selectedIndex: -1, //
    headers: [
      {
        text: "Description",
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
        text: "Amount of Fee",
        align: "left",
        value: "fee"
      },
      {
        text: "Created By",
        align: "left",
        value: "created_by"
      },
      {
        text: "Date Created",
        align: "left",
        value: "date_created"
      },
      {
        text: "Modified By",
        align: "left",
        value: "modified_by"
      },
      {
        text: "Date Modified",
        align: "left",
        value: "date_modified"
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
    },
    rules: {
      required: v => !!v || "This is a required field"
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
    numberWithCommas(x) {
      return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0.00"
    },
    remove(item) {
      const index = this.product.indexOf(item.name);
      if (index >= 0) this.product.splice(index, 1);
    },
    addItem() {
      this.selectedIndex = -1; //
      this.mode = 0; // Create
      this.new_fees = {}; // holds the filled up item
      this.dialog = true;
    },
    editItem(item, index) {
      this.selectedIndex = index; //
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
    validate() {
      var check = true;
      if (
        this.isEmpty(this.new_fees.description) ||
        this.isEmpty(this.new_fees.fee)  ||
        this.isEmpty(this.new_fees.productType) ||
        this.isEmpty(this.new_fees.primaryActivity) ||
        this.isEmpty(this.new_fees.declaredCapital) ||
        this.isEmpty(this.new_fees.appType)
      ) {
        this.$notify({
          message: "Please fill up required fields",
          color: "error"
        });
        return false;
      } else {
        for (let i = 0; i < this.fees.length; i++) {
          if (
            this.selectedIndex != i &&
            this.fees[i].description &&
            this.new_fees.description.toLowerCase() ===
            this.fees[i].description.toLowerCase()
          ) {
            check = false;
          } else if (!check) {
            this.$notify({
              message: "You have inputed an existing details",
              color: "error"
            });
            return false;
          }
        }
      }
      return true;
    },
    submit() {
      if (this.validate()) {
      // console.log('###########added:new_fee: ' + JSON.stringify(this.new_fee));
      this.$store.dispatch("ADD_FEES", this.new_fees).then(result => {
        console.log("added:product_line: " + JSON.stringify(result));
        this.init();
        this.$notify({
          message: "You have successfully created a new Fee",
          icon: "check_circle",
          color: "primary"
        });
        this.close();
      });
      }
    },
    save() {
      if (this.validate()) {
      console.log(
        "###########edited:new_fees: " + JSON.stringify(this.new_fees)
      );
      this.$store.dispatch("EDIT_FEES", this.new_fees).then(result => {
        console.log("edited:product_line: " + JSON.stringify(result));
        this.init();
        this.$notify({
          message: "You have successfully edited a Fee",
          icon: "check_circle",
          color: "primary"
        });
        this.close();
      });
      }
    }
  }
};
</script>
<style>
</style>
