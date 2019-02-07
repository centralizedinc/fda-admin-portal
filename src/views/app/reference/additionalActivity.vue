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
                  <v-select
                    v-model="select1"
                    :hint="`${select1.state1}`"
                    :items="items1"
                    item-text="state1"
                    label="Product Type"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                  <v-select
                    v-model="select"
                    :hint="`${select.state}`"
                    :items="items"
                    item-text="state"
                    label="Primary Type"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.additional_activity" label="Additional Activity"></v-text-field>
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
                  <span class="text-xs-center">Additional Activity</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.additional_activity}}</v-card-text>
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
    <v-data-table :headers="headers" :items="primary" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.additional_activity }}</td>
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
    select: { state: "Product Type" },
    select1: { state1: "Primary Type" },
    items1: [
      { state1: "Cosmetics" },
      { state1: "Drugs" },
      { state1: "Food" },
      { state1: "Toy and Child Care Article" },
      { state1: "Household/Urban Pesticide" },
      { state1: "Medical Device" },
      { state1: "ENNDS" }
    ],
    items: [
      { state: "Manufacturer" },
      { state: "Packer/Repacker" },
      { state: "Trader" },
      { state: "Distributor" },
      { state: "Iodize Salt Repacker" },
      { state: "Iodize Salt Trader" },
      { state: "Iodize Salt Distributor" },
      { state: "Drugstore" },
      { state: "Retail Outlet for Non-prescription Drug" },
      { state: "Contract Research Organization" },
      { state: "Sponsor" }
    ],
    headers: [
      { text: "Additional Activity", value: "additional_activity" },
      { text: "Created By", value: "created_by" },
      { text: "Created Date", value: "date_created" },
      { text: "Modified By", value: "modified_by" },
      { text: "Modified Date", value: "modified_date" },
      { text: "Actions", value: "name", sortable: false }
    ],
    primary: [],
    editedIndex: -1,
    editedItem: {
      additional_activity: "Exporter of own product",
      created_by: "Vince",
      date_created: "November 06, 2018, 11:50 AM",
      modified_by: "Belo",
      modified_date: "December 06, 2018, 11:50 AM"
    },
    defaultItem: {
      product_type: "Food",
      primary_type: "Manufacturer",
      additional_activity: "",
      created_by: "Vince",
      date_created: "November 06, 2018, 11:50 AM",
      modified_by: "Belo",
      modified_date: "December 06, 2018, 11:50 AM"
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
      this.primary = [
        {
          additional_activity: "Exporter of own product",
          created_by: "Vince",
          date_created: "November 06, 2018, 11:50 AM",
          modified_by: "Belo",
          modified_date: "December 06, 2018, 11:50 AM"
        },
        {
          additional_activity: "Importer of Raw Materials for own use",
          created_by: "Vince",
          date_created: "November 06, 2018, 11:50 AM",
          modified_by: "Belo",
          modified_date: "December 06, 2018, 11:50 AM"
        },
        {
          additional_activity: "Wholesaler of own product",
          created_by: "Vince",
          date_created: "November 06, 2018, 11:50 AM",
          modified_by: "Belo",
          modified_date: "December 06, 2018, 11:50 AM"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.primary.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    viewItem(item) {
      this.editedIndex = this.primary.indexOf(item);
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
        Object.assign(this.primary[this.editedIndex], this.editedItem);
      } else {
        this.primary.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style>
</style>
