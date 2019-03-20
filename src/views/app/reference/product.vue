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
      <v-dialog v-model="dialog" max-width="800px">
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
                  <v-text-field v-model="new_product.name" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="new_product.primary_activity"
                    :disabled="isUpdating"
                    :items="primary_items"
                    box
                    chips
                    label="Primary Type"
                    item-text="name"
                    item-value="_id"
                    multiple
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
                  <label class="title">Product Name:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_product.name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Created By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_product.created_by}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Created:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_product.date_created)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Modified By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_product.modified_by}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Modified:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_product.date_modified)}}</label>
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
    <v-data-table :headers="headers" :items="products" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.created_by }}</td>
        <td>{{ formatDate(props.item.date_created) }}</td>
        <td>{{ props.item.modified_by }}</td>
        <td>{{ formatDate(props.item.date_modified) }}</td>
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
    mode: 0,
    dialog: false,
    dialogView: false,
    search: "",
    select: { state: "Product Type" },
    autoUpdate: true,
    primary: {},
    isUpdating: false,
    primary_items: [],
    new_product: {},
    modified_product: {},
    headers: [
      {
        text: "Product Name",
        align: "left",
        sortable: "true",
        value: "name"
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
    products: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      date_created: ""
    },
    defaultItem: {
      name: ""
    }
  }),

  computed: {
    formTitle() {
      return this.mode === 0 ? "Add Product Type" : "Product Type";
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
    init() {
      // VIEW
      this.$store.dispatch("GET_PRODUCTS").then(result => {
        this.products = this.$store.state.reference_tables.products;
      });
      // PRIMARY
      this.$store.dispatch("GET_PRIMARY").then(result => {
        this.primary_items = this.$store.state.reference_tables.primary;
      });
    },
    remove(item) {
      const index = this.products.indexOf(item.name);
      if (index >= 0) this.products.splice(index, 1);
    },

    addItem() {
      this.mode = 0; // Create
      this.new_product = {}; // holds the filled up item
      this.dialog = true;
    },

    //
    initialize() {
      this.products = [];
      this.primary = [];
    },

    editItem(item) {
      this.mode = 1; // Edit
      this.new_product = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },

    viewItem(item) {
      this.new_product = item;
      this.dialogView = true;
    },

    close() {
      this.dialog = false;
      this.dialogView = false;
      this.new_product = {};
    },
    submit() {
      // console.log(JSON.stringify(this.new_product));
      this.$store.dispatch("ADD_PRODUCTS", this.new_product).then(result => {
        console.log("added:product: " + JSON.stringify(result));
        this.init();
        this.$notify({
          message: "You have successfully created a new Product",
          icon: "check_circle",
          color: "primary"
        });
        this.close();
      });
    },
    save() {
      this.$store.dispatch("EDIT_PRODUCTS", this.new_product).then(result => {
        console.log("edited:product: " + JSON.stringify(result));
        this.init();
        this.$notify({
          message: "You have successfully edited a Product",
          icon: "check_circle",
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
