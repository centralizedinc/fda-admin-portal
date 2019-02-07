<template>
  <div>
    <v-toolbar flat color="white">
      <v-flex xs4>
        <v-text-field
          hide-details
          prepend-icon="search"
          single-line
          label="Search"
          v-model="search"
        ></v-text-field>
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
                <v-flex xs12 sm6 md3>
                  <v-text-field v-model="editedItem.region" label="Region"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md3>
                  <v-text-field v-model="editedItem.province" label="Province"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md3>
                  <v-text-field v-model="editedItem.cities" label="City"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md3>
                  <v-text-field v-model="editedItem.zipcode" label="Zipcode"></v-text-field>
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
      <v-dialog v-model="dialog1" max-width="800px">
        <v-card>
          <v-card-title
            primary-title
            class="headline"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="headline">View Location</span>
          </v-card-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md3>
                  <span class="text-xs-center">Region</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.region}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm6 md3>
                  <span class="text-xs-center">Province</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.province}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm6 md3>
                  <span class="text-xs-center">City</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.cities}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm6 md3>
                  <span class="text-xs-center">Zipcode</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.zipcode}}</v-card-text>
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
    </v-toolbar>
    <v-data-table :headers="headers" :items="location" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.region }}</td>
        <td>{{ props.item.province }}</td>
        <td>{{ props.item.cities }}</td>
        <td>{{ props.item.zipcode }}</td>
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
      { text: "Region", value: "region" },
      { text: "Province", value: "province" },
      { text: "City", value: "cities" },
      { text: "Zipcode", value: "zipcode" },
      { text: "Actions", value: "name", sortable: false }
    ],
    location: [],
    editedIndex: -1,
    editedItem: {
      region: "NCR",
      province: "Manila",
      cities: "Quezon City",
      zipcode: "1078"
    },
    defaultItem: {
      region: "",
      province: "",
      cities: "",
      zipcode: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add location" : "Edit Location";
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
      this.location = [
        {
          region: "CALABARZON-4A",
          province: "Rizal",
          cities: "Antipolo City",
          zipcode: "1860"
        },
        {
          region: "CALABARZON-4B",
          province: "Bicol",
          cities: "Antikan City",
          zipcode: "1870"
        },
        {
          region: "NCR",
          province: "Manila",
          cities: "Quezon City",
          zipcode: "1078"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.location.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    viewItem(item) {
      this.editedIndex = this.location.indexOf(item);
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
        Object.assign(this.location[this.editedIndex], this.editedItem);
      } else {
        this.location.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style>
</style>
