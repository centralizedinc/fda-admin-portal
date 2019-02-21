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
                  <v-text-field v-model="new_task.name" label="Task Name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="new_task.group"
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
                  <span class="text-xs-center">Task Name</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_task.name}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Group Name</span>
                  <v-divider></v-divider>
                  <v-card-text>{{ group_details(new_task.group) }}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Created By</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_task.created_by}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Created Date</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_task.date_created}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <span class="text-xs-center">Modified Date</span>
                  <v-divider></v-divider>
                  <v-card-text>{{new_task.date_modified}}</v-card-text>
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
    <v-data-table :headers="headers" :items="tasks" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ task_detail(props.item.approval) }}</td>
        <td>{{ task_detail(props.item.denied) }}</td>
        <td>{{ task_details(props.item.recommends) }}</td>
        <!-- <td>{{ props.item.isCompliance }}</td> -->
        <td>{{props.item.start_process }}</td>
        <td>{{props.item.end_process }}</td>
        <td>{{ (props.item.groups) }}</td>
        <!-- <td>{{ props.item.created_by }}</td> -->
        <!-- <td>{{ formatDate(props.item.date_created) }}</td>
        <td>{{ formatDate(props.item.date_modified) }}</td>-->
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
    new_task: {},
    modified_task: {},
    dialog: false,
    dialogView: false,
    isUpdating: false,
    search: "",
    headers: [
      {
        text: "Task",
        align: "left",
        sortable: "true",
        value: "tasks"
      },
      {
        text: "Approval",
        align: "left",
        sortable: "true",
        value: "approval"
      },
      {
        text: "Denied",
        align: "left",
        sortable: "true",
        value: "denied"
      },
      {
        text: "Recommends",
        align: "left",
        sortable: "true",
        value: "recommends"
      },
      // {
      //   text: "Compliance",
      //   align: "left",
      //   sortable: "true",
      //   value: "isCompliance"
      // },
      {
        text: "Start Process",
        align: "left",
        sortable: "true",
        value: "start_process"
      },
      {
        text: "End Process",
        align: "left",
        sortable: "true",
        value: "end_process"
      },
      {
        text: "Group",
        align: "left",
        sortable: "true",
        value: "groups"
      },
      // {
      //   text: "Created By",
      //   align: "left",
      //   value: "created_by"
      // },
      // {
      //   text: "Created Date",
      //   align: "left",
      //   value: "date_created"
      // },
      // {
      //   text: "Modified Date",
      //   align: "left",
      //   value: "date_modified"
      // },
      {
        text: "Action",
        value: "editStatus"
      }
    ],
    group: [],
    tasks: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      task: "",
      group: "",
      date_created: "",
      date_modified: ""
    },
    defaultItem: {
      name: ""
    }
  }),

  computed: {
    formTitle() {
      return this.mode === 0 ? "Add Task" : "Edit Task";
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
        .dispatch("GET_TASK")
        .then(result => {
          this.tasks = this.$store.state.task_tables.tasks;
          return this.$store.dispatch("GET_GROUP");
        })
        .then(result => {
          // GET region data
          this.groups_items = this.$store.state.group_table.groups;
        });
    },
    group_details(group_id) {
    return this.getGroup(group_id) ? this.getGroup(group_id).name : "";
    },
    task_details(task_id) {
      var tasksTable = [];
      task_id.forEach(taskName => {
        tasksTable.push(
          this.getTask(taskName) ? this.getTask(taskName).name : ""
        );
      });
      return tasksTable.toString();
    },
    task_detail(task_id) {
      return this.getTask(task_id) ? this.getTask(task_id).name : "";
    },
    remove(item) {
      const index = this.group.indexOf(item.name);
      if (index >= 0) this.group.splice(index, 1);
    },
    addItem() {
      this.mode = 0; // Create
      this.new_task = {}; // holds the filled up item
      this.dialog = true;
    },
    editItem(item) {
      this.mode = 1; // Edit
      this.new_task = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },

    viewItem(item) {
      this.new_task = item;
      this.dialogView = true;
    },

    close() {
      this.dialog = false;
      this.dialogView = false;
      this.new_task = {};
    },
    submit() {
      this.$store.dispatch("ADD_TASK", this.new_task).then(result => {
        console.log("added:task: " + JSON.stringify(result));
        this.init();
        this.close();
      });
    },
    save() {
      // console.log('###########edited:province: ' + JSON.stringify(this.new_province));
      this.$store.dispatch("EDIT_TASK", this.new_task).then(result => {
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
