<template>
  <div>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-layout align-center justify-center>
            <v-flex xs8>
              <v-text-field
                :append-icon="new_password ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.password]"
                :type="new_password ? 'text' : 'password'"
                label="Enter your New Password"
                @click:append="new_password = !new_password"
                v-model="admin.new_password"
              ></v-text-field>
              <v-text-field
                :append-icon="confirm_password ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, password_match]"
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
            <v-btn color="success" @click="submit()">Submit</v-btn>
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
      admin: {
        username: "",
        new_password: "",
        confirm: ""
      },
      new_password: false,
      confirm_password: false,
      rules: {
        required: value => !!value || "Required.",
        password: value => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
          return (
            pattern.test(value) ||
            "Password must have 1 lowercase, 1 uppercase, 1 special character and 8 characters"
          );
        }
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
            message: "You have successfully change your password",
            icon: "check_circle_outline",
            color: "primary"
          });
        this.$router.push("/app");
        })
        .catch(err => {

        });
    }
    
  }
};
</script>

<style>
</style>
