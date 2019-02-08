<template>
  <v-card>
    <v-form>
      <v-container>
        <v-layout wrap>
          <v-flex xs12>
            <v-autocomplete
              v-model="friends"
              :items="people"
              box
              chips
              color="blue-grey lighten-2"
              label="Select"
              item-text="name"
              item-value="name"
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
                    <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-divider></v-divider>
  </v-card>
</template>
<script>
export default {
  data() {

    return {
      autoUpdate: true,
      friends: ["Sandra Adams", "Britta Holt"],
      isUpdating: false,
      people: [
        { header: "Group 1" },
        { name: "Sandra Adams" },
        { name: "Ali Connors" },
        { name: "Trevor Hansen" },
        { name: "Tucker Smith" },
        { divider: true },
        { header: "Group 2" },
        { name: "Britta Holt" },
        { name: "Jane Smith " },
        { name: "John Smith" },
        { name: "Sandra Williams" }
      ]
    };
  },

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    }
  },

  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    }
  }
};
</script>