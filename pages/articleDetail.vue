<template>
  <div class="wd-article-detail">
    <div class="article-detail-header">
      <div class="header-info">
        <h1>{{ articleDetail.articleTitle }}</h1>
        <div class="header-info-data">
          <p>
            <i class="icon-time"></i>
            <span>{{
              formatTime("YYYY-mm-dd HH:MM:SS", articleDetail.createTime)
            }}</span>
          </p>
          <!-- 查看 -->
          <p>
            <i class="icon-check"></i>
            <span>{{ articleDetail.articleCheck }}</span>
          </p>
          <!-- 热度 -->
          <p>
            <i class="icon-hot"></i>
            <span>{{
              formatHot(
                articleDetail.articleCheck,
                articleDetail.articleLike,
                articleDetail.articleCollect
              )
            }}</span>
          </p>
          <!-- 喜欢 -->
          <p>
            <i class="icon-like"></i>
            <span>{{ articleDetail.articleLike }}</span>
          </p>
          <!-- 收藏 -->
          <p>
            <i class="icon-collect"></i>
            <span>{{ articleDetail.articleCollect }}</span>
          </p>
          <!-- 类型 -->
          <p>
            <i class="icon-type"></i>
            <span>{{ articleDetail.cifName }}</span>
          </p>
        </div>
      </div>
      <div class="header-outer">
        <p class="outer-motto">何处惹尘埃</p>
        <p class="outer-author">{{ articleDetail.userName }}</p>
      </div>
    </div>
    <div class="article-detail-main markdown-body">
      <div v-html="articleDetail.articleContent"></div>
    </div>
    <div class="article-detail-foot">
      <!-- 点赞 -->
      <div class="foot-like">
        <i class="like" v-if="!isLike" @click="clickLike(1)"></i>
        <i class="like-hover" v-else @click="clickLike(2)"></i>
      </div>
      <!-- 版权说明 -->
      <div class="foot-copyright">
        <p>作者：{{articleDetail.userName}}</p>
        <p> 作品采用： 《 署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0) 》许可协议授权</p>
      </div>

      <!-- 评论 -->
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleDetail: {},
      isLike:false,
      state:""
    };
  },
  mounted() {
    this.changeStateTitle();
    this.getarticleDetail();
  },
  methods: {
    changeStateTitle() {
      this.$store.commit("changeTechnologyTitle", { headerTitle: "标题标题" });
    },
    // 获取详情
    getarticleDetail() {
      this.$axios
        .post("/api/detailArticle", {
          articleId: this.$route.query.articleId,
          userid: "bf926190-1d0b-11ec-a5f7-2d648d641c9a",
        })
        .then((res) => {
          let data = res.data;
          if (data.code === 200) {
            this.articleDetail = data.list[0];
            this.isLike = this.articleDetail.isLike
          }
        });
    },
    // 添加喜欢/取消喜欢
    clickLike(value) {
      let form = {
        userId: "bf926190-1d0b-11ec-a5f7-2d648d641c9a",
        articleId: this.articleDetail.articleId,
      };
      let api;
      if (value === 1) {
        api = "/api/addMyLike";
        this.state = 'add'
      } else {
        api = "/api/cancelMyLike";
        this.state = 'reduce'
      }
      this.$axios.post(api, form).then((res) => {
        if (res.data.code === 200) {
          this.$notify({
            message: res.data.list,
            position: "bottom-right",
            type: "success",
          });
        } else {
          this.$notify({
            message: res.data.list,
            position: "bottom-right",
            type: "error",
          });
        }
        this.getarticleDetail();
      });
    }
  },
};
</script>

<style lang="less" scoped>
.wd-article-detail {
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
  .article-detail-foot {
     border-top: 1px solid #ccc;
    .foot-like {
      height: 0.4rem;
      width: 100%;
      i {
        display: inline-block;
        margin: 0 auto;
        display: block;
        width: 0.4rem;
        height: 0.4rem;
      }
      .like {
        background: url("../assets/icon/like.svg");
        background-size: 100% 100%;
      }
      .like-hover {
        background: url("../assets/icon/like-hover.svg");
        background-size: 100% 100%;
      }
    }
    .foot-copyright {
      border: 1px solid tomato;
      margin-top: 0.1rem;
      font-size: 0.14rem;
    }
  }
}
</style>