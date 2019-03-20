<template>
  <div>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-layout align-center justify-center>
            <v-flex xs6 class="pt-5">
              <v-text-field
                outline
                :append-icon="new_password ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.password]"
                :type="new_password ? 'text' : 'password'"
                label="Enter your New Password"
                @click:append="new_password = !new_password"
                v-model="admin.new_password"
              ></v-text-field>
              <v-text-field
                outline
                :append-icon="confirm_password ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.confirm_password]"
                :type="confirm_password ? 'text' : 'password'"
                label="Confirm Password"
                @click:append="confirm_password = !confirm_password"
                v-model="admin.confirm"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="showPass">Submit</v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="show_pass" persistent max-width="400" transition="dialog-transition">
          <v-card>
            <v-toolbar
              dark
              color="fdaGreen"
              style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
            >
              <span class="title font-weight-thin">Change Password</span>
            </v-toolbar>
            <v-card-text>
              <span class="font-weight-light">Are you sure you want to Change your Password?</span>
              <v-divider></v-divider>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="font-weight-light"
                outline
                color="primary"
                dark
                @click.native="show_pass = false"
              >No</v-btn>
              <v-btn class="font-weight-light" color="success" @click="submit()">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin: {
        username: "",
        new_password: "",
        confirm: ""
      },
      new_password: false,
      confirm_password: false,
      show_pass: false,
      rules: {
        required: value => !!value || "Required.",
        confirm_password: value =>
          value === this.admin.confirm ||
          "The new password and confirm password you entered doesn't match"
      }
    };
  },
  created() {
    this.init();
  },
  computed: {
    password_match() {
      return (
        this.admin.new_password === this.admin.confirm ||
        "New Password and Confirm Password does not match"
      );
    }
  },
  methods: {
    init() {
      console.log(
        "######## " + JSON.stringify(this.$store.state.user_session.user)
      );
      this.admin.user_id = this.$store.state.user_session.user._id;
    },
    showPass() {
      this.show_pass = true;
    },
    submit() {
      // this.new_admin = this.admin;
      console.log(
        "###########edited:ADMIN PROFILE: " + JSON.stringify(this.admin)
      );
      this.$store
        .dispatch("CHANGE_PASSWORD", this.admin)
        .then(result => {
          console.log("edited:profile: " + JSON.stringify(result));
          this.$notify({
            message: "Your Password is successfuly updated",
            color: "success",
            icon: "check_circle"
          });
          this.$router.push("/app");
          // this.$store.dispatch("LOGOUT");
          // this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
          this.$notifyError(err);
        });
    }
  }
};
</script>

<style>
</style>
