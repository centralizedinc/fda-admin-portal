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
                    :items="provinces_items"
                    label="Province"
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
                  <label class="title">City/Municipility:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_city.name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Region Name:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{region_details(new_city.province)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Province Name:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{province_details(new_city.province)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Created By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_city.date_created}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Created:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_city.date_created)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Modified By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_city.date_created}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Modified:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_city.date_created)}}</label>
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
    <v-data-table :headers="headers" :items="cities" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ region_details(props.item.province) }}</td>
        <td>{{ province_details(props.item.province) }}</td>
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
    mode: 0, // 0 - create, 1 - edit
    regions: {},
    provinces_items: [],
    new_city: {},
    modified_city: {},
    dialog: false,
    dialogView: false,
    isUpdating: false,
    search: "",
    headers: [
      {
        text: "City/Municipility",
        align: "left",
        sortable: "true",
        value: "name"
      },
      {
        text: "Region Name",
        align: "left",
        sortable: "true",
        value: "regions"
      },
      {
        text: "Province Name",
        align: "left",
        sortable: "true",
        value: "provinces"
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
    region: [],
    provinces: [],
    cities: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      province: "",
      region: "",
      created_by: "",
      date_created: "",
      modified_by: "",
      date_modified: ""
    },
    defaultItem: {
      name: ""
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
    region_details(province_id) {
      var region_id = this.getProvince(province_id)
        ? this.getProvince(province_id).region
        : "";
      return this.getRegion(region_id) ? this.getRegion(region_id).name : "";
    },
    province_details(province_id) {
      return this.getProvince(province_id)
        ? this.getProvince(province_id).name
        : "";
    },
    isEmpty(str) {
      return !str || str === null || str === "";
    },
    init() {
      this.$store
        .dispatch("GET_CITY")
        .then(result => {
          this.cities = this.$store.state.regional_tables.city;
          console.log("######cities: " + JSON.stringify(this.cities));
          return this.$store.dispatch("GET_PROVINCE");
        })
        .then(result => {
          this.provinces_items = this.$store.state.regional_tables.provinces;
          return this.$store.dispatch("GET_REGION");
        });
    },
    removeProvince(item) {
      const index = this.province.indexOf(item.name);
      if (index >= 0) this.province.splice(index, 1);
    },
    initialize() {
      this.cities = {};
      this.provinces = [];
      this.regions = [];
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
        this.$notify({
          message: "You have successfully created a new City",
          icon: "check_circle",
          color: "primary"
        });
        this.close();
      });
    },
    save() {
      this.$store.dispatch("EDIT_CITY", this.new_city).then(result => {
        console.log("edited:city: " + JSON.stringify(result));
        this.init();
        this.$notify({
          message: "You have successfully edited a City",
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
