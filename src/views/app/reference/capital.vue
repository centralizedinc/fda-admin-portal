<template>
  <v-layout dark row wrap pa-3>
    <v-flex xs12>
      <md-card>
        <md-card-content>
          <v-layout row wrap text-xs-right>
            <v-flex xs4 offset-xs-8 pa-2>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs6>
              <v-btn fab medium color="fdaMed" right absolute @click="dialog=true">
                <v-icon medium color="fdaSilver">add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headers"
            :items="declared"
            :loading="isLoadingdeclared"
            :search="search"
            class="elevation-1"
          >
            <v-progress-linear slot="progress" color="blue" height="1"></v-progress-linear>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.created_by }}</td>
              <td>{{ formatDate(props.item.date_created) }}</td>
              <td>{{ props.item.modified_by }}</td>
              <td>{{ formatDate(props.item.date_modified) }}</td>
              <td class="text-xs-left">
                <v-btn flat icon color="blue" @click="editItem(props.item)">
                  <i class="fas fa-pencil-alt fa-sm"></i>
                  <md-tooltip md-direction="top">Edit</md-tooltip>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </md-card-content>
      </md-card>

      <md-dialog :md-active.sync="dialog">
        <md-dialog-title>{{ formTitle }}</md-dialog-title>

        <md-dialog-content>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field v-model="editedItem.name" label="Declared Capital"></v-text-field>
            </v-flex>
          </v-layout>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-danger" @click="close">Cancel</md-button>
          <md-button class="md-primary" @click="save">Save</md-button>
        </md-dialog-actions>
      </md-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    success: false,
    search: null,
    dialog: false,
    user: {},
    isLoadingdeclared: false,
    show_confirmation: false,
    headers: [
      {
        text: "Declared Capital",
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
        text: "Created Date",
        align: "left",
        value: "date_created"
      },
      {
        text: "Modified By",
        align: "left",
        value: "modified_by"
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
    declared: [],
    check: 0,
    editedIndex: -1,
    editedItem: {
      name: "",
      date_created: "",
      created_by: "",
      date_modified: "",
      modified_by: ""
    },
    defaultItem: {
      name: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Declared Capital" : "Edit Declared Capital";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    isEmpty(str) {
      return !str || str === null || str === "";
    },
    initialize() {
      this.declared = this.$store.state.reference_tables.declaredCapital
      this.isLoadingUser = true;
      this.$http
        .get("core/declared")
        .then(result => {
          this.declared = result.data.model;
          this.isLoadingdeclared = false;
        })
        .catch(err => {
          this.$notifyErr(err);
          this.isLoadingdeclared = false;
        });
    },
    editItem(item) {
      this.editedIndex = this.declared.indexOf(item);
      this.editedItem = item;
      this.dialog = true;
    },
    cancel() {
      if (!this.isEmpty(this.declared)) {
        for (let index = 0; index < this.declared.length; index++) {
          if (this.users[index].name = !this.declared.name) {
            break;
          }
        }
      }
    },
    close() {
      this.dialog = false;
      this.editedItem = {};
      this.editedIndex = -1;
      this.initialize();
    },
    save() {
      this.check = 0;
      this.declared.forEach(name => {
        if (
          name.name == this.editedItem.name.toUpperCase()
        ) {
          this.check++;
        }
      });
      if (
        this.isEmpty(this.editedItem.name)
      ) {
        this.$notify({
          message: "Please fill up all the fields*",
          icon: "error_outline",
          type: "danger",
          initialMargin: 100
        });
      } else if (this.editedIndex > -1 && this.check <= 1) {
        this.editedItem.name = this.editedItem.name.toUpperCase();
        this.editedItem.modified_by = this.user.username;
        this.editedItem.date_modified = new Date();
        Object.assign(this.declared[this.editedIndex], this.editedItem);
        this.$http
          .post("core/declared" + this.editedItem._id, this.editedItem)
          .then(result => {
            if (result.data.success) {
              this.$notify({
                message: "Declared Capital has been successfully edited.",
                icon: "check_circle_outline",
                type: "success",
                initialMargin: 100
              });
              this.close();
            } else {
              this.$notifyValidationErr(result.data.errors);
            }
          })
          .catch(err => {
            this.$notifyErr(err);
          });
      } else if (this.check === 0) {
        this.editedItem.name = this.editedItem.name.toUpperCase();
        this.editedItem.created_by = this.user.username;
        this.editedItem.date_created = new Date();
        this.declared.push(this.editedItem);
        this.$http
          .post("core/declared", this.editedItem)
          .then(result => {
            if (result.data.success) {
              this.$notify({
                message: "Declared Capital has been successfully added.",
                icon: "check_circle_outline",
                type: "success",
                initialMargin: 100
              });
              this.close();
            } else {
              this.$notifyValidationErr(result.data.errors);
            }
          })
          .catch(err => {
            this.$notifyErr(err);
          });
      } else {
        this.$notify({
          message: "Declared Capital already exist.",
          icon: "error_outline",
          type: "danger",
          initialMargin: 100
        });
      }
    }
  }
};
</script>

<style>
</style>
