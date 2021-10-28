export const state = () => ({
    technologyState: true,
    headerTitle: "",
    headerSeventhName: "",
    activeIndex:"2"
})

export const mutations = {
    replaceState(state, query) {
        state = query
    },
    // 更改展示状态
    chngeTechnologyState(state, query) {
        let { technologyState } = query
        // technologyState 为 true 的时候 展示 列表
        if (technologyState) {
            state.technologyState = true
        } else {
            state.technologyState = false
        }
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
    // 更改头部选中hover状态
    changeHeaderHoverIndex(state,query){
        let { activeIndex } = query
        state.activeIndex = activeIndex
    }
}
