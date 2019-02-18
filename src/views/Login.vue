<template>
  <v-layout align-center justify-center>
    <v-flex xs4 pa-2 mt-4>
      <v-card pa-5>
        <v-toolbar dark style="background: linear-gradient(45deg, #43A047 0%, #1de9b6 100%)">
          <span class="font-weight-light headline">Login</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            name="name"
            label="Username"
            id="id"
            prepend-icon="how_to_reg"
            @keypress.enter="login"
            v-model="admin.username"
          ></v-text-field>
          <v-text-field
            v-model="admin.password"
            name="name"
            label="Password"
            @keypress.enter="login"
            :append-icon="value ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (value = !value)"
            :type="value ? 'password' : 'text'"
            prepend-icon="lock"
          ></v-text-field>
          <span v-if="alert">{{ alert_massage }}</span>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login" class="caption font-weight-light">Login</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card color="green darken-4" dark>
        <v-card-text>Logging in ...
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
      this.loading = true;
      this.$http
        .post("secured/accounts/auth/", this.admin)
        .then(result => {
          if (result.data.success && result.data.model.isMatch) {
            this.$notify({
              message:
                "Welcome to FDA Admin Portal. You are logged in as " +
                this.admin.username,
              icon: "check_circle_outline",
              initialMargin: 100
            });

            this.$store.commit("LOGIN", result.data.model);
            // this.$store.commit("CHECK_SESSION");
            this.setHeaders(result.data.model.token);
            this.$router.push("/app");
          } else {
            this.$notify({
              message:
                "Invalid Credentials. Please check your Username and Password.",
              icon: "add_alert",
              type: "warning",
              horizontalAlign: "center",
              initialMargin: 100
            });
          }
          this.loading = false;
        })
        .catch(err => {
          // this.$notifyErr(err);
          this.loading = false;
        });
    },
    forgotPassword() {}
  }
};
</script>

<style>
</style>
