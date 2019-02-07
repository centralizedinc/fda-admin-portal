<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div>
        PRODUCTS
        {{products}}
        PRIMARY
        {{primary}}
        SECONDARY
        {{secondary}}
        ADDITIONAL
        {{additional}}
        DECLARED
        {{declared}}
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {

    
    
    // data: () =>({
    //     products:[]
    // }),
    data(){
        return{
products: {},
primary: {},
secondary: {},
additional: {},
declared: {}
        }
         
   

    },
  created() {
    this.$store.dispatch("GET_PRODUCTS").then(result =>{
        console.log(JSON.stringify("###############################" + this.$store.state.reference_tables.products));
    this.products = this.$store.state.reference_tables.products
    console.log(JSON.stringify("###############################" + this.products));
    });

    this.$store.dispatch("GET_PRIMARY").then(result=> {
        console.log(JSON.stringify("###############################" + this.$store.state.reference_tables.primary));
    this.primary = this.$store.state.reference_tables.primary
    console.log(JSON.stringify("###############################" + this.primary));
    });
    
    this.$store.dispatch("GET_SECONDARY").then(result=> {
        console.log(JSON.stringify("###############################" + this.$store.state.reference_tables.secondary));
    this.secon0dary = this.$store.state.reference_tables.secondary
    console.log(JSON.stringify("###############################" + this.secondary));
    });
    
     this.$store.dispatch("GET_ADDITIONAL").then(result=> {
        console.log(JSON.stringify("###############################" + this.$store.state.reference_tables.additional));
    this.additional = this.$store.state.reference_tables.additional
    console.log(JSON.stringify("###############################" + this.additional));
    });

    this.$store.dispatch("GET_DECLARED_CAPITAL").then(result=> {
        console.log(JSON.stringify("###############################" + this.$store.state.reference_tables.declaredCapital));
    this.declared = this.$store.state.reference_tables.declaredCapital
    console.log(JSON.stringify("###############################" + this.declaredCapital));
    });
  }

};
</script>

<style>
</style>
