<template>
  <v-layout row wrap>
    <v-flex xs4>
      <v-text-field hide-details prepend-icon="search" single-line label="Search"></v-text-field>
    </v-flex>
    <v-flex xs12 p1-2>
      <br>
      <v-card>
        <v-btn fab medium color="fdaMed" top right absolute @click="dialog=true">
          <v-icon medium color="fdaSilver">add</v-icon>
        </v-btn>

        <Add :show="dialog" @proceed="launchAppForm"></Add>

        <v-data-table :headers="headers" :items="certificates" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.case_no }}</td>
            <td>{{ props.item.case_no }}</td>
            <td>{{ props.item.application_type }}</td>
            <td>{{ props.item.current_task }}</td>
            <td>{{ props.item.date_created }}</td>
            <td>{{ props.item.date_variation }}</td>
            <td>
              <v-layout row wrap>
                <v-flex xs3>
                  <v-tooltip top>
                    <v-btn slot="activator" flat icon color="primary">
                      <v-icon small>create</v-icon>
                    </v-btn>Edit
                  </v-tooltip>
                </v-flex>
                <v-flex xs3>
                  <v-tooltip top>
                    <v-btn slot="activator" flat icon color="primary" @click="view">
                      <v-icon small>delete</v-icon>
                    </v-btn>Delete
                  </v-tooltip>
                </v-flex>
              </v-layout>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Undertaking from "@/components/Add";

export default {
  components: {
    Add: () => import("@/components/Add")
  },
  data() {
    return {
      dialog: false,
      headers: [
        { text: "Case No", value: "case_no" },
        { text: "License No", value: "case_no" },
        { text: "Type", value: "application_type" },
        { text: "Task", value: "current_task" },
        { text: "Application Date", value: "date_created" },
        { text: "Variation Date", value: "date_variation" },
        { text: "Actions", value: "" }
      ],
      certificates: [
        {
          case_no: "00",
          application_type: "sample application",
          current_task: "sample task",
          date_created: "01/01/2019",
          date_variation: "01/01/2019"
        }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    launchAppForm() {
      this.$router.push("/app/licenses");
    }
  }
};
</script>

<style>
</style>
