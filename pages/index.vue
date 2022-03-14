<template>
  <div class="wd">
    <div class="wd-view-main main-content main-color">
      <!-- 轮播图 -->
      <div class="main-swiper">
        <el-skeleton class="main-skeleton100" :loading="loadingSwiper" animated>
          <template slot="template">
            <el-skeleton-item variant="image" class="main-skeleton100" />
          </template>
          <template>
            <el-carousel>
              <el-carousel-item v-for="item in bannerList" :key="item.bannerId">
                <img
                  :src="imgUrl + item.imgUrl"
                  :alt="item.title"
                  style="width: 100%; height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </template>
        </el-skeleton>
      </div>
      <!-- 随机四个 -->
      <div class="main-hot">
        <ul>
          <li
            v-for="(item, index) in hotList"
            :key="item.articleId"
            class="main-hot-item"
            @mouseenter="hotOpacity = index"
            @mouseleave="hotOpacity = ''"
          >
            <el-skeleton
              class="main-skeleton100"
              :loading="loadingHot"
              animated
            >
              <template slot="template">
                <el-skeleton-item variant="image" class="main-skeleton100" />
              </template>
              <img :src="imgUrl + item.imgUrl" />
              <transition name="fade">
                <KongmingLight
                  v-if="hotOpacity === index"
                  :title="item.articleTitle"
                />
              </transition>
            </el-skeleton>
          </li>
        </ul>
      </div>
      <!-- 文章列表 -->
      <div class="main-article">
        <div class="nav-list">
          <el-tabs v-model="submitForm.orders" type="card">
            <el-tab-pane
              :name="item.id"
              v-for="item in navList"
              :key="item.id"
              :label="item.value"
            ></el-tab-pane>
          </el-tabs>
        </div>
        <div class="article-list">
          <ul>
            <li
              class="article-item"
              @click="jumpToDetail(item.articleId, item.cifName)"
              v-for="item in articleList"
              :key="item.id"
            >
              <el-skeleton
                :loading="loadingArticle"
                animated
                :throttle="300"
                class="main-skeleton100 skeleton-article"
              >
                <template slot="template">
                  <div class="article-item-img">
                    <el-skeleton-item variant="image" style="height: 100%" />
                  </div>
                  <div class="article-item-content">
                    <el-skeleton-item
                      variant="h3"
                      style="height: 0.3rem; width: 30%"
                    />
                    <el-skeleton-item variant="text" style="height: 0.3rem" />
                    <el-skeleton-item
                      variant="text"
                      style="height: 0.3rem; width: 60%"
                    />
                  </div>
                </template>

                <template>
                  <div class="article-item-img">
                    <img :src="imgUrl + item.imgUrl" />
                  </div>
                  <div class="article-item-content">
                    <h3 class="article-title">{{ item.articleTitle }}</h3>
                    <p class="article-desc">{{ item.articleIntroduction }}</p>
                    <articleInfo :articleDetail="item" />
                  </div>
                </template>
              </el-skeleton>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="wd-view-aside main-aside main-color">
      <aside></aside>
    </div>
  </div>
</template>

<script>
import { imgBaseUrl } from "~/plugins/imgUrl";
export default {
  data() {
    return {
      loadingSwiper: true,
      loadingHot: true,
      loadingArticle: true,
      hotOpacity: "",
      imgUrl: "",
      articleList: [{}, {}, {}, {}],
      hotList: [{}, {}, {}],
      bannerList: [],
      navList: [
        { id: "createTime", value: "最新文章" },
        { id: "articleCheck", value: "阅读最多" },
        { id: "articleLike", value: "点赞最多" },
        { id: "articleCollect", value: "收藏最多" },
      ],

      submitForm: {
        page: 1,
        size: 10,
        orders: "createTime",
      },

    };
  },
  watch: {
    submitForm: {
      handler() {
        this.loadingArticle = true;
        this.getArticleList();
      },
      deep: true,
    },
  },

  /*
    天坑
     1.需要写全域名
     2.不能使用this.$router.push() 会报 跨域 错误 使用 window.location.href='/XXX'
     3.created中请求报错 404 
  */
  // async asyncData({ $axios }) {
  //   try {
  //     let submitForm = {
  //       page: 1,
  //       size: 10,
  //       orders: "createTime",
  //     };
  //     let resault = await $axios.post(`http://localhost:24082/api/articlelist`, submitForm);
  //     if (resault.data.code === 200) {
  //       return { articleList: resault.data.list };
  //     }
  //   } catch (error) {

  //   }
  // },
 
  mounted() {
    this.imgUrl = imgBaseUrl;
    this.getArticleList();
    this.changeStateTitle();
    this.random();
    this.getBanner();
  },
  methods: {
    getBanner() {
      this.$axios.post("/api/banner").then((res) => {
        let data = res.data;
        if (data.code === 200) {
          this.bannerList = data.list;
          this.loadingSwiper = false;
        }
      });
    },
    random() {
      this.$axios.post("/api/randomList").then((res) => {
        let data = res.data;
        if (data.code === 200) {
          this.hotList = data.list;
          this.loadingHot = false;
        } else {
          this.$message.error("hot出错");
        }
      });
    },
    getArticleList() {
      this.$axios.post("/api/articlelist", this.submitForm).then((res) => {
        let data = res.data;
        if (data.code === 200) {
          this.articleList = data.list;
          this.loadingArticle = false;
        } else {
          this.$message.error("列表出错");
        }
      });
    },
    changeStateTitle() {
      this.$store.commit("changeTechnologyTitle", { headerTitle: "WD博客" });
    },
    jumpToDetail(articleId, articleType) {
      this.$router.replace({
        path: "/articleDetail",
        query: {
          articleId,
          articleType,
        },
      });
    },
  },
};
</script>

<style scoped lang='less'>
@default-theme-color: #00b3b0;
.wd {
  position: relative;
  // display: flex;
  .wd-view-main {
    // flex: 1;
    .main-swiper {
      height: 3rem;
      width: 100%;
      margin-bottom: 0.1rem;
    }
    .main-hot {
      height: 2rem;
      width: 100%;
      ul {
        height: 100%;
        display: flex;
        justify-content: space-between;
        .main-hot-item {
          position: relative;
          height: 100%;
          width: calc(100% / 3);
          margin-right: 0.05rem;
          &:nth-last-child(1) {
            margin-right: 0;
          }
          img {
            width: 100%;
            height: 100%;
          }
          .fade-enter-active,
          .fade-leave-active {
            transition: opacity 0.5s;
          }
          .fade-enter,
          .fade-leave-to {
            opacity: 0;
          }
        }
      }
    }
    .main-article {
      margin-top: 0.1rem;
      width: 100%;
      /deep/.article-item {
        padding: 0.1rem;
        height: 1.5rem;
        margin-bottom: 0.1rem;
        cursor: pointer;
        &:hover {
          .article-item-img {
            &::before,
            &::after {
              width: 99%;
              height: 98%;
              opacity: 1;
              transition: width 0.2s linear, height 0.15s 0.2s linear,
                opacity 0s;
            }
          }
          box-shadow: 0px 0px 0.04rem #666;
          border-radius: 0.1rem;
        }
        .article-item-img {
          position: relative;
          height: 100%;
          width: 2rem;
          padding: 0.08rem;
          &::before,
          &::after {
            position: absolute;
            content: "";
            width: 0%;
            height: 0%;
            opacity: 0;
            transition: width 0.2s 0.15s linear, height 0.15s linear,
              opacity 0s 0.35s;
          }
          &::before {
            top: 0;
            left: 0;
            border-left: 2px solid @default-theme-color;
            border-top: 2px solid @default-theme-color;
          }
          &::after {
            bottom: 0;
            right: 0;
            border-right: 2px solid @default-theme-color;
            border-bottom: 2px solid @default-theme-color;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .article-item-content {
          flex: 1;
          height: 100%;
          margin: 0.08rem 0.2rem !important;

          .article-desc {
            margin: 0.12rem 0rem;
          }
        }
      }
      /deep/.skeleton-article {
        display: flex;
        justify-content: flex-start;
        .el-skeleton {
          display: flex;
        }
      }
    }
  }
  .wd-view-aside {
    position: absolute;
    right: 0;
    top: 0;
    height: 5rem;
  }
}
</style>