<template>
  <div>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-layout align-center justify-center>
            <v-flex xs10>
              <v-card-text>
                <v-text-field
                  label="First Name"
                  v-model="admin.first_name"
                  required
                  :rules="[() => !!admin.first_name || 'This field is required']"
                ></v-text-field>
                <v-text-field
                  label="Last Name"
                  v-model="admin.last_name"
                  required
                  :rules="[() => !!admin.last_name || 'This field is required']"
                ></v-text-field>
                <v-text-field
                  label="Username"
                  v-model="admin.username"
                  required
                  :rules="[() => !!admin.username || 'This field is required']"
                ></v-text-field>
                <v-text-field
                  label="Email Address"
                  v-model="admin.email"
                  required
                  :rules="[() => !!admin.email || 'This field is required']"
                ></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="showProfile">Submit</v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="show_profile" persistent max-width="400" transition="dialog-transition">
        <v-card>
          <v-toolbar
            dark
            color="fdaGreen"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="title font-weight-thin">My Profile</span>
          </v-toolbar>
          <v-card-text>
            <span class="font-weight-light">Are you sure you want to Update your Details?</span>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="font-weight-light"
              outline
              color="primary"
              dark
              @click.native="show_profile = false"
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
  data: () => ({
    admin: {},
    first_name: null,
    last_name: null,
    username: null,
    show_profile: false,
    email: null
  }),

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
      console.log(
        "##########STORE" + JSON.stringify(this.$store.state.user_session.user)
      );
      this.admin = this.$store.state.user_session.user;
      // this.$store
      //   .dispatch("GET_PROFILE", this.$store.state.user_session.user._id)
      //   .then(result => {
      //     this.admin = result;
      //     console.log("LOGS GET PROFILE" + JSON.stringify(this.admin));
      //   });
    },
    showProfile() {
      this.show_profile = true;
    },
    close() {
      this.new_admin = {};
    },
    submit() {
      this.new_admin = this.admin;
      console.log(
        "###########edited:ADMIN PROFILE: " + JSON.stringify(this.new_admin)
      );
      this.$store
        .dispatch("EDIT_PROFILE", this.new_admin)
        .then(result => {
          console.log("edited:profile: " + JSON.stringify(result));
          this.$notify({
            message: "Your Profile is successfuly updated",
            color: "success",
            icon: "check_box"
          });
          this.$router.push("/app");
        })
        .catch(err => {});
    }
  }
};
</script>
<style>
</style>
