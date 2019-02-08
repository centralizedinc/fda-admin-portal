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
                  <v-text-field v-model="editedItem.region_code" label="Region Code"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.region_name" label="Region Name"></v-text-field>
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
                <v-flex xs12 sm4 md3>
                  <span class="text-xs-center">Region Code</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.region_code}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md3>
                  <span class="text-xs-center">Region Name</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.region_name}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md3>
                  <span class="text-xs-center">Created By</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.created_by}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md3>
                  <span class="text-xs-center">Created Date</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.date_created}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md3>
                  <span class="text-xs-center">Modified By</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.modified_by}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md3>
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
        <td>{{ props.item.region_code }}</td>
        <td>{{ props.item.region_name }}</td>
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
    dialog: false,
    dialog1: false,
    search: "",
    headers: [
      { text: "Region Name", value: "region_code" },
      { text: "Region Code", value: "region_name" },
      { text: "Created By", value: "created_by" },
      { text: "Created Date", value: "date_created" },
      { text: "Modified By", value: "modified_by" },
      { text: "Modified Date", value: "modified_date" },
      { text: "Actions", value: "name", sortable: false }
    ],
    product: [],
    editedIndex: -1,
    editedItem: {
      region_code: "BICOL REGION",
      region_name: "REGION V",
      created_by: "Vince",
      date_created: "November 06, 2018, 11:50 AM",
      modified_by: "Belo",
      modified_date: "December 06, 2018, 11:50 AM"
    },
    defaultItem: {
      region_code: "",
      region_name: "",
      created_by: "Vince",
      date_created: "January 06, 2018, 05:50 AM",
      modified_by: "Belo",
      modified_date: "March 10, 2019, 11:50 AM"
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
  },

  methods: {
    initialize() {
      this.product = [
        {
          region_code: "BICOL REGION",
          region_name: "REGION V",
          created_by: "Vince",
          date_created: "November 06, 2018, 11:50 AM",
          modified_by: "Belo",
          modified_date: "December 06, 2018, 11:50 AM"
        },
        {
          region_code: "CAGAYAN VALLEY",
          region_name: "REGION II",
          created_by: "Vince",
          date_created: "October 06, 2018, 9:50 AM",
          modified_by: "Belo",
          modified_date: "November 10, 2018, 11:50 AM"
        },
        {
          region_code: "CALABARZON",
          region_name: "REGION IV-A",
          created_by: "Vince",
          date_created: "April 06, 2018, 11:50 AM",
          modified_by: "Belo",
          modified_date: "May 06, 2018, 11:50 AM"
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
