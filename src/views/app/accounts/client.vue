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
    Item: {
      name: ""
    }
  }),

  computed: {
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
  }
};
</script>
<style>
</style>
