<template>
    
</template>

<script>
export default {

    created() {
        this.$store.dispatch('GET_PRODUCT')
        this.$store.state.productType
        console.log(JSON.stringify(productType))
    },
    

}
</script>

<style>

</style>
