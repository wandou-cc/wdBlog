
export const state = () => ({
    technologyState: true,
    headerTitle: ""
})

export const mutations = {
    chngeTechnologyState(state,query){
        let {technologyState,headerTitle} = query
        // technologyState 为 true 的时候 展示 标题
        if(technologyState) {
            state.technologyState = true
            state.headerTitle = headerTitle
        } else {
            state.technologyState = false
        }

    }
}
