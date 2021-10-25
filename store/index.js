export const state = () => ({
    technologyState: true,
    headerTitle: ""
})

export const mutations = {
    // 更改展示状态
    chngeTechnologyState(state,query){
        let {technologyState} = query
        // technologyState 为 true 的时候 展示 列表
        if(technologyState) {
            state.technologyState = true
        } else {
            state.technologyState = false
        }
    },
    // 更改标题名称
    changeTechnologyTitle(state,query) {
        let {headerTitle} = query
        state.headerTitle = headerTitle
    }
}
