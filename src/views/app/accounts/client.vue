<template>
  <div>
    <v-card flat>
      <v-card-title primary-title>
        <v-flex xs4>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-flex>
      </v-card-title>

      <!-- TABLE -->
      <v-data-table :headers="headers" :items="clients" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <tr @click="loadClientDetails(props.item)" class="hoverItem">
            <td>{{ props.item.username }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ formatDate(props.item.last_login) }}</td>
            <td>{{ formatDate(props.item.date_modified) }}</td>
            <td>{{ formatDate(props.item.date_created) }}</td>
            <td :class="`${statusColor(props.item.status)}--text`">{{ status(props.item.status) }}</td>
          </tr>
        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </v-data-table>
    </v-card>

    <!-- Client Details -->
    <v-dialog
      v-model="clientDetailsDialog"
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar color="primary">
          <span class="font-weight-thin title" style="text-transform: uppercase">Client Details</span>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" flat icon color="black" @click="clientDetailsDialog = false">
              <v-icon>fas fa-times</v-icon>
            </v-btn>close
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-xl>
            <v-layout row wrap align-center justify-center fill-height>
              <v-flex xs6>
                <span class="subheading">Last Name:</span>
              </v-flex>
              <v-flex xs6>
                <span class="subheading">{{clientDetails.last_name}}</span>
              </v-flex>
              <v-flex xs6>
                <span class="subheading">First Name:</span>
              </v-flex>
              <v-flex xs6>
                <span class="subheading">{{clientDetails.first_name}}</span>
              </v-flex>
              <v-flex xs6>
                <span class="subheading">Username:</span>
              </v-flex>
              <v-flex xs6>
                <span class="subheading">{{clientDetails.username}}</span>
              </v-flex>
              <v-flex xs6>
                <span class="subheading">Email Address:</span>
              </v-flex>
              <v-flex xs6>
                <span class="subheading">{{clientDetails.email}}</span>
              </v-flex>
              <v-flex xs6>
                <span class="subheading">Status:</span>
              </v-flex>
              <v-flex xs6>
                <!-- <v-chip label color="primary" text-color="primary">
                  <v-icon left>icon</v-icon>text
                </v-chip>-->
                <span class="subheading">{{status(clientDetails.status)}}</span>
              </v-flex>
              <v-flex xs6>
                <span class="subheading">Last Login:</span>
              </v-flex>
              <v-flex xs6>
                <span class="subheading">{{formatDate(clientDetails.current_login)}}</span>
              </v-flex>
              <v-flex xs6>
                <span class="subheading">Date Created</span>
              </v-flex>
              <v-flex xs6>
                <span class="subheading">{{formatDate(clientDetails.date_created)}}</span>
              </v-flex>
              <v-flex xs6>
                <span class="subheading">Last Modified:</span>
              </v-flex>
              <v-flex xs6>
                <span class="subheading">{{formatDate(clientDetails.date_modified)}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn block flat color="error" @click="clientDetailsDialog = false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    clients: [],
    client: [],
    new_declared: {},
    modified_client: {},
    clientDetailsDialog: false,
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
    Item: {
      name: ""
    },
    clientDetails: {}
  }),
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("GET_CLIENT").then(result => {
        this.clients = this.$store.state.client_table.clients;
        console.log("Client Details " + JSON.stringify(this.clients));
      });
    },
    loadClientDetails(item) {
      if (item !== null) {
        this.clientDetails = item;
        console.log("Client item Details " + JSON.stringify(item));
        this.clientDetailsDialog = true;
      }
    }
  }
};
</script>

<style>
.hoverItem:hover {
  cursor: pointer;
}
</style>
