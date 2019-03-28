<template>
  <v-layout align-center justify-center>
    <v-flex xs4 pa-2 mt-4>
      <v-card pa-5 class="elevation-15">
        <v-toolbar dark color="primary" class="toolbarStyle">
          <span class="font-weight-light title">Login</span>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-flex xs12 pa-4 text-xs-center>
          <v-img :src="require('@/assets/FDA.png')" aspect-ratio="2.75"></v-img>
          <span
            class="body-1 font-weight-light black--text"
            style="text-transform: uppercase center"
          >For Administrator use only</span>
        </v-flex>
        <v-card-text transparent>
          <v-text-field
            outline
            name="name"
            label="Username"
            id="id"
            @keypress.enter="login"
            v-model="admin.username"
          ></v-text-field>
          <v-text-field
            outline
            v-model="admin.password"
            name="name"
            label="Password"
            @keypress.enter="login"
            :append-icon="value ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (value = !value)"
            :type="value ? 'password' : 'text'"
          ></v-text-field>
          <span v-if="alert">{{ alert_massage }}</span>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :disabled="loading"
            @click="login"
            class="caption font-weight-light"
          >Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card color="green darken-4" dark>
        <v-card-text>
          Logging in ...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar bottom right v-model="alert" :color="alert_color">{{ alert_massage }}</v-snackbar>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      remember: false,
      loadingLogin: false,
      value: true,
      showForgotPassword: false,
      email_or_user: "",
      admin: {
        username: "",
        password: ""
      },
      loader: null,
      loading: false,
      alert: false,
      alert_massage: "",
      alert_color: "primary"
    };
  },
  methods: {
    login() {
      var auth = {
        username: this.admin.username,
        password: this.admin.password
      };
      this.loading = true;
      this.$store
        .dispatch("LOGIN", auth)
        .then(result => {
          this.loading = false;
          console.log(
            "JSON.stringify(result) :",
            JSON.stringify(this.$store.state.user_session.isAuthenticated)
          );
          if (this.$store.state.user_session.isAuthenticated === true) {
            this.$notify({
              message: "Welcome to FDA Admin Portal.",
              icon: "check_circle",
              color: "primary"
            });
            this.$router.push("/app");
          } else {
            this.$notify({
              message: "Invalid user credential",
              color: "warning"
            });
          }
        })
        .catch(err => {});
      console.log(auth);
      // this.$router.push("/app");
    }
  }
};
</script>

<style>
.toolbarStyle {
  background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%);
  box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5);
}
</style>
