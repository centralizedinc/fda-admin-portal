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
                  <v-text-field v-model="new_product_line.name" :rules="[rules.required]" label="Product Line"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="new_product_line.product_type"
                    :rules="[rules.required]"
                    :disabled="isUpdating"
                    :items="product_type"
                    box
                    chips
                    label="Product Type"
                    item-text="name"
                    item-value="_id"
                  >
                    <template slot="selection" slot-scope="data">
                      <v-chip
                        :selected="data.selected"
                        close
                        class="chip--select-multi"
                        @input="remove(data.item)"
                      >{{ data.item.name }}</v-chip>
                    </template>
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
            <span class="headline">View Details</span>
          </v-card-title>
          <v-divider class="mx-3" inset vertical></v-divider>
          <v-card-text>
            <v-container grid-list-xl>
              <v-layout row wrap align-center justify-center fill-height>
                <!-- <v-flex xs6> -->
                <v-flex xs6>
                  <label class="title">Name:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_product_line.name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Product Type:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{product_details(new_product_line.product_type)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Created By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_product_line.created_by).last_name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Status:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{statProdLn(new_product_line.status)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Created:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_product_line.date_created)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Modified By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_product_line.modified_by).first_name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Modified:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_product_line.date_modified)}}</label>
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
    <v-data-table :headers="headers" :items="productLine" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ product_details(props.item.product_type) }}</td>
        <td>{{ statProdLn(props.item.status) }}</td>
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
    product_type: [],
    new_product_line: {},
    modified_product_line: {},
    dialog: false,
    dialogView: false,
    isUpdating: false,
    search: "",
     selectedIndex: -1, //
    headers: [
      {
        text: "Product Line",
        align: "left",
        sortable: "true",
        value: "name"
      },
      {
        text: "Product Type",
        align: "left",
        sortable: "true",
        value: "product"
      },
      {
        text: "Status",
        align: "left",
        value: "status"
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
    product_type: [],
    productLine: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      product_type: "",
      prductLine: "",
      status: ""
    },
    defaultItem: {
      name: ""
    },
     rules: {
      required: v => !!v || "This is a required field" //
    }
  }),

  computed: {
    formTitle() {
      return this.mode === 0 ? "Add Product Line" : "Edit Product Line";
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
    isEmpty(str) {
      return !str || str === null || str === "";
    },
    init() {
      this.$store
        .dispatch("GET_PRODUCT_LINE")
        .then(result => {
          this.productLine = this.$store.state.product_line_tables.productLine;
          return this.$store.dispatch("GET_PRODUCTS");
        })
        .then(result => {
          // GET product data
          this.product_type = this.$store.state.reference_tables.products;
        });
    },
    remove(item) {
      const index = this.product.indexOf(item.name);
      if (index >= 0) this.product.splice(index, 1);
    },
    addItem() {
      this.selectedIndex = -1; //
      this.mode = 0; // Create
      this.new_product_line = {}; // holds the filled up item
      this.dialog = true;
    },
    editItem(item, index) {
      this.selectedIndex = index; //
      this.mode = 1; // Edit
      this.new_product_line = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },

    viewItem(item) {
      this.new_product_line = item;
      this.dialogView = true;
    },

    close() {
      this.dialog = false;
      this.dialogView = false;
      this.new_product_line = {};
    },
    validate() {
      var check = true;
      if (
        this.isEmpty(this.new_product_line.name) ||
        this.isEmpty(this.new_product_line.product_type)
      ) {
        this.$notify({
          message: "Please fill up required fields",
          color: "error"
        });
        return false;
      } else {
        for (let i = 0; i < this.productLine.length; i++) {
          if (
            this.selectedIndex != i &&
            this.productLine[i].product_type &&
            this.productLine[i].name &&

            this.new_product_line.name.toLowerCase() ===
            this.productLine[i].name.toLowerCase()
          ) 
          {
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
      // console.log('###########added:product_line: ' + JSON.stringify(this.new_product_line));
      this.$store
        .dispatch("ADD_PRODUCT_LINE", this.new_product_line)
        .then(result => {
          console.log("added:product_line: " + JSON.stringify(result));
          this.init();
          this.$notify({
            message: "You have successfully created a new Product Line",
            icon: "check_circle",
            color: "primary"
          });
          this.close();
        });
      }
    },
    save() {
      if (this.validate()) {
      // console.log('###########edited:product_line: ' + JSON.stringify(this.new_product_line));
      this.$store
        .dispatch("EDIT_PRODUCT_LINE", this.new_product_line)
        .then(result => {
          console.log("edited:product_line: " + JSON.stringify(result));
          this.init();
          this.$notify({
            message: "You have successfully edited a Product Line",
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
