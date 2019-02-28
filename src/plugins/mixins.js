export default {
    install(Vue) {
        Vue.mixin({
            methods: {
                setHeaders: token => {
                    instance.defaults.headers.common['access_token'] = token
                    Vue.prototype.$http = instance
                },
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
                },
                getGroup(group_id) {
                    if (!this.isEmpty(this.$store.state.group_table.groups)) {
                        var group = null;
                        group = this.$store.state.group_table.groups.find(r => {
                            return r._id.toString() === group_id;
                        });
                        return group ? group : null;
                    } else {
                        return null
                    }
                },
                getProduct(product_id) {
                    if (!this.isEmpty(this.$store.state.reference_tables.products)) {
                        var product = null;
                        product = this.$store.state.reference_tables.products.find(r => {
                            return r._id.toString() === product_id;
                        });
                        return product ? product : null;
                    } else {
                        return null
                    }
                },
                getTask(task_id) {
                    if (!this.isEmpty(this.$store.state.task_tables.tasks)) {
                        var task = null;
                        task = this.$store.state.task_tables.tasks.find(r => {
                            return r._id.toString() === task_id;
                        });
                        return task ? task : null;
                    } else {
                        return null
                    }
                },
                status(stat) {
                    if (stat === 0) {
                        return "Registered (Awaiting Confirmation)";
                    } else if (stat === 1) {
                        return "Confirmed (Active but no active FDA License)";
                    } else if (stat === 2) {
                        return "Active";
                    } else if (stat === 3) {
                        return "Suspended";
                    } else if (stat === 4) {
                        return "Inactive (For Deletion)";
                    }
                },
                checkPassword(password) {
                    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
                    return re.test(password);
                },
                formatDate: (date, type) => {
                    if (!date) {
                        return ''
                    }
                    var format = {
                        hour12: true,
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }
                    if (!type) {
                        format.hour = '2-digit'
                        format.minute = '2-digit'
                    }
                    var dt = new Date(date).toLocaleString('en-US', format)
                    return dt
                },
                rol(role) {
                    if (role === "0") {
                        return "Admin";
                    } else if (role === "1") {
                        return "Approver";
                    } else if (role === "2") {
                        return "Encoder";
                    }
                },
                statProdLn(prodLine) {
                    if (prodLine === "0") {
                        return "Active";
                    } else if (prodLine === "1") {
                        return "`Inactive`";
                    }
                },
                vIcon(icon) {
                    if (icon === true) {
                        return "✔";
                    } else if (icon === false) {
                        return "✖";
                    }
                },
                logout() {
                    this.$store.dispatch("LOGOUT");
                    this.$router.push("/login");
                }
            }
        })
    }
}