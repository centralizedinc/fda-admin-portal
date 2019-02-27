<template>
  <div>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-layout align-center justify-center>
            <v-flex xs8>
              <!-- <v-text-field
                :append-icon="old_password ? 'visibility' : 'visibility_off'"
                :rules="[rules.required]"
                :type="old_password ? 'text' : 'password'"
                name="input-10-2"
                label="Enter your Old Password"
                @click:append="old_password = !old_password"
                v-model="admin.password"
              ></v-text-field> -->
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
                v-model="confirm"
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
      admin: {},
      confirm: "",
      old_password: false,
      new_password: false,
      confirm_password: false,
      dialog: false,
      email: "",
      password: "",
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
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  computed: {
    password_match() {
      return (
        this.admin.new_password === this.confirm ||
        "New Password and Confirm Password does not match"
      );
    }
  },
  methods: {
    init() {
      this.admin = this.$store.state.user_session.user;
      // console.log("##########STORE" + this.$store.state.user_session.user._id);
      // this.$store
      //   .dispatch("GET_PROFILE", this.$store.state.user_session.user._id)
      //   .then(result => {
      //     this.admin = result;
      //     console.log("LOGS GET PASSWORD" + JSON.stringify(this.admin));
      //   });
    },
    close() {
      this.dialog = false;
      this.admin = {};
    },
    submit() {
      this.new_admin = this.admin;
      console.log(
        "###########edited:ADMIN PASSWORD: " + JSON.stringify(this.new_admin)
      );
      this.$store
        .dispatch("EDIT_PROFILE", this.new_admin)
        .then(result => {
          console.log("edited:password: " + JSON.stringify(result));
          {
            this.$notify({
              message: "Your Password is successfuly updated",
              color: "success",
              icon: "check_box"
            });
          }
          this.$router.push("/app");
        })
        .catch(err => {});
      console.log(result);
    }
  }
};
</script>

<style>
</style>
