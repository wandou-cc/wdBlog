<template>
  <main>
    <div class="wd-view-main">
      <div class="main-swiper">
        <el-carousel :autoplay="false">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 class="medium" @click="bannerDetail(item)">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="main-hot">
        <ul>
          <li v-for="item in hotList" :key="item.id"></li>
        </ul>
      </div>
      <div class="main-article">
        <div class="nav-list">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane v-for='item in navList' :key="item.id" :label="item.value"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="article-list">
          <ul>
            <li class="article-item">
              <div class="article-item-img"></div>
              <div class="article-item-content">
                <h3>标题</h3>
                <p>这里是简介</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="wd-view-aside">
      <aside></aside>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      hotList: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      navList: [
        { id: 1, value: "最新文章" },
        { id: 2, value: "最热文章" },
        { id: 3, value: "点赞最多" },
        { id: 4, value: "收藏最多" },
      ],
      activeName:""
    };
  },
  methods:{
    handleClick(e){
      console.log(e)
    }
  }
};
</script>

<style scoped lang='less'>
main {
  width: 12rem;
  margin: auto;
  display: flex;
  margin-top: 0.1rem;

  .wd-view-main {
    flex: 1;
    margin-right: 0.1rem;
    .main-swiper {
      height: 3rem;
      width: 100%;
      border: 1px solid orange;
      margin-bottom: 0.1rem;
    }
    .main-hot {
      height: 2rem;
      width: 100%;
      border: 1px solid green;
      ul {
        height: 100%;
        display: flex;
        justify-content: space-between;
        li {
          height: 100%;
          width: calc(100% / 4);
          margin-right: 0.05rem;
          border: 1px solid tomato;
          &:nth-last-child(1) {
            margin-right: 0;
          }
        }
      }
    }
    .main-article {
      margin-top: 0.1rem;
      width: 100%;
      border: 1px solid teal;
      .article-item {
        display: flex;
        justify-content: flex-start;
        padding: 0.1rem;
        height: 1.5rem;
        border: 1px solid red;
        margin-bottom: .1rem;
        .article-item-img {
          height: 100%;
          width: 2rem;
          border: 1px solid royalblue;
        }
        .article-item-content {
          flex: 1;
          padding: 0.08rem;
          margin-left: .1rem;
          height: 100%;
          border: 1px solid tomato;
        }
      }
    }
  }
  .wd-view-aside {
    width: 3rem;
    border: 1px solid palevioletred;
  }
}
</style>