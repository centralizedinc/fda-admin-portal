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
                  <v-text-field v-model="new_task.name" :rules="[rules.required]" label="Task Name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="new_task.approval"
                    :rules="[rules.required]"
                    :disabled="isUpdating"
                    :items="tasks"
                    label="Approval"
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
                  <v-autocomplete
                    v-model="new_task.denied"
                    :rules="[rules.required]"
                    :disabled="isUpdating"
                    :items="tasks"
                    label="Denied"
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
                  <v-autocomplete
                    v-model="new_task.groups"
                    :rules="[rules.required]"
                    :disabled="isUpdating"
                    :items="groups"
                    color="blue-grey lighten-2"
                    label="Recommends"
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
                  <v-textarea
                    v-model="new_task.condition"
                    auto-grow
                    box
                    color="deep-purple"
                    label="Condition"
                    rows="1"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="new_task.groups"
                    :rules="[rules.required]"
                    :disabled="isUpdating"
                    :items="groups"
                    color="blue-grey lighten-2"
                    label="Group name"
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
                  <!-- check box -->
                  <v-flex xs>
                    <!-- <v-container fluid>
    <v-checkbox v-model="new_task.selected" value="start_process" :label="`Start Process`"></v-checkbox>
    <v-checkbox v-model="new_task.selected" value="end_process" :label="`End Process`"></v-checkbox>
                    </v-container>-->
                    <v-radio-group v-model="new_task.start_process" :rules="[rules.required]" row>
                      <v-radio label="Start Process" value="true"></v-radio>
                      <v-radio label="End Process" value="false"></v-radio>
                    </v-radio-group>
                  </v-flex>
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
                  <label class="title">Task Name:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_task.name}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Approval:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{task(new_task.approval)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Denied:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{task(new_task.denied)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Recommends:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_task.recommends}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Condition:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_task.condition}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Compliance:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_task.isCompliance}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Start Process:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{vIcon(new_task.start_process)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">End Process:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{vIcon(new_task.end_process)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Created By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_task.created_by)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Created:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_task.date_created)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Modified By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{getAdmin(new_task.modified_by)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Modified:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_task.date_modified)}}</label>
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
        <td>{{ task(props.item.approval) }}</td>
        <td>{{ task(props.item.denied) }}</td>
        <td>{{ getTasks(props.item.recommends) }}</td>
        <td>{{ vIcon(props.item.start_process) }}</td>
        <td>{{ vIcon(props.item.end_process) }}</td>
        <td>{{ getGroup(props.item.groups) }}</td>
        <td>{{ props.item.condition }}</td>
        <td>{{ props.item.isCompliance }}</td>
        <td>{{ getAdmin(props.item.created_by).last_name }}</td>
        <td>{{ formatDate(props.item.date_created) }}</td>
        <td>{{ getAdmin(props.item.modified_by).first_name }}</td>
        <td>{{ formatDate(props.item.date_modified) }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item, props.index)" flat icon color="primary">edit</v-icon>
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
    new_task: {
      start_process: false,
      end_process: false
    },
    modified_task: {},
    dialog: false,
    dialogView: false,
    isUpdating: false,
    search: "",
    tasks: [],
    selected: [],
    selectedIndex: -1, //
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
      {
        text: "Condition",
        align: "left",
        sortable: "true",
        value: "condition"
      },
      {
        text: "Compliance",
        align: "left",
        sortable: "true",
        value: "isCompliance"
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
    editedIndex: -1,
    editedItem: {
      id: "",
      first_name: "",
      group: "",
      role: "",
      username: "",
      email: ""
    },
    defaultItem: {
      name: ""
    },
     rules: {
      required: v => !!v || "This is a required field" //
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
          // this.tasks.name.forEach(approval =>{
          //   this.approval
          // })

          return this.$store.dispatch("GET_GROUP");
        })
        .then(result => {
          // GET group data
          this.groups = this.$store.state.group_table.groups;
          console.log(
            "JSON.stringify(this.groups) :",
            JSON.stringify(this.groups)
          );
        });
    },
    getGroup(group_list) {
      console.log("GROUP_LIST: " + JSON.stringify(group_list));
      var list = "";
      group_list.forEach(item => {
        var match = this.groups.find(r => {
          return r._id.toString() === item;
        });
        list = list + match.name + " ";
      });
      return list;
    },
    task(task_id) {
      return this.getTask(task_id) ? this.getTask(task_id).name : "";
    },
    // getTasks(task_list) {
    //   var list = "";
    //   task_list.forEach(item => {
    //     var match = this.tasks.find(r => {
    //       return r._id.toString() === item;
    //     });
    //     list = list + match.name + " ";
    //   });
    //   return list;
    // },
    getTasks(task_list) {
      console.log("GROUP_LIST: " + JSON.stringify(task_list));
      var list = "";
      if (task_list) {
        task_list.forEach(item => {
          var match = this.tasks.find(r => {
            return r._id.toString() === item;
          });
          if (match) {
            if (list !== "") list = list + ", ";
            list = list + match.name;
          }
        });
      }
      return list;
    },
    remove(item) {
      const index = this.groups.indexOf(item.name);
      if (index >= 0) this.groups.splice(index, 1);
    },
    addItem() {
      this.selectedIndex = -1; //
      this.mode = 0; // Create
      this.new_task = {}; // holds the filled up item
      this.dialog = true;
    },
    editItem(item, index) {
      console.log("GROUP: " + JSON.stringify(item.groups));
      this.selectedIndex = index; //
      this.mode = 1; // Edit
      this.new_task = item;
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
    validate() {
      var check = true;
      if (
        this.isEmpty(this.new_task.name) ||
        this.isEmpty(this.new_task.approval) ||
        this.isEmpty(this.new_task.denied) ||
        this.isEmpty(this.new_task.groups)
      ) {
        this.$notify({
          message: "Please fill up required fields",
          color: "error"
        });
        return false;
      } else {
        for (let i = 0; i < this.tasks.length; i++) {
          if (
            this.selectedIndex != i &&
            this.tasks[i].name &&
            this.new_task.name.toLowerCase() ===
              this.tasks[i].name.toLowerCase()
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
        this.$store.dispatch("ADD_TASK", this.new_task).then(result => {
          console.log("added:task: " + JSON.stringify(result));
          this.init();
          this.$notify({
            message: "You have successfully created a new Task",
            color: "primary"
          });
          this.close();
        });
      }
    },
    save() {
      if (this.validate()) {
        if (this.new_task.start_process === "true") {
          console.log("start process true");

          this.new_task.end_process = false;
        } else {
          console.log("start process false");
          this.new_task.end_process = true;
        }
        console.log(
          "######" +
            JSON.stringify(this.new_task.start_process) +
            "#####" +
            JSON.stringify(this.new_task.end_process)
        );
        // console.log('###########edited:task: ' + JSON.stringify(this.new_province));
        this.$store.dispatch("EDIT_TASK", this.new_task).then(result => {
          console.log("edited:task: " + JSON.stringify(result));
          this.init();
          this.$notify({
            message: "You have successfully edited a Task",
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
