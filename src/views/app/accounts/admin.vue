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
                  <v-text-field v-model="new_admin.first_name" label="Approver Name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="new_admin.username" label="Username"></v-text-field>
                </v-flex>
                 <v-flex xs12>
                  <v-text-field v-model="new_admin.password" label="Password"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="new_admin.email" label="Email Address"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="new_admin.group"
                    :disabled="isUpdating"
                    :items="groups_items"
                    box
                    chips
                    label="Group name"
                    item-text="name"
                    item-value="_id"
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
                  <v-autocomplete
                    v-model="role"
                    :disabled="isUpdating"
                    :items="roles"
                    box
                    chips
                    label="Role name"
                    item-text="name"
                    item-value="name"
                  >
                    <template slot="selection" slot-scope="data">
                      <v-chip
                        :selected="data.selected"
                        close
                        class="chip--select-multi"
                        @input="remove(data.item)"
                      >{{ rol(data.item.name) }}</v-chip>
                    </template>
                    <template slot="item" slot-scope="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="rol(data.item.name)"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
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
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Approver Name</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_admin.name}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Group Name</span>
                  <v-divider></v-divider>
                  <v-card-text>{{ group_details(new_admin.group) }}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Username</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_admin.username}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Status</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_admin.status}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Email Address</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_admin.email}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Roles</span>
                  <v-divider></v-divider>
                  <v-card-text>{{rol(new_admin.role)}}</v-card-text>
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
    <v-data-table :headers="headers" :items="admins" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.first_name }}</td>
        <td>{{ props.item.last_name }}</td>
        <td>{{ group_details(props.item.group) }}</td>
        <td>{{ props.item.status }}</td>
        <td>{{ props.item.username }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ rol(props.item.role) }}</td>
        <!-- <td>{{ props.item.created_by }}</td>
        <td>{{ formatDate(props.item.date_created) }}</td>
        <td>{{ formatDate(props.item.date_modified) }}</td> -->
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
    groups: {},
    groups_items: [],
    new_admin: {},
    modified_admin: {},
    dialog: false,
    dialogView: false,
    isUpdating: false,
    search: "",
    role: "",
    roles: [{name:"0"}, {name:"1"}],
    headers: [
      {
        text: "Approver Name",
        align: "left",
        sortable: "true",
        value: "name"
      },
      {
        text: "Last name",
        align: "left",
        sortable: "true",
        value: "last_name"
      },
      {
        text: "Group Name",
        align: "left",
        sortable: "true",
        value: "groups"
      },
      {
        text: "Status",
        align: "left",
        sortable: "true",
        value: "status"
      },
      {
        text: "Username",
        align: "left",
        sortable: "true",
        value: "username"
      },
      {
        text: "Email",
        align: "left",
        sortable: "true",
        value: "email"
      },
      {
        text: "Role",
        align: "left",
        value: "role"
      },
      {
        text: "Action",
        value: "editStatus"
      }
    ],
    group: [],
    admins: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      approver: "",
      group: "",
      role: "",
      date_created: "",
      date_modified: ""
    },
    defaultItem: {
      name: ""
    }
  }),

  computed: {
    formTitle() {
      return this.mode === 0 ? "Add Approver" : "Edit Approver";
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
      this.$store
        .dispatch("GET_ADMIN")
        .then(result => {
          this.admins = this.$store.state.admin_tables.admins;
          return this.$store.dispatch("GET_GROUP");
        })
        .then(result => {
          // GET group data
          this.groups_items = this.$store.state.group_table.groups;
        });
    },
    group_details(group_id) {
      return this.getGroup(group_id) ? this.getGroup(group_id).name : "";
    },
    remove(item) {
      const index = this.group.indexOf(item.name);
      if (index >= 0) this.group.splice(index, 1);
    },
    addItem() {
      this.mode = 0; // Create
      this.new_admin = {}; // holds the filled up item
      this.dialog = true;
    },
    editItem(item) {
      this.mode = 1; // Edit
      this.new_admin = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },

    viewItem(item) {
      this.new_admin = item;
      this.dialogView = true;
    },

    close() {
      this.dialog = false;
      this.dialogView = false;
      this.new_admin = {};
    },
    submit() {
      this.$store.dispatch("ADD_ADMIN", this.new_admin).then(result => {
        console.log("added:task: " + JSON.stringify(result));
        this.init();
        this.close();
      });
    },
    save() {
      console.log('###########edited:approver: ' + JSON.stringify(this.new_admin.role));
      this.$store.dispatch("EDIT_ADMIN", this.new_admin).then(result => {
        
        console.log("edited:task: " + JSON.stringify(result));
        this.init();
        this.close();
      });
    }
  }
};
</script>
<style>
</style>
