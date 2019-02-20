<template>
  <div>
    <v-toolbar flat color="white">
      <v-flex xs4>
        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
      </v-flex>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-btn fab medium color="fdaMed" top right absolute @click="addItem">
        <v-icon medium color="success">add</v-icon>
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
                  <v-text-field label="Region Code" v-model="new_region.name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Region Name" v-model="new_region.region_code"></v-text-field>
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
                <v-flex xs12 sm4 md3>
                  <span class="text-xs-center">Region Name</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_region.name}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md3>
                  <span class="text-xs-center">Region Code</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_region.region_code}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md3>
                  <span class="text-xs-center">Created Date</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_region.date_created}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md3>
                  <span class="text-xs-center">Modified Date</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_region.date_modified}}</v-card-text>
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
    <!-- TABLE -->
    <v-data-table :headers="headers" :items="regions" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.region_code }}</td>
        <td>{{ formatDate(props.item.date_created) }}</td>
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
    mode: 0, // 0 - create, 1 - edit
    region_code: {},
    new_region: {},
    modified_region: {},
    dialog: false,
    dialogView: false,
    search: "",
    headers: [
      {
        text: "Region Name",
        align: "left",
        sortable: "true",
        value: "name"
      },
      {
        text: "Region Code",
        align: "left",
        sortable: "true",
        value: "region_code"
      },
      {
        text: "Created Date",
        align: "left",
        value: "date_created"
      },
      {
        text: "Modified Date",
        align: "left",
        value: "date_modified"
      },
      {
        text: "Action",
        value: "editStatus"
      }
    ],
    regions: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      region_code: "",
      date_created: "",
      date_modified: ""
    },
    defaultItem: {
      name: "",
      region_code: ""
    }
  }),

  computed: {
    formTitle() {
      return this.mode === 0 ? "Add Region" : "Edit Region";
    }
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      this.$store.dispatch("GET_REGION").then(result => {
        this.regions = this.$store.state.regional_tables.regions;
      });
    },
    addItem() {
      this.mode = 0; // Create
      this.new_region = {}; // holds the filled up item
      this.dialog = true;
    },
    editItem(item) {
      this.mode = 1; // Edit
      this.new_region = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },

    viewItem(item) {
      this.new_region = item;
      this.dialogView = true;
    },

    close() {
      this.dialog = false;
      this.dialogView = false;
      this.new_region = {};
    },
    submit() {
      this.$store.dispatch("ADD_REGION", this.new_region).then(result => {
        console.log("added:region: " + JSON.stringify(result));
        this.init();
        this.close();
      });
    },
    save() {
      this.$store.dispatch("EDIT_REGION", this.new_region).then(result => {
        console.log("edited:region: " + JSON.stringify(result));
        this.init();
        this.close();
      });
    }
  }
};
</script>
<style>
</style>
