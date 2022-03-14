export const state = () => ({
    headerTitle: "",
    headerSeventhName: "",
    userInfo:{},
    authorityList:[]
})

export const mutations = {
    replaceState(state, query) {
        state = query
    },
    // 更改标题名称
    changeTechnologyTitle(state, query) {
        let { headerTitle } = query
        state.headerTitle = headerTitle
    },
    // 导航头 部分最后一个 显示名称
    changeHeaderSeventhName(state, query) {
        let { seventhName } = query
        state.headerSeventhName = seventhName
    },
    // 更改用户状态
    changeUserInfo(state,query) {
        state.userInfo = query
    },
    // 添加用户未登录可以访问的路由地址
    changAuthority(state,query) {
        state.authorityList = query
    }
}


