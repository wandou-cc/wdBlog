import Vue from 'vue'
const tools = {
    install(Vue) {
        Vue.prototype.changeHeaderSeventName = (path, name, query = {}) => {
            Vue.$router.push({
                path,
                query
            });
            this.$store.commit("changeHeaderSeventhName", { seventhName: name });
        }
        Vue.prototype.formatTime = (fmt, date) => {
            date = new Date(+date)
            let ret;
            const opt = {
                "Y+": date.getFullYear().toString(),        // 年
                "m+": (date.getMonth() + 1).toString(),     // 月
                "d+": date.getDate().toString(),            // 日
                "H+": date.getHours().toString(),           // 时
                "M+": date.getMinutes().toString(),         // 分
                "S+": date.getSeconds().toString()          // 秒
            };
            for (let k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                };
            };
            return fmt;
        }
        Vue.prototype.formatHot = (articleCheck,articleLike,articleCollect) => {
            return (articleCheck + articleLike + articleCollect) * 6
        }
    }
}

Vue.use(tools)