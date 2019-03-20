<template>
  <v-app>
    <notification></notification>
    <v-navigation-drawer app :mini-variant="mini" width="250">
      <v-toolbar
        dark
        style="height: 100px; background: linear-gradient(45deg, #43A047 0%, #1de9b6 100%)"
      >
        <v-list class="pa-0">
          <v-list-tile
            class="pa-1"
            avatar
            style=" height: 100px; background:url('https://pixinvent.com/free-materialize-material-design-admin-template/images/gallary/7.png') no-repeat center center"
          >
            <v-list-tile-avatar class="mt-4">
              <img src="http://i.pravatar.cc/300">
            </v-list-tile-avatar>
            <v-spacer></v-spacer>
            <v-list-tile-content class="mt-4">
              <v-list-tile-title class="body-2">{{admin.first_name}} {{admin.last_name}}</v-list-tile-title>
              <v-list-tile-sub-title class="caption">{{rol(admin.role)}}</v-list-tile-sub-title>
              <v-list-tile-sub-title class="caption">{{getGroup(admin.group)}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-list-tile @click="goTo('/app')" class="ma-1" :style="activeRoute('Dashboard')">
          <v-list-tile-action>
            <v-icon color="success">dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="body-1 font-weight-light">Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group color="success" prepend-icon="person_pin">
          <v-list-tile slot="activator">
            <v-list-tile-title>Users</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="goTo('/app/clients')" class="ma-1" :style="activeRoute('Clients')">
            <v-list-tile-action>
              <v-icon color="success">people_outline</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Clients</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="goTo('/app/admin')" class="ma-1" :style="activeRoute('admin')">
            <v-list-tile-action>
              <v-icon color="success">account_box</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Admin</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-group color="success" prepend-icon="redeem">
          <v-list-tile slot="activator">
            <v-list-tile-title>Product Type</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="goTo('/app/products')" class="ma-1" :style="activeRoute('product')">
            <v-list-tile-action>
              <v-icon color="success">card_membership</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Products</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="goTo('/app/primary')" class="ma-1" :style="activeRoute('primary')">
            <v-list-tile-action>
              <v-icon color="success">account_box</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Primary</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            @click="goTo('/app/Activity')"
            class="ma-1"
            :style="activeRoute('Additional Activity')"
          >
            <v-list-tile-action>
              <v-icon color="success">face</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Additional Activity</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            @click="goTo('/app/capital')"
            class="ma-1"
            :style="activeRoute('Declared Capital')"
          >
            <v-list-tile-action>
              <v-icon color="success">accessibility</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Declared Capital</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            @click="goTo('/app/productLine')"
            class="ma-1"
            :style="activeRoute('Productline')"
          >
            <v-list-tile-action>
              <v-icon color="success">developer_board</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Product Line</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-group color="success" prepend-icon="room">
          <v-list-tile slot="activator">
            <v-list-tile-title>Location</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="goTo('/app/province')" class="ma-1" :style="activeRoute('province')">
            <v-list-tile-action>
              <v-icon color="success">directions</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Province</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="goTo('/app/region')" class="ma-1" :style="activeRoute('region')">
            <v-list-tile-action>
              <v-icon color="success">navigations</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Region</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="goTo('/app/city')" class="ma-1" :style="activeRoute('city')">
            <v-list-tile-action>
              <v-icon color="success">directions_walk</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">City</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-group color="success" prepend-icon="person_pin">
          <v-list-tile slot="activator">
            <v-list-tile-title>Tasks</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="goTo('/app/task')" class="ma-1" :style="activeRoute('task')">
            <v-list-tile-action>
              <v-icon color="success">recent_actors</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Task</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            @click="goTo('/app/checklist')"
            class="ma-1"
            :style="activeRoute('checklist')"
          >
            <v-list-tile-action>
              <v-icon color="success">view_quilt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Checklist</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile @click="goTo('/app/group')" class="ma-1" :style="activeRoute('Group')">
          <v-list-tile-action>
            <v-icon color="success">contacts</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="body-1 font-weight-light">Group</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          @click="goTo('/app/designation')"
          class="ma-1"
          :style="activeRoute('Designation')"
        >
          <v-list-tile-action>
            <v-icon color="success">person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="body-1 font-weight-light">Designation</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          @click="goTo('/app/identification')"
          class="ma-1"
          :style="activeRoute('Identification')"
        >
          <v-list-tile-action>
            <v-icon color="success">perm_contact_calendar</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="body-1 font-weight-light">Identification</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="goTo('/app/fees')" class="ma-1" :style="activeRoute('Fees')">
          <v-list-tile-action>
            <v-icon color="success">perm_contact_calendar</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="body-1 font-weight-light">Fees</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile @click="goTo('/app/profile')" class="ma-1" :style="activeRoute('Profile')">
          <v-list-tile-action>
            <v-icon color="success">far fa-user-circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="body-1 font-weight-light">My Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          @click="goTo('/app/password')"
          class="ma-1"
          :style="activeRoute('Change Password')"
        >
          <v-list-tile-action>
            <v-icon color="success">lock_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title
              @click="goTo('/app/password')"
              class="body-1 font-weight-light"
            >Password Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="showLogout()" class="ma-1" :style="activeRoute('LOGOUT')">
          <v-list-tile-action>
            <v-icon color="success">fas fa-sign-out-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="body-1 font-weight-light">Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      dark
      style="background: linear-gradient(45deg, #43A047 0%, #1de9b6 100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)"
    >
      <v-btn icon color="rgba(0, 0, 0, 0.18)" @click.stop="mini = !mini">
        <v-icon v-if="mini">menu</v-icon>
        <v-icon v-else>chevron_left</v-icon>
      </v-btn>
      <span class="headline font-weight-light">FDA Admin Portal</span>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-btn icon slot="activator">
          <v-icon small>far fa-bell</v-icon>
        </v-btn>
        <v-list two-line subheader>
          <v-subheader>Notifications</v-subheader>
          <v-divider></v-divider>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title class="body-2 font-weight-light">
                <v-icon color="success" small right>check</v-icon>Account Activation
              </v-list-tile-title>
              <v-list-tile-sub-title
                class="caption font-weight-thin"
              >02/06/2019 3:26PM - Your account was activated</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <v-btn icon slot="activator">
          <v-avatar size="40">
            <img src="http://i.pravatar.cc/200" alt="alt">
          </v-avatar>
        </v-btn>
        <v-list two-line subheader>
          <v-list-tile avatar @click="goTo('/app/profile')">
            <v-list-tile-content>
              <v-list-tile-title class="body-2 font-weight-light">My Profile</v-list-tile-title>
              <v-list-tile-sub-title class="caption font-weight-thin">Change your account details</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile avatar @click="goTo('/app/password')">
            <v-list-tile-content>
              <v-list-tile-title class="body-2 font-weight-light">Password Settings</v-list-tile-title>
              <v-list-tile-sub-title
                class="caption font-weight-thin"
              >Change Password and Security Settings</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile avatar @click="showLogout">
            <v-list-tile-content>
              <v-list-tile-title class="body-2 font-weight-light">Logout</v-list-tile-title>
              <v-list-tile-sub-title class="caption font-weight-thin">Sing out of FDA Admin Portal</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <!-- <v-btn icon>
        <v-icon small>far fa-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-avatar size="40">
          <img src="http://i.pravatar.cc/200" alt="alt">
        </v-avatar>
      </v-btn>-->
      <!-- <v-btn icon>
        <v-icon small>fas fa-indent</v-icon>
      </v-btn>-->
    </v-toolbar>
    <!-- <v-content> -->
    <v-container fluid>
      <span class="headline font-weight-thin">{{page_name}}</span>
      <v-breadcrumbs divider="/">
        <v-breadcrumbs-item>
          <v-icon color="primary">home</v-icon>
          <span class="caption font-weight-light">Home</span>
        </v-breadcrumbs-item>
        <v-breadcrumbs-item>
          <v-icon>book</v-icon>
          <span class="caption font-weight-light">Certficates</span>
        </v-breadcrumbs-item>
        <v-breadcrumbs-item>
          <v-icon>edit</v-icon>
          <span class="caption font-weight-light">New Application</span>
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-divider></v-divider>
      <!-- <transition name="fade"> -->
      <router-view></router-view>
      <!-- </transition> -->
      <v-dialog v-model="show_logout" persistent max-width="300" transition="dialog-transition">
        <v-card>
          <v-toolbar
            dark
            color="fdaGreen"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="title font-weight-thin">Logout</span>
          </v-toolbar>
          <v-card-text>
            <span class="font-weight-light">Are you sure you want to Logout?</span>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="font-weight-light"
              outline
              color="primary"
              dark
              @click.native="show_logout = false"
            >No</v-btn>
            <v-btn class="font-weight-light" color="success" @click="confirmLogout()">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <!-- </v-content> -->
    <v-footer dark style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%)">
      <span class="caption">Copyright © 2019 FDA All rights reserved. v{{app_version}}</span>
      <v-spacer></v-spacer>
      <span class="caption">Food And Drug Administration of the Philippines</span>
    </v-footer>
  </v-app>
</template>

<script>
import notification from "@/components/Notification";
export default {
  components: { notification },

  //#########################
  // variables
  //#########################
  data() {
    return {
      mini: false,
      route_name: "",
      admin: {},
      show_logout: false,
      list: {}
    };
  },
  //#########################
  // init
  //#########################
  created() {
    this.init();
  },
  //#########################
  // methods
  //#########################
  methods: {
    init() {
      this.admin = this.$store.state.user_session.user;
    },
    goTo(router) {
      this.$router.push(router);
    },
    showLogout() {
      this.show_logout = true;
    },
    confirmLogout() {
      this.$store.dispatch("LOGOUT");
      this.$router.push("/");
    },
    activeRoute(route) {
      if (this.$route.name === route) {
        return "background-color:rgb(2, 128, 0); color:white";
      } else {
        return;
      }
    }
  },
  //#########################
  // computed
  //#########################
  computed: {
    page_name() {
      return this.$route.name;
    },
    breadcrumbs() {
      return this.$store.state.breadcrumbs.navigation;
    },
    app_version() {
      return process.env.VUE_APP_VERSION;
    }
  }
};
</script>

<style>
#nprogress .bar {
  height: 2px;
}

#container {
  padding: 40px;
  background-color: grey;
  color: white;
}
#nprogress .bar {
  background: purple;
}

#nprogress .spinner-icon {
  border-top-color: purple;
  border-left-color: purple;
}
</style>
