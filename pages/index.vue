<template>
  <div class="wd">
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
            <el-tab-pane
              v-for="item in navList"
              :key="item.id"
              :label="item.value"
            ></el-tab-pane>
          </el-tabs>
        </div>
        <div class="article-list">
          <ul>
            <li class="article-item" @click="jumpToDetail(1)">
              <div class="article-item-img"></div>
              <div class="article-item-content">
                <h3 class="article-title">标题</h3>
                <p class="article-desc">
                  这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介
                </p>
                <div class="article-foot">
                  <!-- 时间 -->
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
            </li> <li class="article-item" @click="jumpToDetail(1)">
              <div class="article-item-img"></div>
              <div class="article-item-content">
                <h3 class="article-title">标题</h3>
                <p class="article-desc">
                  这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介
                </p>
                <div class="article-foot">
                  <!-- 时间 -->
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
            </li> <li class="article-item" @click="jumpToDetail(1)">
              <div class="article-item-img"></div>
              <div class="article-item-content">
                <h3 class="article-title">标题</h3>
                <p class="article-desc">
                  这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介
                </p>
                <div class="article-foot">
                  <!-- 时间 -->
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
            </li> <li class="article-item" @click="jumpToDetail(1)">
              <div class="article-item-img"></div>
              <div class="article-item-content">
                <h3 class="article-title">标题</h3>
                <p class="article-desc">
                  这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介
                </p>
                <div class="article-foot">
                  <!-- 时间 -->
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
            </li> <li class="article-item" @click="jumpToDetail(1)">
              <div class="article-item-img"></div>
              <div class="article-item-content">
                <h3 class="article-title">标题</h3>
                <p class="article-desc">
                  这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介
                </p>
                <div class="article-foot">
                  <!-- 时间 -->
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
            </li> <li class="article-item" @click="jumpToDetail(1)">
              <div class="article-item-img"></div>
              <div class="article-item-content">
                <h3 class="article-title">标题</h3>
                <p class="article-desc">
                  这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介
                </p>
                <div class="article-foot">
                  <!-- 时间 -->
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
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="wd-view-aside">
      <aside></aside>
    </div>
  </div>
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
      activeName: "",
    };
  },
  mounted(){
    this.changeStateTitle()
  },
  methods: {
    handleClick(e) {
      console.log(e);
    },
    changeStateTitle(){
      this.$store.commit('changeTechnologyTitle',{headerTitle:'WD博客'})
    },
    jumpToDetail(articleId) {
      this.$router.push({
        path: "/articleDetail",
        query: {
          articleId,
          articleType:"vue"
        },
      });
    },
  },
};
</script>

<style scoped lang='less'>
.wd {
  display: flex;
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
        margin-bottom: 0.1rem;
        cursor: pointer;
        .article-item-img {
          height: 100%;
          width: 2rem;
          border: 1px solid royalblue;
        }
        .article-item-content {
          flex: 1;
          padding: 0.08rem;
          margin-left: 0.1rem;
          height: 100%;
          border: 1px solid tomato;
          .article-desc {
            margin: 0.08rem;
          }
          .article-foot {
            display: flex;
            margin: 0.08rem;
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
      }
    }
  }
  .wd-view-aside {
    width: 3rem;
    border: 1px solid palevioletred;
  }
}
</style>