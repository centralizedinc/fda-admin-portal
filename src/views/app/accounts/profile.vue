<template>
  <div>
    <v-layout row wrap>
      <v-flex 12>
        <v-card>
          <v-card-text>
            <v-text-field
              label="First Name"
              v-model="admin.first_name"
              required
              :rules="[() => !!first_name || 'This field is required']"
            ></v-text-field>
            <v-text-field
              label="Last Name"
              v-model="admin.last_name"
              required
              :rules="[() => !!last_name || 'This field is required']"
            ></v-text-field>
            <v-text-field
              label="Username"
              v-model="admin.username"
              required
              :rules="[() => !!username || 'This field is required']"
            ></v-text-field>
            <v-text-field
              label="Email Address"
              v-model="admin.email"
              required
              :rules="[() => !!email || 'This field is required']"
            ></v-text-field>
            <v-flex xs12>
              <v-autocomplete
                v-model="admin.task"
                :disabled="isUpdating"
                :items="tasks_items"
                box
                chips
                label="Task name"
                item-text="name"
                item-value="_id"
              >
                <template slot="selection" slot-scope="data">
                  <v-chip
                    :selected="data.selected"
                    close
                    class="chip--select-multi"
                    @input="removeTask(data.item)"
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
                v-model="admin.group"
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
                    @input="removeGroup(data.item)"
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
                v-model="admin.role"
                :disabled="isUpdating"
                :items="roles_items"
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
                    @input="removeRole(data.item)"
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
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn @click="close">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data: () => ({
    groups: {},
    groups_items: [],
    tasks_items: [],
    new_admin: {},
    modified_admin: {},
    dialog: false,
    dialogView: false,
    isUpdating: false,
    search: "",
    role: [],
    roles_items: [{ name: "Approver" }, { name: "Admin" }],
    group: [],
    admin: [],
    tasks: [],
    first_name: null,
    last_name: null,
    username: null,
    email: null
  }),

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
      console.log("##########STORE" + this.$store.state.user_session.user._id)
      this.$store
        .dispatch("GET_PROFILE", this.$store.state.user_session.user._id)
        .then(result => {
          this.admin = result;
          console.log("LOGS GET PROFILE" + JSON.stringify(this.admin))
          return this.$store.dispatch("GET_GROUP");
        })
        .then(result => {
          // GET group data
          this.groups_items = this.$store.state.group_table.groups;
        });
      // Task
      this.$store.dispatch("GET_TASK").then(result => {
        this.tasks_items = this.$store.state.task_tables.tasks;
      });
    },
    group_details(group_id) {
      return this.getGroup(group_id) ? this.getGroup(group_id).name : "";
    },
    remove(item) {
      const index = this.group.indexOf(item.name);
      if (index >= 0) this.group.splice(index, 1);
    },
    editItem(item) {
      this.mode = 1; // Edit
      this.new_admin = JSON.parse(JSON.stringify(item));
    },

    close() {
      this.new_admin = {};
    },
    submit() {
      // console.log('###########edited:approver: ' + JSON.stringify(this.new_admin));
      this.$store.dispatch("EDIT_PROFILE", this.new_admin).then(result => {
        console.log("edited:profile: " + JSON.stringify(result));
        this.init();
        this.close();
      });
    }
  }
};
</script>
<style>
</style>
