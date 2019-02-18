<template>
  <v-layout align-center justify-center>
    <v-flex xs4 pa-2 mt-4>
      <v-card pa-5>
        <v-toolbar dark style="background: linear-gradient(45deg, #43A047 0%, #1de9b6 100%)">
          <span class="font-weight-light headline">Login</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field name="name" label="Email/Username" @keypress.enter="login" id="id"></v-text-field>
          <v-text-field
            name="name"
            label="Enter your password"
            min="8"
            @keypress.enter="login"
            :append-icon="value ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (value = !value)"
            :type="value ? 'password' : 'text'"
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login" class="caption font-weight-light">Login</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      value: true
    };
  },
  methods: {
    login() {
      // :rules="[() => ('The email and password you entered don\'t match')]"
      this.$store.commit("API_INSTANCE", "my_sample_api_token");
      this.$router.push("/app");
    }
  }
};
</script>

<style>
</style>
