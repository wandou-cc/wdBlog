<template>
  <div class="wd">
    <div class="wd-view-main">
      <div class="main-swiper">
        <el-carousel >
          <el-carousel-item v-for="item in bannerList" :key="item.bannerId">
            <img :src="imgUrl + item.imgUrl" :alt="item.title" style="width:100%;height:100%">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="main-hot">
        <ul>
          <li v-for="item in hotList" :key="item.articleId">
            <img :src="imgUrl + item.imgUrl" alt="" />
          </li>
        </ul>
      </div>
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
              <div class="article-item-img">
                <img :src="imgUrl + item.imgUrl" alt="" />
              </div>
              <div class="article-item-content">
                <h3 class="article-title">{{ item.articleTitle }}</h3>
                <p class="article-desc">{{ item.articleIntroduction }}</p>
                <div class="article-foot">
                  <!-- 时间 -->
                  <p>
                    <i class="icon-time"></i>
                    <span>{{
                      formatTime("YYYY-mm-dd HH:MM:SS", item.createTime)
                    }}</span>
                  </p>
                  <!-- 查看 -->
                  <p>
                    <i class="icon-check"></i>
                    <span>{{ item.articleCheck }}</span>
                  </p>
                  <!-- 热度 -->
                  <p>
                    <i class="icon-hot"></i>
                    <span>{{
                      formatHot(
                        item.articleCheck,
                        item.articleLike,
                        item.articleCollect
                      )
                    }}</span>
                  </p>
                  <!-- 喜欢 -->
                  <p>
                    <i class="icon-like"></i>
                    <span>{{ item.articleLike }}</span>
                  </p>
                  <!-- 点赞 -->
                  <!-- <p>
                    <i class="icon-great"></i>
                    <span>1000</span>
                  </p> -->
                  <!-- 收藏 -->
                  <p>
                    <i class="icon-collect"></i>
                    <span>{{ item.articleCollect }}</span>
                  </p>
                  <!-- 类型 -->
                  <p>
                    <i class="icon-type"></i>
                    <span>{{ item.cifName }}</span>
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
import { imgBaseUrl } from "~/plugins/imgUrl";
export default {
  data() {
    return {
      imgUrl: "",
      articleList: [],
      hotList: [],
      bannerList:[],
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
    submitFormNew: {
      handler() {
        this.getArticleList();
      },
    },
    deep: true,
  },
  computed: {
    submitFormNew() {
      return JSON.parse(JSON.stringify(this.submitForm));
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
    this.getBanner()
  },
  methods: {
    getBanner() {
      this.$axios.post("/api/banner").then((res)=>{
        let data = res.data
        if(data.code === 200) {
          this.bannerList = data.list
        }
      })
    },
    random() {
      this.$axios.post("/api/randomList").then((res) => {
        let data = res.data;
        if (data.code === 200) {
          this.hotList = data.list;
        } else {
          this.$message.error("hot出错");
        }
      });
    },
    getArticleList() {
      this.$axios.post("/api/articlelist", this.submitFormNew).then((res) => {
        let data = res.data;
        if (data.code === 200) {
          this.articleList = data.list;
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
.wd {
  display: flex;
  .wd-view-main {
    flex: 1;
    margin-right: 0.1rem;
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
        li {
          border: 1px solid rgb(32, 32, 32);
          height: 100%;
          width: calc(100% / 4);
          margin-right: 0.05rem;
          &:nth-last-child(1) {
            margin-right: 0;
          }
          img {
            width: 100%;
            height: 100%;
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
          img {
            width: 100%;
            height: 100%;
          }
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