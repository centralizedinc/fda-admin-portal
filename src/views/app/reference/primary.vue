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
      <!-- ADD | EDIT -->
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
                  <v-text-field v-model="editedItem.primary_type" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="additional"
                    :disabled="isUpdating"
                    :items="additional_items"
                    box
                    chips
                    label="Additional Activity"
                    item-text="name"
                    item-value="_id"
                    multiple
                  >
                    <template slot="selection" slot-scope="data">
                      <v-chip
                        :selected="data.selected"
                        close
                        class="chip--select-multi"
                        @input="remove(data.item)"
                      >{{ data.item.name }}</v-chip>
                    </template>
                    <template slot="item" slot-scope="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="friendsOne"
                    :disabled="isUpdating"
                    :items="peopleOne"
                    box
                    chips
                    label="Declared Capital"
                    item-text="nameOne"
                    item-value="nameOne"
                    multiple
                  >
                    <template slot="selection" slot-scope="data">
                      <v-chip
                        :selected="data.selected"
                        close
                        class="chip--select-multi"
                        @input="remove(data.item)"
                      >{{ data.item.nameOne }}</v-chip>
                    </template>
                    <template slot="item" slot-scope="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.nameOne"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
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
                <v-flex xs12 md3 offset-xs1>
                  <span class="text-xs-center">Primary Type</span>
                  <v-divider></v-divider>
                  <v-card-text>{{editedItem.name}}</v-card-text>
                </v-flex>
                <v-flex xs12 md3 offset-xs1>
                  <span class="text-xs-center">Date Created</span>
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
    </v-data-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialog1: false,
    search: "",
    select: { state: "Additional Activity" },
    selectOne: { stateOne: "Declared Capital" },
    autoUpdate: true,
    additional: ["Exporter of own product"],
    friendsOne: ["Exporter of own product"],
    isUpdating: false,
    additional_items: [
      { header: "Additional Activity" },
      { name: "Exporter of own product" },
      { name: "Importer of Raw Materials for own use" },
      { name: "Wholesaler of own product" },
      {
        name:
          "Importer of finished pharmaceutical products locally repacked/packed"
      }
    ],
    peopleOne: [
      { headerOne: "Declared Capital" },
      { nameOne: "Not Applicable" },
      { nameOne: "250K and Below" },
      { nameOne: "Over 250K and Below 500K" },
      { nameOne: "500K to Below 1M" },
      { nameOne: "5M to Below 5M" },
      { nameOne: "10M to Below 20M" },
      { nameOne: "20M to Below 50M" },
      { nameOne: "50M and Above" }
    ],
    headers: [
      { text: "Primary Activity", value: "primary_type" },
      { text: "Date Created", value: "date_created" },
      { text: "Actions", value: "name", sortable: false }
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
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },

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
    //additional
    this.$store.dispatch("GET_ADDITIONAL").then(result => {
      this.additional_items = this.$store.state.reference_tables.additional;
    });
  },

  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },

    remove(item) {
      const index = this.friendsOne.indexOf(item.nameOne);
      if (index >= 0) this.friendsOne.splice(index, 1);
    },

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
      this.primary = [];
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
