import { Notification } from "element-ui"
export default ({ app, store }) => {
    app.router.beforeResolve((to, form, next) => {
        // 浏览器环境下执行
        if (process.client) {
            let store = JSON.parse(sessionStorage.getItem('store'))
            if (!store) {
                next()
            } else {
                let authorityList = store.authorityList
                let userInfo = store.userInfo
                let path = to.path
                let result = authorityList.filter(item => {
                    return item.authorityPath === path
                })
                if (path === '/' || result.length !== 0 || userInfo.token) {
                    next()
                } else {
                    Notification({
                        message: "您还没有登录请先登录",
                        position: "bottom-right",
                        type: "error",
                    });
                    // app.router.push("/userLogin")
                }
            }
        } else {
            next()
        }
    })
}