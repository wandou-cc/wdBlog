<template>
  <div class="wd-publictext">
    <div>
         <el-link :icon="icon">{{title}}</el-link>
         <el-divider><i :class="dividerClass"></i></el-divider>
         <div>{{text}} </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    title:{
        type:String,
        default:""
    },
    icon:{
        type:String,
        default:"el-icon-edit"
    },
    dividerClass:{
        type:String,
        default:"el-icon-edit"
    }
  },
};
</script>

<style lang="less" scoped>
.wd-publictext {
    padding: 0.2rem;
    // width: 95%;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 0.05rem;
}
.el-divider {
    margin: 0.1rem 0;
}
.title {
    font-size: 0.16rem;
    font-weight: 700;
}
</style>