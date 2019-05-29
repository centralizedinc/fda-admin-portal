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
                  <v-autocomplete
                    v-model="new_food_category.food_product"
                    :disabled="isUpdating"
                    :items="food_product_items"
                    :rules="[rules.required]"
                    label="Product"
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
                  <v-text-field v-model="new_food_category.name" :rules="[rules.required]" label="Name"></v-text-field>
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
                  <label class="title">Food Categorization:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{food_category.name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Type of Food Product:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{ product_details(new_food_category.food_product) }}</label>
                </v-flex>
                <!-- <v-flex xs6>
                  <label class="title">Province Name:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{province_details(new_city.province)}}</label>
                </v-flex> -->
                <v-flex xs6>
                  <label class="title">Created By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_food_category.created_by)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Created:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_food_category.date_created)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Modified By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_food_category.modified_by)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Modified:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_food_category.date_modified)}}</label>
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
    <v-data-table :headers="headers" :items="food_categories" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ product_details(props.item.food_product) }}</td>
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
    food_product_items: [],
    food_category: {},
    new_food_category: {},
    modified_food_category: {},
    dialog: false,
    dialogView: false,
    isUpdating: false,
    search: "",
    selectedIndex: -1,
    headers: [
      {
        text: "Food Category",
        align: "left",
        sortable: "true",
        value: "name"
      },
      {
        text: "Type of Food Product",
        align: "left",
        sortable: "true",
        value: "food_product"
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
    food_product: [],
    food_categories: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      food_product: "",
      created_by: "",
      date_created: "",
      modified_by: "",
      date_modified: ""
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
      return this.mode === 0 ? "Add Food Category" : "Edit Food Category";
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
    // region_details(province_id) {
    //   var region_id = this.getProvince(province_id)
    //     ? this.getProvince(province_id).region
    //     : "";
    //   return this.getRegion(region_id) ? this.getRegion(region_id).name : "";
    // },
    
    product_details(product_id) {
      return this.getFoodProduct(product_id)
        ? this.getFoodProduct(product_id).name
        : "";
    },
    isEmpty(str) {
      return !str || str === null || str === "";
    },
    init() {
      this.$store
        .dispatch("GET_FOOD_PRODUCT")
        .then(result => {
          this.food_category = this.$store.state.food_category_tables.food_category;
          console.log("######foodProduct: " + JSON.stringify(this.food_product));
          return this.$store.dispatch("GET_FOOD_PRODUCT");
        })
        // .then(result => {
        //   this.provinces_items = this.$store.state.regional_tables.provinces;
        //   return this.$store.dispatch("GET_REGION");
        // });
    },
    removeFoodProduct(item) {
      const index = this.food_product.indexOf(item.name);
      if (index >= 0) this.food_product.splice(index, 1);
    },
    initialize() {
      this.food_categories = {};
      this.food_product = [];
    },
    addItem() {
      this.selectedIndex = -1;
      this.mode = 0; // Create
      this.new_city = {}; // holds the filled up item
      this.dialog = true;
    },
    editItem(item, index) {
      this.selectedIndex = index;
      this.mode = 1; // Edit
      this.new_food_category = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },

    viewItem(item) {
      this.food_category = item;
      this.dialogView = true;
    },

    close() {
      this.dialog = false;
      this.dialogView = false;
      this.food_category = {};
    },
    validate() {
      var check = true;
      if (
        this.isEmpty(this.new_food_category.name) ||
        this.isEmpty(this.new_food_category.food_product)
      ) {
        this.$notify({
          message: "Please fill up required fields",
          color: "error"
        });
        return false;
      } else {
        for (let i = 0; i < this.food_categories.length; i++) {
          if (
            this.selectedIndex != i &&
            this.food_categories[i].food_product &&
            this.food_categories[i].name &&
            this.food_categories[i].food_product.toLowerCase() ===
              this.new_food_category.food_product.toLowerCase() &&
            this.new_food_category.name.toLowerCase() === this.food_categories[i].name.toLowerCase()
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
        this.$store.dispatch("ADD_FOOD_CATEGORY", this.new_food_category).then(result => {
          console.log("added:food Category: " + JSON.stringify(result));
          this.init();
          this.$notify({
            message: "You have successfully created a food category",
            icon: "check_circle",
            color: "primary"
          });
          this.close();
        });
      }
    },
    save() {
      if (this.validate()) {
        this.$store.dispatch("EDIT_FOOD_CATEGORY", this.new_food_category).then(result => {
          console.log("edited:food category: " + JSON.stringify(result));
          this.init();
          this.$notify({
            message: "You have successfully edited a food category",
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