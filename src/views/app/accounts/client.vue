<template>
  <div>
    <v-toolbar flat color="white">
      <v-flex xs4>
        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
      </v-flex>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
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
                <v-flex xs12 sm4 md6>
                  <span class="text-xs-center">Name</span>
                  <v-divider></v-divider>
                  <v-card-text>{{clients.name}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md6>
                  <span class="text-xs-center">Created By</span>
                  <v-divider></v-divider>
                  <v-card-text>{{clients.date_created}}</v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <!-- TABLE -->
    <v-data-table :headers="headers" :items="clients" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.username }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ formatDate(props.item.last_login) }}</td>
        <td>{{ formatDate(props.item.date_modified) }}</td>
        <td>{{ formatDate(props.item.date_created) }}</td>
        <td>{{ status(props.item.status) }}</td>
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
    clients: [],
    client: [],
    new_declared: {},
    modified_client: {},
    dialog: false,
    dialogView: false,
    search: "",
    headers: [
      {
        text: "User Name",
        align: "left",
        sortable: "true",
        value: "username"
      },
      {
        text: "Email",
        align: "left",
        value: "email"
      },
      {
        text: "Last Login",
        align: "left",
        value: "last_login"
      },
      {
        text: "Last Modified",
        align: "left",
        value: "date_modified"
      },
      {
        text: "Date Created",
        align: "left",
        value: "date_created"
      },
      {
        text: "Status",
        value: "status"
      }
    ],
    // editedIndex: -1,
    // editedItem: {
    //   id: "",
    //   name: "",
    //   date_created: ""
    // },
    defaultItem: {
      name: ""
    }
  }),

  computed: {
    // formTitle() {
    //   return this.mode === 0 ? "Add Declared Capital" : "Edit Declared Capital";
    // }
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      this.$store.dispatch("GET_CLIENT").then(result => {
        this.clients = this.$store.state.client_table.clients;
      });
    },
    status(stat) {
      console.log(stat);

      if (stat === 0) {
        return "Registered (Awaiting Confirmation)";
      } else if (stat === 1) {
        return "Confirmed (Active but no active FDA License)";
      } else if (stat === 2) {
        return "Active";
      } else if (stat === 3) {
        return "Suspended";
      } else if (stat === 4) {
        return "Inactive (For Deletion)";
      }
    },

    // formatDate (date) {
    //     if (!date) return null

    //     const [year, month, day] = date.split('-')
    //     console.log("day: " + `${day}`);

    //     return `${month}/${day}/${year}`
    //   }

    formatDate(dte) {
      if (!dte) return null;
      else {
        var date = new Date(dte);
        var month = date.getMonth() + 1;
        var newDte = month + "-" + date.getDate() + "-" + date.getFullYear();
        return newDte;
      }
    }

    /**
     *  0 - Registered (Awaiting Confirmation)
     *  1 - Confirmed (Active but no active FDA License)
     *  2 - Active
     *  3 - Suspended
     *  4 - Inactive (For Deletion)
     */
    // addItem() {
    //   this.mode = 0; // Create
    //   this.new_declared = {}; // holds the filled up item
    //   this.dialog = true;
    // },
    // editItem(item) {
    //   this.mode = 1; // Edit
    //   this.new_declared = JSON.parse(JSON.stringify(item));
    //   this.dialog = true;
    // },

    // viewItem(item) {
    //   this.client = item;
    //   this.dialogView = true;
    // },

    // close() {
    //   this.dialog = false;
    //   this.dialogView = false;
    //   this.new_declared = {};
    // },
    // submit() {
    //   this.$store.dispatch("ADD_DECLARED", this.new_declared).then(result => {
    //     console.log("added:declared: " + JSON.stringify(result));
    //     this.init();
    //     this.close();
    //   });
    // },
    // save() {
    //   this.$store.dispatch("EDIT_DECLARED", this.new_declared).then(result => {
    //     console.log("edited:declared: " + JSON.stringify(result));
    //     this.init();
    //     this.close();
    //   });
    // }
  }
};
</script>
<style>
</style>
