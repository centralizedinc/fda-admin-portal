<template>
  <div>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-layout align-center justify-center>
            <v-flex xs8>
              <v-text-field
                :append-icon="old_password ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="old_password ? 'text' : 'password'"
                name="input-10-2"
                label="Enter your Old Password"
                @click:append="old_password = !old_password"
                v-model="account.password"
              ></v-text-field>
              <v-text-field
                :append-icon="new_password ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="new_password ? 'text' : 'password'"
                label="Enter your New Password"
                hint="At least 8 characters"
                @click:append="new_password = !new_password"
                v-model="account.new_password"
              ></v-text-field>
              <v-text-field
                :append-icon="confirm_password ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.confirm_password]"
                :type="confirm_password ? 'text' : 'password'"
                label="Confirm Password"
                @click:append="confirm_password = !confirm_password"
                v-model="confirm"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: {},
      confirm: "",
      old_password: false,
      new_password: false,
      confirm_password: false,
      dialog: false,
      email: "",
      password: "Password",
      rules: {
        required: value => !!value || "Required.",
        confirm_password: value =>
          value === this.account.new_password ||
          "The new password and confirm password you entered doesn't match",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  created() {
    this.init();
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    init() {
      console.log("##########STORE" + this.$store.state.user_session.user._id);
      this.$store
        .dispatch("GET_PROFILE", this.$store.state.user_session.user._id)
        .then(result => {
          this.admin = result;
          console.log("LOGS GET PASSWORD" + JSON.stringify(this.admin));
        });
    },
    close() {
      this.dialog = false;
      this.admin = {};
    },
    submit() {
      this.new_password = this.admin;
      console.log(
        "###########edited:ADMIN PASSWORD: " + JSON.stringify(this.new_password)
      );
      this.$store
        .dispatch("CHANGE_PASSWORD", this.new_password)
        .then(result => {
          console.log("edited:password: " + JSON.stringify(result));
          this.$notify({
            message: "Your password is successfuly updated",
            color: "success",
            icon: "check_box"
          });
          // this.$store.dispatch("LOGOUT");
          this.$router.push("/");
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
