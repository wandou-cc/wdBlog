import Vue from 'vue'
const tools = {
    install (Vue) {
        Vue.prototype.changeHeaderSeventName = (path,name,query = {}) => {
            console.log(Vue)
            return
            Vue.$router.push({
                path,
                query
            });
            this.$store.commit("changeHeaderSeventhName", { seventhName: name });
        }
    }
}

Vue.use(tools)