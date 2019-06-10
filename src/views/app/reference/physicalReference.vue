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
                    v-model="new_physical_reference.product_specification"
                    :rules="[rules.required]"
                    :disabled="isUpdating"
                    :items="product_specifications"
                    label="Product Specification"
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
                  <v-text-field v-model="new_physical_reference.name" :rules="[rules.required]" label="physical Reference"></v-text-field>
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
                  <label class="title">Food Category Name:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_physical_reference.name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Type of Food Product:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{ new_physical_reference.product_specification }}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Created By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_physical_reference.created_by)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Created:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_physical_reference.date_created)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Modified By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_physical_reference.modified_by)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Modified:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_physical_reference.date_created)}}</label>
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
    <v-data-table :headers="headers" :items="physical_reference" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ product_specification_details(props.item.product_specification) }}</td>
        <td>{{ getAdmin(props.item.created_by).last_name }}</td>
        <td>{{ formatDate(props.item.date_created) }}</td>
        <td>{{ getAdmin(props.item.modified_by).first_name }}</td>
        <td>{{ formatDate(props.item.date_modified) }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item, props.index)"
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
    </v-data-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    mode: 0, // 0 - create, 1 - edit
    product_specifications: {},
    product_specifications: [],
    new_physical_reference: {
      name: "",
      product_specification: ""
    },
    modified_physical_reference: {},
    dialog: false,
    dialogView: false,
    isUpdating: false,
    search: "",
    selectedIndex: -1, //
    headers: [
      {
        text: "Food Category Name",
        align: "left",
        sortable: "true",
        value: "name"
      },
      {
        text: "Type of Food Product",
        align: "left",
        sortable: "true",
        value: "product_specification"
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
    product_specification: [],
    physical_reference: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      product_specification: "",
      date_created: "",
      date_modified: ""
    },
    defaultItem: {
      name: ""
    },
    rules: {
      required: v => !!v || v === 0 || "This is a required field" //
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
    product_specification_details(product_specification_id) {
      return this.getFoodProduct(product_specification_id) ? this.getFoodProduct(product_specification_id).name : "";
    },
    isEmpty(str) {
      return !str || str === null || str === "";
    },
    init() {
      this.$store
        .dispatch("GET_physical_reference")
        .then(result => {
          this.physical_reference = this.$store.state.product_specification_tables.physical_reference;
          return this.$store.dispatch("GET_product_specification");
        })
        .then(result => {
          // GET Food Product items
          this.product_specifications = this.$store.state.product_specification_tables.product_specification;
        });
    },
    remove(item) {
      const index = this.product_specification.indexOf(item.name);
      if (index >= 0) this.product_specification.splice(index, 1);
    },
    addItem() {
      this.selectedIndex = -1; //
      this.mode = 0; // Create
      this.new_physical_reference = {}; // holds the filled up item
      this.dialog = true;
    },
    editItem(item, index) {
      this.selectedIndex = index; //
      this.mode = 1; // Edit
      this.new_physical_reference = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },

    viewItem(item) {
      this.new_physical_reference = item;
      this.dialogView = true;
    },

    close() {
      this.dialog = false;
      this.dialogView = false;
      this.new_physical_reference = {};
    },
    validate() {
      var check = true;
      if (
        this.isEmpty(this.new_physical_reference.name) 

      ) {
        this.$notify({
          message: "Please fill up required fields",
          color: "error"
        });
        return false;
      } else {
        for (let i = 0; i < this.physical_reference.length; i++) {
          if (
            this.selectedIndex != i &&
            this.physical_reference[i].name &&
            this.new_physical_reference.name.toLowerCase() ===
            this.physical_reference[i].name.toLowerCase()
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
        this.$store.dispatch("ADD_physical_reference", this.new_physical_reference).then(result => {
          console.log("added:physical_reference: " + JSON.stringify(result));
          this.init();
          this.$notify({
            message: "You have successfully created a new food category",
            icon: "check_circle",
            color: "primary"
          });
          this.close();
        });
      }
    },

    save() {
      if (this.validate()) {
        // console.log('###########edited:physical_reference: ' + JSON.stringify(this.new_physical_reference));
        this.$store
          .dispatch("EDIT_physical_reference", this.new_physical_reference)
          .then(result => {
            console.log("edited:physical_reference: " + JSON.stringify(result));
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
