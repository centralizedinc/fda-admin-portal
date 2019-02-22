<template>
  <div>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-card-text transparent>
            <v-text-field
              :append-icon="old_password ? 'visibility_off' : 'visibility'"
              :type="old_password ? 'text' : 'password'"
              name="input-10-2"
              prepend-icon="vpn_key"
              label="Enter your Old Password"
              v-model="admin.password"
              class="input-group--focused"
              @click:append="old_password = !old_password"
            ></v-text-field>
            <v-text-field
              :append-icon="new_password ? 'visibility_off' : 'visibility'"
              :type="new_password ? 'text' : 'password'"
              name="input-10-2"
              prepend-icon="lock"
              label="Enter your New Password"
              v-model="admin.new_password"
              class="input-group--focused"
              @click:append="new_password = !new_password"
            ></v-text-field>
            <v-text-field
              :append-icon="confirm_password ? 'visibility_off' : 'visibility'"
              :type="confirm_password ? 'text' : 'password'"
              name="input-10-2"
              prepend-icon="lock_open"
              label="Confirm Password"
              v-model="admin.confirm_password"
              class="input-group--focused"
              @click:append="confirm_password = !confirm_password"
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="dialog=true">Send request</v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title
              primary-title
              class="headline"
              style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
            >Confirmation</v-card-title>
            <v-divider></v-divider>
            <v-card-text>Please enter your registered email address. Access the link in your mail to login with your new password.</v-card-text>
            <v-flex xs12 pa-2>
              <v-text-field
                v-model="email"
                :rules="[rules.required, rules.email]"
                prepend-icon="email"
                label="Enter your email address"
              ></v-text-field>
            </v-flex>
            <v-divider class="mt-5"></v-divider>
            <v-card-actions>
              <v-btn @click="close">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="success" @click="submit">Submit</v-btn>
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
      admin: {},
      old_password: null,
      new_password: null,
      confirm_password: null,
      dialog: false,
      email: null,
      changePassword: [],
      rules: {
        required: value => !!value || "Required.",
        confirm_password: () =>
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
        .dispatch("GET_CHANGE_PASSWORD", this.$store.state.user_session.user._id)
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
      this.$store.dispatch("EDIT_CHANGE_PASSWORD", this.new_password).then(result => {
        console.log("edited:password: " + JSON.stringify(result));
        this.$notify({
          message: "Your password is successfuly changed",
          color: "submit",
          icon: "check_box"
        });
        this.close();
      });
    }
  }
};
</script>

<style>
</style>
