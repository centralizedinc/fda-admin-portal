<template>
  <div>
    <v-toolbar flat color="white">
      <v-flex xs4>
        <v-text-field hide-details prepend-icon="search" single-line label="Search"></v-text-field>
      </v-flex>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-btn fab medium color="fdaMed" top right absolute @click="dialog=true">
        <v-icon medium color="fdaSilver">add</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="800px">
        <v-card>
          <v-card-title
            primary-title
            class="headline"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.case_no" label="Case No"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.case_no" label="License No"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.application_type" label="Type"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.current_task" label="Task"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.date_created" label="Application Date"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.date_variation" label="Variation Date"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="close">Cancel</v-btn>
            <v-btn color="success" @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="product" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.case_no }}</td>
        <td>{{ props.item.case_no }}</td>
        <td>{{ props.item.application_type }}</td>
        <td>{{ props.item.current_task }}</td>
        <td>{{ props.item.date_created }}</td>
        <td>{{ props.item.date_variation }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)" flat icon color="primary">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)" flat icon color="primary">assignment</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Case No", value: "case_no" },
      { text: "License No", value: "case_no" },
      { text: "Type", value: "application_type" },
      { text: "Task", value: "current_task" },
      { text: "Application Date", value: "date_created" },
      { text: "Variation Date", value: "date_variation" },
      { text: "Actions", value: "name", sortable: false }
    ],
    product: [],
    editedItem: {
      case_no: "00",
      application_type: "sample application",
      current_task: "sample task",
      date_created: "01/01/2019",
      date_variation: "01/01/2019"
    },
    defaultItem: {
      case_no: "00",
      application_type: "sample application",
      current_task: "sample task",
      date_created: "01/01/2019",
      date_variation: "01/01/2019"
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.product = [
        {
          case_no: "00",
          application_type: "sample application",
          current_task: "sample task",
          date_created: "01/01/2019",
          date_variation: "01/01/2019"
        },
        {
          case_no: "01",
          application_type: "sample application",
          current_task: "sample task",
          date_created: "01/01/2019",
          date_variation: "01/01/2019"
        },
        {
          case_no: "02",
          application_type: "sample application",
          current_task: "sample task",
          date_created: "01/01/2019",
          date_variation: "01/01/2019"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.product.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.product.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.product.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.product[this.editedIndex], this.editedItem);
      } else {
        this.product.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style>
</style>
