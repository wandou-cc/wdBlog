<template>
  <div class="wd-article-detail">
    <div class="article-detail-header">
      <div class="header-info">
        <h1>vue面试</h1>
        <div class="header-info-data">
          <p>
            <i class="icon-time"></i>
            <span>2021-10-12</span>
          </p>
          <!-- 查看 -->
          <p>
            <i class="icon-check"></i>
            <span>10000</span>
          </p>
          <!-- 热度 -->
          <p>
            <i class="icon-hot"></i>
            <span>10000</span>
          </p>
          <!-- 喜欢 -->
          <p>
            <i class="icon-like"></i>
            <span>10000</span>
          </p>
          <!-- 点赞 -->
          <p>
            <i class="icon-great"></i>
            <span>1000</span>
          </p>
          <!-- 收藏 -->
          <p>
            <i class="icon-collect"></i>
            <span>11000</span>
          </p>
          <!-- 类型 -->
          <p>
            <i class="icon-type"></i>
            <span>vue</span>
          </p>
        </div>
      </div>
      <div class="header-outer">
        <p class="outer-motto">何处惹尘埃</p>
        <p class="outer-author">豌豆</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      
    }
  },
  mounted(){
    this.changeStateTitle()
  },
  methods:{
    changeStateTitle(){
      this.$store.commit('changeTechnologyTitle',{headerTitle:'标题标题'})
    }
  }
};
</script>

<style lang="less" scoped>
.wd-article-detail {
  height: @view-width;
  .article-detail-header {
    height: 1rem;
    width: 100%;
    display: flex;
    .header-info {
      flex: 1;
      height: 100%;
      padding: 0.1rem;
      h1 {
        // margin-bottom: ;
      }

      .header-info-data {
        display: flex;
        padding: 0.1rem 0.1rem 0.1rem 0;
        p {
          height: 0.2rem;
          // width: 0.8rem;
          margin-right: 0.08rem;
          text-align: left;
          i {
            display: inline-block;
            width: 0.2rem;
            height: 100%;
            background-size: 100%;
            background-position: center center;
            vertical-align: middle;
          }
          span {
            font-size: 0.1rem;
          }
        }
      }
    }
    .header-outer {
      width: 4rem;
      height: 100%;
      padding: 0.1rem;
      border-left: 1px solid rgb(121, 121, 121);
      text-align: center;
    }
  }
}
</style>