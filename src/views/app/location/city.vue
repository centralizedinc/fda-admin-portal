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
                    v-model="new_city.province"
                    :disabled="isUpdating"
                    :items="city_items"
                    box
                    chips
                    label="Province"
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
                <v-flex xs12>
                  <v-text-field v-model="new_city.name" label="Name"></v-text-field>
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
                <v-flex xs12 sm4 md6>
                  <span class="text-xs-center">City Name</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_city.name}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md6>
                  <span class="text-xs-center">Created By</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_city.created_by}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md6>
                  <span class="text-xs-center">Created Date</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_city.date_created}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md6>
                  <span class="text-xs-center">Modified By</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_city.date_modified}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md6>
                  <span class="text-xs-center">Modified Date</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_city.date_modified}}</v-card-text>
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
    <v-data-table :headers="headers" :items="city" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
         <td>{{ props.item.name }}</td>
        <td>{{ props.item.created_by }}</td>
        <td>{{ props.item.date_created }}</td>
        <td>{{ props.item.modified_by }}</td>
        <td>{{ props.item.date_modified }}</td>
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
    province: {},
    city_items: [],
    new_city: {},
    modified_city: {},
    dialog: false,
    dialogView: false,
    search: "",
    headers: [
      {
        text: "City Name",
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
        text: "Created Date",
        align: "left",
        value: "date_created"
      },
      {
        text: "Modified By",
        align: "left",
        value: "modified_by"
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
    city: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      province:"",
      name: "",
      created_by: "",
      date_created: "",
      modified_by: "",
      date_modified: ""
    },
    defaultItem: {
      name: "",
    }
  }),

  computed: {
    formTitle() {
      return this.mode === 0 ? "Add City" : "Edit City";
    }
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      this.$store.dispatch("GET_CITY").then(result => {
        this.city = this.$store.state.regional_tables.city;
      });
    },
    addItem() {
      this.mode = 0; // Create
      this.new_city = {}; // holds the filled up item
      this.dialog = true;
    },
    editItem(item) {
      this.mode = 1; // Edit
      this.new_city = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },

    viewItem(item) {
      this.new_city = item;
      this.dialogView = true;
    },

    close() {
      this.dialog = false;
      this.dialogView = false;
      this.new_city = {};
    },
    submit() {
      this.$store.dispatch("ADD_CITY", this.new_city).then(result => {
        console.log("added:city: " + JSON.stringify(result));
        this.init();
        this.close();
      });
    },
    save() {
      this.$store.dispatch("EDIT_CITY", this.new_city).then(result => {
        console.log("edited:city: " + JSON.stringify(result));
        this.init();
        this.close();
      });
    }
  }
};
</script>
<style>
</style>
