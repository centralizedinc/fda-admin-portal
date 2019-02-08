<template>
  <div>
    <v-toolbar flat color="white">
      <v-flex xs4>
        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
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
                <v-flex xs12>
                  <v-select
                    v-model="select"
                    :hint="`${select.state}`"
                    :items="items"
                    item-text="state"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.primary_type" label="Primary Type"></v-text-field>
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
      <v-dialog v-model="dialog1" max-width="800px">
        <v-card>
          <v-card-title
            primary-title
            class="headline"
            style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
          >
            <span class="headline">View Location</span>
          </v-card-title>
          <v-divider class="mx-3" inset vertical></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm4 md3>
                  <span class="text-xs-center">NAME</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.name}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md3>
                  <span class="text-xs-center">SECONDARY ACTIVITY</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.secondary_activity}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md3>
                  <span class="text-xs-center">ADDITIONAL ACTIVITY</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.additional_activity}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md3>
                  <span class="text-xs-center">DECLARED CAPITAL</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.declared_capital}}</v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md3>
                  <span class="text-xs-center">DATE CREATED</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.date_created}}</v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="close">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="primary" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.secondary_activities }}</td>
        <td>{{ props.item.additional_activities }}</td>
        <td>{{ props.item.decalred_capital }}</td>
        <td>{{ props.item.date_created }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)" flat icon color="primary">edit</v-icon>
          <v-icon small @click="viewItem(props.item)" flat icon color="primary">visibility</v-icon>
        </td>
      </template>
      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >Your search for "{{ search }}" found no results.</v-alert>
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
    dialog1: false,
    search: "",
    select: { state: "Product Type" },
    items: [
      { state: "Food" },
      { state: "Cosmetics" },
      { state: "Drugs" },
      { state: "Toy and Child article care" },
    ],
    headers: [
      { text: "NAME", value: "name" },
      { text: "SECONDARY ACTIVITY", value: "secondary_activity" },
      { text: "ADDITIONAL ACTIVITY", value: "additional_activity" },
      { text: "DECLARED CAPITAL", value: "declared_capital" },
      { text: "DATE CREATED", value: "date_created" },
      { text: "ACTIONS", value: "name", sortable: false }
    ],
    primary: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
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
    // VIEW
    this.$store.dispatch("GET_PRIMARY").then(result => {
      console.log(
        JSON.stringify(
          "###############################" +
            this.$store.state.reference_tables.primary
        )
      );
      this.primary = this.$store.state.reference_tables.primary;
      console.log(
        JSON.stringify("###############################" + this.primary)
      );
    });
  },

  methods: {
    add_primary() {
      this.$store.dispatch("ADD_PRIMARY", this.new_primary).then(result => {
        console.log("added");
      });
    },

    edit_primary(item) {
      this.dialog = true;
      this.$store.dispatch("EDIT_PRIMARY", item).then(result => {
        console.log("edited");
      });
    },
// 
    initialize() {
      this.primary = [
        {
          primary_type: "Manufacturer",
          created_by: "Vince",
          date_created: "November 06, 2018, 11:50 AM",
          modified_by: "Belo",
          modified_date: "December 06, 2018, 11:50 AM"
        },
        {
          primary_type: "Packer/Repacker",
          created_by: "Vince",
          date_created: "November 06, 2018, 11:50 AM",
          modified_by: "Belo",
          modified_date: "December 06, 2018, 11:50 AM"
        },
        {
          primary_type: "Traider",
          created_by: "Vince",
          date_created: "November 06, 2018, 11:50 AM",
          modified_by: "Belo",
          modified_date: "December 06, 2018, 11:50 AM"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.primary.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    viewItem(item) {
      this.editedIndex = this.primary.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog1 = true;
    },

    close() {
      this.dialog = false;
      this.dialog1 = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.primary[this.editedIndex], this.editedItem);
      } else {
        this.primary.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style>
</style>
