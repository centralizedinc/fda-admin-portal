export default {
    install(Vue) {
        Vue.mixin({
            methods: {
                isEmpty(str) {
                    return !str || str.length === 0;
                },
                getRegion(region_id) {
                    if (!this.isEmpty(this.$store.state.regional_tables.regions)) {
                        var region = null;
                        region = this.$store.state.regional_tables.regions.find(r => {
                            return r._id.toString() === region_id;
                        });
                        // return region ? region.region_code + ' - ' + region.name : "";
                        return region ? region : null;
                    } else {
                        return null
                    }
                },
                getProvince(province_id) {
                    if (!this.isEmpty(this.$store.state.regional_tables.provinces)) {
                        var provinces = null;
                        provinces = this.$store.state.regional_tables.provinces.find(r => {
                            return r._id.toString() === province_id;
                        });
                        return provinces ? provinces : null;
                    } else {
                        return null
                    }
                }
            }
        })
    }
}