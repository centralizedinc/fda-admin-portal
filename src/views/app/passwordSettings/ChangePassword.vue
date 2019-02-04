<template>
  <v-layout align-center justify-center>
    <v-flex xs12>
      <v-card>
        <v-card-text transparent>
          <v-text-field
            :append-icon="old_password ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            :type="old_password ? 'text' : 'password'"
            name="input-10-2"
            prepend-icon="vpn_key"
            label="Enter your Old Password"
            hint="At least 8 characters"
            class="input-group--focused"
            @click:append="old_password = !old_password"
          ></v-text-field>
          <v-text-field
            :append-icon="new_password ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            :type="new_password ? 'text' : 'password'"
            name="input-10-2"
            prepend-icon="lock"
            label="Enter your New Password"
            hint="At least 8 characters"
            class="input-group--focused"
            @click:append="new_password = !new_password"
          ></v-text-field>
          <v-text-field
            :append-icon="confirm_password ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.confirm_password]"
            :type="confirm_password ? 'text' : 'password'"
            name="input-10-2"
            prepend-icon="lock_open"
            label="Confirm Password"
            hint="At least 8 characters"
            class="input-group--focused"
            @click:append="confirm_password = !confirm_password"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            block
            slot="activator"
            color="success"
            class="font-weight-light"
            @click="dialog=true"
          >Send request</v-btn>
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
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" flat @click="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      old_password: false,
      new_password: true,
      confirm_password: true,
      dialog: false,
      email: "",
      password: "Password",
      rules: {
        required: value => !!value || "Required.",
        confirm_password:  () => ('The new password and confirm password you entered doesn\'t match'),
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  methods: {
    submit() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
