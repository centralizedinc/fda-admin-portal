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
                  <v-text-field label="Group Name" v-model="new_group.name"></v-text-field>
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
                  <span class="text-xs-center">Group Name</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_group.name}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Status</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_group.status}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Created By</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_group.created_by}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Created Date</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_group.date_created}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Modified Date</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_group.date_modified}}</v-card-text>
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
    <v-data-table :headers="headers" :items="groups" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.status }}</td>
        <td>{{ props.item.created_by }}</td>
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
    new_group: {},
    modified_group: {},
    dialog: false,
    dialogView: false,
    isUpdating: false,
    search: "",
    headers: [
      {
        text: "Group Name",
        align: "left",
        sortable: "true",
        value: "name"
      },
      {
        text: "Status",
        align: "left",
        sortable: "true",
        value: "status"
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
        text: "Modified Date",
        align: "left",
        value: "date_modified"
      },
      {
        text: "Action",
        value: "editStatus"
      }
    ],
    groups: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      status: "",
      created_by: "Kris",
      date_created: "",
      date_modified: ""
    },
    defaultItem: {
      name: "",
      created_by: "Kris"
    }
  }),

  computed: {
    formTitle() {
      return this.mode === 0 ? "Add Group" : "Edit Group";
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
      this.$store.dispatch("GET_GROUP").then(result => {
        this.groups = this.$store.state.group_table.groups;
      });
    },
    addItem() {
      this.mode = 0; // Create
      this.new_group = {}; // holds the filled up item
      this.dialog = true;
    },
    editItem(item) {
      this.mode = 1; // Edit
      this.new_group = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },

    viewItem(item) {
      this.new_group = item;
      this.dialogView = true;
    },

    close() {
      this.dialog = false;
      this.dialogView = false;
      this.new_group = {};
    },
    submit() {
      this.$store.dispatch("ADD_GROUP", this.new_group).then(result => {
        console.log("added:region: " + JSON.stringify(result));
        this.init();
        this.close();
      });
    },
    save() {
      this.$store.dispatch("EDIT_GROUP", this.new_group).then(result => {
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
