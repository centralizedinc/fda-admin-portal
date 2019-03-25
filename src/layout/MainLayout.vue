<template>
  <v-app>
    <notification></notification>
    <v-toolbar dark color="primary" class="toolbarStyle"></v-toolbar>
    <v-container fluid class="bg">
      <router-view></router-view>
    </v-container>
    <v-footer dark style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%)">
      <span class="caption">Copyright © 2019 FDA All rights reserved. v{{app_version}}</span>
      <v-spacer></v-spacer>
      <span class="caption">Food And Drug Administration of the Philippines</span>
    </v-footer>
  </v-app>
</template>

<script>
import notification from "@/components/Notification";
export default {
  components: { notification },
  computed: {
    app_version() {
      return process.env.VUE_APP_VERSION;
    }
  }
};
</script>

<style>
.toolbarStyle {
  background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%);
  box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5);
}
.bg {
  /* The image used */
  background-image: url("https://i.postimg.cc/rFd3b4KP/bfad.png");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
