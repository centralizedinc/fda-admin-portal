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
                  <v-text-field
                    label="Region Name"
                    v-model="new_region.name"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Region Code"
                    v-model="new_region.region_code"
                    :rules="[rules.required]"
                  ></v-text-field>
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
                  <label class="title">Region Name:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_region.name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Region Code:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_region.region_code}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Created By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_region.created_by).first_name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Created:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_region.date_created)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Modified By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_region.modified_by)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Modified:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_region.date_modified)}}</label>
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
    region_code: {},
    new_region: {},
    modified_region: {},
    dialog: false,
    dialogView: false,
    search: "",
    selectedIndex: -1,
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
    },
    rules: {
      required: v => !!v || "This is a required field"
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
    isEmpty(str) {
      return !str || str === null || str === "";
    },
    init() {
      this.$store.dispatch("GET_REGION").then(result => {
        this.regions = this.$store.state.regional_tables.regions;
      });
    },
    addItem() {
      this.selectedIndex = -1;
      this.mode = 0; // Create
      this.new_region = {}; // holds the filled up item
      this.dialog = true;
    },
    editItem(item, index) {
      this.mode = 1; // Edit
      this.selectedIndex = index;
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
    validate() {
      var check = true;
      if (
        this.isEmpty(this.new_region.name) ||
        this.isEmpty(this.new_region.region_code)
      ) {
        this.$notify({
          message: "Please fill up required fields",
          color: "error"
        });
        return false;
      } else {
        for (let i = 0; i < this.regions.length; i++) {
          if (
            this.selectedIndex != i &&
            this.regions[i].region_code &&
            this.regions[i].name &&
            this.regions[i].region_code.toLowerCase() ===
            this.new_region.region_code.toLowerCase() &&
            this.regions[i].name.toLowerCase() ===
            this.new_region.name.toLowerCase()
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
        this.$store.dispatch("ADD_REGION", this.new_region).then(result => {
          console.log("added:region: " + JSON.stringify(result));
          this.init();
          this.$notify({
            message: "You have successfully created a new Region",
            icon: "check_circle",
            color: "primary"
          });
          this.close();
        });
      }
    },

    save() {
      if (this.validate()) {
        // console.log('###########edited:province: ' + JSON.stringify(this.new_province));
        this.$store.dispatch("EDIT_REGION", this.new_region).then(result => {
          console.log("edited:region: " + JSON.stringify(result));
          this.init();
          this.$notify({
            message: "You have successfully edited a Region",
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
