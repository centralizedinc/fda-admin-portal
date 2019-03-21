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
                  <v-text-field v-model="new_admin.first_name" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="new_admin.last_name" label="Last Name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="new_admin.username" label="Username"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="new_admin.email" label="Email Address"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    multiple
                    v-model="new_admin.group"
                    :disabled="isUpdating"
                    :items="groups_items"
                    color="blue-grey lighten-2"
                    label="Group name"
                    item-text="name"
                    item-value="_id"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    :append-icon="new_password ? 'visibility' : 'visibility_off'"
                    :type="new_password ? 'text' : 'password'"
                    label="Password"
                    @click:append="new_password = !new_password"
                    v-model="new_admin.password"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="new_admin.role"
                    :disabled="isUpdating"
                    :items="roles"
                    label="Role name"
                    item-text="label"
                    item-value="value"
                  >
                    <template slot="item" slot-scope="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.label"></v-list-tile-title>
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
            <span class="headline">Admin Details</span>
          </v-card-title>
          <v-divider class="mx-3" inset vertical></v-divider>
          <v-card-text>
            <v-container grid-list-xl>
              <v-layout row wrap align-center justify-center fill-height>
                <!-- <v-flex xs6> -->
                <v-flex xs6>
                  <label class="title">Admin Name:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_admin.first_name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Group Name:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getGroup(new_admin.group)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Username:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_admin.username}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Status:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_admin.status}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Email:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_admin.email}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Roles:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{rol(new_admin.role)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_admin.created_by).first_name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Created:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_admin.date_created)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Modified By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_admin.created_by).last_name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Modified:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_admin.date_modified)}}</label>
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
        <td>{{ getGroup(props.item.group) }}</td>
        <td>{{ props.item.status }}</td>
        <td>{{ props.item.username }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ rol(props.item.role) }}</td>
        <td>{{ getAdmin(props.item.created_by).last_name }}</td>
        <td>{{ formatDate(props.item.date_created) }}</td>
        <td>{{ getAdmin(props.item.created_by).first_name }}</td>
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
    groups: {},
    groups_items: [],
    new_admin: {},
    new_password: "",
    modified_admin: {},
    dialog: false,
    dialogView: false,
    isUpdating: false,
    search: "",
    role: "",
    roles: [
      { value: "0", label: "Admin" },
      { value: "1", label: "Approver" },
      { value: "2", label: "Encoder" }
    ],
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: "true",
        value: "first_name"
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
        value: "created_by"
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
    admins: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      first_name: "",
      group: "",
      role: "",
      username: "",
      new_password: "",
      email: ""
    },
    defaultItem: {
      name: ""
    }
  }),

  computed: {
    formTitle() {
      return this.mode === 0 ? "Add Admin" : "Edit Admin";
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
          console.log(
            "JSON.stringify(this.groups_items) :",
            JSON.stringify(this.groups_items)
          );
        });
    },
    getGroup(group_list) {
      console.log("GROUP_LIST: " + JSON.stringify(group_list));
      var list = "";
      if (group_list) {
        group_list.forEach(item => {
          var match = this.groups_items.find(r => {
            return r._id.toString() === item;
          });
          list = list + match.name;
        });
      }
      return list;
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
      console.log("GROUP: " + JSON.stringify(item.group));
      this.mode = 1; // Edit
      this.new_admin = item;
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
        console.log("added:admin: " + JSON.stringify(result));
        this.init();
        this.$notify({
          message: "You have successfully created a new Admin",
          icon: "check_circle",
          color: "primary"
        });
        this.close();
      });
    },
    save() {
      console.log("###########EDITED:ROLE: " + JSON.stringify(this.new_admin));
      this.$store.dispatch("EDIT_ADMIN", this.new_admin).then(result => {
        console.log("edited:admin: " + JSON.stringify(result));
        this.init();
        this.$notify({
          message: "You have successfully edited an Admin",
          color: "success",
          icon: "check_circle"
        });
        this.close();
      });
    }
  }
};
</script>
<style>
</style>
