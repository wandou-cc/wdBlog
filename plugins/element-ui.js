import Vue from 'vue'
import {
    Button, Carousel, CarouselItem, Loading,
    Menu, MenuItem, Submenu, Row, Col, Card,
    Pagination, Form, FormItem, Input, Tag, Notification,
    Dropdown,DropdownItem,DropdownMenu,
    TabPane,Tabs,Option,Select,Upload,Skeleton,SkeletonItem,Divider,
    Link
} from 'element-ui'
/*按需引入*/
export default () => {
    Vue.use(Link)
    Vue.use(Divider)
    Vue.use(Skeleton)
    Vue.use(SkeletonItem)    
    Vue.use(Select)
    Vue.use(Upload)
    Vue.use(Option)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Dropdown)
    Vue.use(DropdownItem)
    Vue.use(DropdownMenu)
    Vue.use(Carousel)
    Vue.use(CarouselItem)
    Vue.use(Button)
    Vue.use(Loading)
    Vue.use(Menu)
    Vue.use(MenuItem)
    Vue.use(Submenu)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Card)
    Vue.use(Pagination)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Tag)
    Vue.prototype.$notify = Notification

}
