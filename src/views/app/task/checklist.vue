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
                  <v-text-field v-model="new_checklist.description" :rules="[rules.required]" label="Description Name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="new_checklist.task"
                    :rules="[rules.required]"
                    :disabled="isUpdating"
                    :items="task"
                    label="Task name"
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
                  <label class="title">Checklist Name:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_checklist.description}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Task Name:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{task_details(new_checklist.task)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Created By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_checklist.date_created}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Created:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_checklist.date_created)}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Modified By:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{new_checklist.date_created}}</label>
                </v-flex>
                <v-flex xs6>
                  <label class="title">Date Modified:</label>
                </v-flex>
                <v-flex xs6>
                  <label class="subheading">{{formatDate(new_checklist.date_created)}}</label>
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
    <v-data-table :headers="headers" :items="checklist" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.description }}</td>
        <td>{{ task_details(props.item.task) }}</td>
        <td>{{ props.item.created_by }}</td>
        <td>{{ formatDate(props.item.date_created) }}</td>
        <td>{{ props.item.modified_by }}</td>
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
    tasks: {},
    tasks_items: [],
    new_checklist: {},
    modified_checklist: {},
    dialog: false,
    dialogView: false,
    isUpdating: false,
    search: "",
    selectedIndex: -1, //
    headers: [
      {
        text: "Description",
        align: "left",
        sortable: "true",
        value: "description"
      },
      {
        text: "Task Name",
        align: "left",
        sortable: "true",
        value: "tasks"
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
    task: [],
    checklist: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      description: "",
      task: "",
      selected: "",
      date_created: "",
      date_modified: ""
    },
    defaultItem: {
      description: ""
    },
    rules: {
      required: v => !!v || "This is a required field"
    }
  }),

  computed: {
    formTitle() {
      return this.mode === 0 ? "Add Checklist" : "Edit Checklist";
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
        .dispatch("GET_CHECKLIST")
        .then(result => {
          this.checklist = this.$store.state.checklist_tables.checklist;
          return this.$store.dispatch("GET_TASK");
        })
        .then(result => {
          // GET region data
          this.task = this.$store.state.task_tables.tasks;
        });
    },
    task_details(task_id) {
      return this.getTask(task_id) ? this.getTask(task_id).name : "";
    },
    remove(item) {
      const index = this.task.indexOf(item.name);
      if (index >= 0) this.task.splice(index, 1);
    },
    addItem() {
this.selectedIndex = -1; //
      this.mode = 0; // Create
      this.new_checklist = {}; // holds the filled up item
      this.dialog = true;
    },
    editItem(item, index) {
this.selectedIndex = index; //
      this.mode = 1; // Edit
      this.new_checklist = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },

    viewItem(item) {
      this.new_checklist = item;
      this.dialogView = true;
    },

    close() {
      this.dialog = false;
      this.dialogView = false;
      this.new_checklist = {};
    },
   validate() {
      var check = true;
      if (
        this.isEmpty(this.new_checklist.description) ||
        this.isEmpty(this.new_checklist.task)
      ) {
        this.$notify({
          message: "Please fill up required fields",
          color: "error"
        });
        return false;
      } else {
        for (let i = 0; i < this.checklist.length; i++) {
          if (
            this.selectedIndex != i &&
            this.checklist[i].description &&
            this.checklist[i].task &&
            this.checklist[i].description.toLowerCase() ===
            this.new_checklist.description.toLowerCase() &&
            this.new_checklist.task.toLowerCase() ===
            this.checklist[i].task.toLowerCase()
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
      this.$store.dispatch("ADD_CHECKLIST", this.new_checklist).then(result => {
        console.log("added:checklist: " + JSON.stringify(result));
        this.init();
        this.$notify({
          message: "You have successfully created a new Checklist",
          color: "primary"
        });
        this.close();
      });
      }
    },
    save() {
      if (this.validate()) {
      // console.log('###########edited:province: ' + JSON.stringify(this.new_province));
      this.$store
        .dispatch("EDIT_CHECKLIST", this.new_checklist)
        .then(result => {
          console.log("edited:checklist: " + JSON.stringify(result));
          this.init();
          this.$notify({
            message: "You have successfully edited a Checklist",
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
