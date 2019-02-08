<template>
  <div>
    <v-toolbar flat color="white">
      <v-flex xs4>
        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
      </v-flex>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-btn fab medium color="fdaMed" top right absolute @click="dialog=true">
        <v-icon medium color="fdaSilver">add</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
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
                  <v-text-field v-model="editedItem.declared_capital" label="Declared Capital"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="close">Cancel</v-btn>
            <v-btn color="success" @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog1" max-width="800px">
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
                <v-flex xs12 sm4 md4>
                  <span class="text-xs-center">Declared Capital</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.declared_capital}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Created By</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.created_by}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Created Date</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.date_created}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Modified By</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.modified_by}}</v-card-text>
                </v-flex>
                 <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Modified Date</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.modified_date}}</v-card-text>
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
    <v-data-table :headers="headers" :items="product" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.declared_capital }}</td>
        <td>{{ props.item.created_by }}</td>
        <td>{{ props.item.date_created }}</td>
        <td>{{ props.item.modified_by }}</td>
        <td>{{ props.item.modified_date }}</td>
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
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data: () => ({

    products:{},

    dialog: false,
    dialog1: false,
    search: "",
    headers: [
      { text: "Declared Capital", value: "declared_capital" },
      { text: "Created By", value: "created_by" },
      { text: "Created Date", value: "date_created" },
      { text: "Modified By", value: "modified_by" },
      { text: "Modified Date", value: "modified_date" },
      { text: "Actions", value: "name", sortable: false }
    ],
    product: [],
    editedIndex: -1,
    editedItem: {
      declared_capital: "250K and Below",
      created_by: "Vince",
      date_created: "January 05, 2018, 11:50 AM",
      modified_by: "Belo",
      modified_date: "December 06, 2018, 11:50 AM"
    },
    defaultItem: {
      declared_capital: "",
      created_by: "Vince",
      date_created: "February 08, 2018, 11:50 AM",
      modified_by: "Belo",
      modified_date: "December 07, 2018, 11:50 AM"
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();

    this.$store.dispatch("GET_PRODUCTS").then(result =>{
        console.log(JSON.stringify("###############################" + this.$store.state.reference_tables.products));
    this.products = this.$store.state.reference_tables.products
    console.log(JSON.stringify("###############################" + this.products));
    });

  },

  methods: {
    initialize() {
      this.product = [
        {
          declared_capital: "500K to Below 1M",
          created_by: "Vince",
          date_created: "March 06, 2018, 11:50 AM",
          modified_by: "Belo",
          modified_date: "December 08, 2018, 11:50 AM"
        },
        {
          declared_capital: "5M to Below 5M",
          created_by: "Vince",
          date_created: "April 07, 2018, 11:50 AM",
          modified_by: "Belo",
          modified_date: "December 09, 2018, 11:50 AM"
        },
        {
          declared_capital: "10M to Below 20M",
          created_by: "Vince",
          date_created: "May 08, 2018, 11:50 AM",
          modified_by: "Belo",
          modified_date: "December 10, 2018, 11:50 AM"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.product.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    viewItem(item) {
      this.editedIndex = this.product.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog1 = true;
    },

    close() {
      this.dialog = false;
      this.dialog1 = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.product[this.editedIndex], this.editedItem);
      } else {
        this.product.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style>
</style>
