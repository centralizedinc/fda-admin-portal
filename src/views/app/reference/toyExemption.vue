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
                    label="Toy Exemption"
                    v-model="new_toy_exemption.name"
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
                  <label class="title">Toy Exemption:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_toy_exemption.name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Created By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_toy_exemption.created_by).first_name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Created:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_toy_exemption.date_created)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Modified By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_toy_exemption.modified_by)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Modified:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_toy_exemption.date_modified)}}</label>
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
    <v-data-table :headers="headers" :items="toy_exemption" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
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
    new_toy_exemption: {},
    modified_toy_exemption: {},
    dialog: false,
    dialogView: false,
    search: "",
    selectedIndex: -1,
    headers: [
      {
        text: "Toy Exemption",
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
    toy_exemption: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      date_created: "",
      date_modified: ""
    },
    defaultItem: {
      name: "",
    },
    rules: {
      required: v => !!v || "This is a required field"
    }
  }),

  computed: {
    formTitle() {
      return this.mode === 0 ? "Add Toy Exemption" : "Edit Toy Exemption";
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
      this.$store.dispatch("GET_TOY_EXEMPTION").then(result => {
        this.toy_exemption = this.$store.state.toy_exemption_tables.toy_exemption;
      });
    },
    addItem() {
      this.selectedIndex = -1;
      this.mode = 0; // Create
      this.new_toy_exemption = {}; // holds the filled up item
      this.dialog = true;
    },
    editItem(item, index) {
      this.mode = 1; // Edit
      this.selectedIndex = index;
      this.new_toy_exemption = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },

    viewItem(item) {
      this.new_toy_exemption = item;
      this.dialogView = true;
    },

    close() {
      this.dialog = false;
      this.dialogView = false;
      this.new_toy_exemption = {};
    },
    validate() {
      var check = true;
      if (
        this.isEmpty(this.new_toy_exemption.name)
      ) {
        this.$notify({
          message: "Please fill up required fields",
          color: "error"
        });
        return false;
      } else {
        for (let i = 0; i < this.toy_exemption.length; i++) {
          if (
            this.selectedIndex != i &&
            this.toy_exemption[i].name.toLowerCase() ===
            this.new_toy_exemption.name.toLowerCase()
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
        this.$store.dispatch("ADD_TOY_EXEMPTION", this.new_toy_exemption).then(result => {
          console.log("added:Company toy_exemption " + JSON.stringify(result));
          this.init();
          this.$notify({
            message: "You have successfully created a new toy exemption",
            icon: "check_circle",
            color: "primary"
          });
          this.close();
        });
      }
    },

    save() {
      if (this.validate()) {
        this.$store.dispatch("EDIT_TOY_EXEMPTION", this.new_toy_exemption).then(result => {
          console.log("edited:Company toy_exemption: " + JSON.stringify(result));
          this.init();
          this.$notify({
            message: "You have successfully edited a type of toy_exemption",
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
