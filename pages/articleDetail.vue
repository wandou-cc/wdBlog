<template>
  <div class="wd-article-detail main-color">
    <div class="article-detail-header">
      <div class="header-info">
        <h1>{{ articleDetail.articleTitle }}</h1>
        <articleInfo :articleDetail="articleDetail" />
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
        <el-link
          icon="el-icon-edit"
          :underline="false"
          style="float: left; padding: 0rem 0.1rem; border: 1px solid"
          >{{ articleDetail.cifName }}</el-link
        >

        <i
          class="like"
          v-if="!articleDetail.isLike"
          @click="clickLike('like', 1)"
        ></i>
        <i class="like-hover" v-else @click="clickLike('like', 2)"></i>

        <i
          class="collect"
          v-if="!articleDetail.iscollect"
          @click="clickLike('collect', 1)"
        ></i>
        <i class="collect-hover" v-else @click="clickLike('collect', 2)"></i>
      </div>
      <el-divider><i class="el-icon-sunny"></i></el-divider>

      <!-- 版权说明 -->
      <div class="foot-copyright">
        <p>
          <i class="el-icon-user-solid"></i> 作者：<el-link type="primary">{{
            articleDetail.userName
          }}</el-link>
        </p>
        <p>
          <i class="el-icon-info"></i> 作品采用：<el-link
            target="_blank"
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            type="primary"
            >《 署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)
            》</el-link
          >如需转载请著名作者以及地址
        </p>
      </div>
      <!-- 评论 -->
      <el-divider><i class="el-icon-chat-square"></i></el-divider>
      <div class="foot-comment">
        <el-form ref="submitForm" :model="submitForm">
          <el-form-item>
            <el-input
              type="textarea"
              :rows="6"
              show-word-limit
              maxlength="100"
              v-model="submitForm.commentContent"
            ></el-input>
          </el-form-item>
        </el-form>
        <template v-for="item in commentList">
          <div class="first-comment" :key="item.id">
            <div class="comment-left">
              <img src="" alt="" />
            </div>
            <div class="comment-right">
              <p>{{ item.name }}</p>
              <p>{{ item.comment }}</p>
              <div>
                <div>
                  <p>time</p>
                  <p>回复</p>
                </div>
                <p>浏览器</p>
              </div>
            </div>
          </div>
          <template v-if="item.children && item.children.length !== 0">
            <div
              v-for="_item in item.children"
              :key="_item.id"
              class="second-comment"
            >
              <div class="comment-left">
                <img src="" alt="" />
              </div>
              <div class="comment-right">
                <p>{{ _item.name }}</p>
                <p>{{ _item.comment }}</p>
                <div>
                  <div>
                    <p>time</p>
                    <p>回复</p>
                  </div>
                  <p>浏览器</p>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      articleDetail: {},
      submitForm: {
        commentContent: "",
      },
      commentList: [
        {
          id: 1,
          name: "小明",
          comment: "我是小明",
        },
        {
          id: 2,

          name: "小红",
          comment: "我是小红",
        },
        {
          id: 3,

          name: "小黑",
          comment: "我是小黑",
          children: [
            {
              id: 4,

              name: "小红",
              comment: "我是小红",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.getarticleDetail();
  },
  methods: {
    changeStateTitle() {
      this.$store.commit("changeTechnologyTitle", {
        headerTitle: this.articleDetail.articleTitle,
      });
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
            this.changeStateTitle();
          }
        });
    },
    // 添加喜欢/取消喜欢
    clickLike(type, value) {
      let form = {
        userId: "bf926190-1d0b-11ec-a5f7-2d648d641c9a",
        articleId: this.articleDetail.articleId,
      };
      let api;

      if (type === "like") {
        api = value === 1 ? "/api/addMyLike" : "/api/cancelMyLike";
      } else {
        api = value === 1 ? "/api/addMyCollect" : "/api/cancelMyCollect";
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
    },
  },
};
</script>

<style lang="less" scoped>
.wd-article-detail {
  width: 100%;
  .article-detail-header {
    height: 1rem;
    width: 100%;
    display: flex;
    margin-bottom: 0.1rem;
    border-bottom: 1px solid #ccc;
    .header-info {
      flex: 1;
      height: 100%;
      padding: 0.1rem;
    }
    .header-outer {
      width: 4rem;
      height: 100%;
      padding: 0.1rem;
      border-left: 1px solid rgb(121, 121, 121);
      text-align: center;
    }
  }
  .article-detail-main {
    border-bottom: 1px solid #ccc;
  }
  .article-detail-foot {
    .foot-like {
      margin: 0.2rem 0rem;
      height: 0.2rem;
      line-height: 0.2rem;
      width: 100%;
      text-align: right;
      i {
        display: inline-block;
        margin: 0 auto;
        width: 0.2rem;
        height: 0.2rem;
      }
      .like {
        background: url("../assets/icon/like.svg");
        background-size: 100% 100%;
      }
      .like-hover {
        background: url("../assets/icon/like-hover.svg");
        background-size: 100% 100%;
      }
      .collect {
        background: url("../assets/icon/collect.svg");
        background-size: 100% 100%;
      }
      .collect-hover {
        background: url("../assets/icon/collect-hover.svg");
        background-size: 100% 100%;
      }
    }
    .foot-copyright {
      margin: 0.1rem 0;
      font-size: 0.14rem;
      padding: 0.1rem;
      border-radius: 0.04rem;
      background-color: rgba(196, 233, 215, 0.5);
      p {
        margin: 0.1rem;
      }
    }
    .foot-comment {
      margin: 0.2rem 0rem;
      /deep/.el-form {
        .el-textarea {
          .el-textarea__inner {
            background-color: #eeeeee !important;
          }
        }
      }
      .first-comment {
        margin: 0.2rem 0rem;
        display: flex;
        height: 1rem;
        .comment-left {
          width: 1rem;
          margin-right: 0.2rem;
          border: 1px solid;
        }
        .comment-right {
          flex: 1;
        }
      }
    }
  }
}
</style>