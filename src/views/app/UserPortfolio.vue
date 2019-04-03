<template>
  <v-layout row wrap>
    <v-flex xs12 md6 lg3 pa-2>
      <dashboard-card
        icon="account_circle"
        title="Clients"
        description="Total Clients"
        :details="clientCounts"
        color="primary"
      ></dashboard-card>
    </v-flex>
    <v-flex xs12 md6 lg3 pa-2>
      <dashboard-card
        icon="perm_identity"
        title="Admin"
        description="Total Admin"
        :details="adminCounts"
        color="success"
      ></dashboard-card>
    </v-flex>
    <v-flex xs12 md6 lg3 pa-2>
      <dashboard-card
        icon="account_box"
        title="Approver"
        description="Total Approver"
        :details="approverCounts"
        color="warning"
      ></dashboard-card>
    </v-flex>
    <v-flex xs12 md6 lg3 pa-2>
      <dashboard-card
        icon="accessibility"
        title="Encoder"
        description="Total Encoder"
        :details="encoderCounts"
        color="error"
      ></dashboard-card>
    </v-flex>
    <v-flex xs12 md6 lg4 pa-2>
      <v-card>
        <v-toolbar
          extended
          style="background:url('https://pixinvent.com/free-materialize-material-design-admin-template/images/gallary/12.png') no-repeat center"
        >
          <v-btn color="error" dark absolute bottom right fab small @click="goTo('/app/profile')">
            <v-icon>edit</v-icon>
          </v-btn>

          <v-btn dark absolute bottom left fab>
            <v-avatar size="40" color="teal">
              <img v-if="admin.avatar" :src="admin.avatar.location" alt="alt">
              <span v-else>{{admin.first_name.substring(0,1) + admin.last_name.substring(0,1)}}</span>
            </v-avatar>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap mt-4>
            <v-flex xs12>
              <span class="title font-width-light">{{admin.first_name}} {{admin.last_name}}</span>
            </v-flex>
            <v-flex xs12 pa-1>
              <v-icon small>account_circle</v-icon>
              <span class="subheader font-width-light">{{admin.username}}</span>
            </v-flex>
            <v-flex xs12 pa-1>
              <v-icon small>email</v-icon>
              <span class="subheader font-width-light">{{admin.email}}</span>
            </v-flex>
            <v-flex xs12 pa-1>
              <v-icon small>work</v-icon>
              <span class="subheader font-width-light">{{rol(admin.role)}}</span>
            </v-flex>
            <!-- <v-flex xs12 pa-1>
              <v-icon small>assignment</v-icon>
              <span class="subheader font-width-light">{{clientGroup(admin.group)}}</span>
            </v-flex>-->
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import DashboardCard from "@/components/DashboardCards";
export default {
  components: { DashboardCard },
  data: () => ({
    users: [],
    clients: [],
    clientCounts: 0,
    adminCounts: 0,
    approverCounts: 0,
    encoderCounts: 0,
    admin: [],
    groups: {}
  }),
  created() {
    this.init();
  },

  methods: {
    activeRoute(route) {
      if (this.$route.name === route) {
        return "background-color:rgb(2, 128, 0); color:white";
      } else {
        return;
      }
    },
    goTo(router) {
      this.$router.push(router);
    },
    init() {
      this.$store
        .dispatch("GET_ADMIN")
        .then(result => {
          console.log("#### TEST TEST TEST###" + JSON.stringify(result));

          this.users = result;
          console.log("users " + JSON.stringify(result));

          this.users.forEach(element => {
            if (element.role === "0") {
              this.adminCounts += 1;
            } else if (element.role === "1") {
              this.approverCounts += 1;
            } else if (element.role === "2") {
              this.encoderCounts += 1;
            }
          });

          return this.$store.dispatch("GET_CLIENT");
        })
        .then(result => {
          this.clients = this.$store.state.client_table.clients;
          this.admin = this.$store.state.user_session.user;
          this.clientCounts = this.clients.length;
          // console.log("### USER DETAILS ###" + JSON.stringify(this.clientCounts));

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
    }

    // clientGroup(group_list) {
    //   console.log("GROUP_LIST: " + JSON.stringify(group_list));
    //   var list = "";
    //   if (group_list) {
    //     group_list.forEach(item => {
    //       var match = this.groups_items.find(r => {
    //         return r._id.toString() === item;
    //       });
    //       if (match) {
    //         if(list !== '')
    //         list = list + ', '
    //         list = list +  match.name;
    //       }
    //     });
    //   }
    //   return list;
    // }
  }
};
</script>

<style>
</style>

