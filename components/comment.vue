<template>
  <div>
    <el-form ref="submitForm" :model="submitForm">
      <el-form-item>
        <el-input
          type="textarea"
          :rows="6"
          show-word-limit
          maxlength="100"
          v-model="submitForm.commentContent"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="sendComment"
          >我要评论</el-button
        >
      </el-form-item>
    </el-form>
    <div v-for="item in commentList" :key="item.id">
      <div class="first-comment">
        <div class="comment-left">
          <img src="" alt="" />
        </div>
        <div class="comment-right">
          <p>{{ item.name }}</p>
          <p>{{ item.comment }}</p>
          <div>
            <div>
              <p>time</p>
              <div>
                <el-popover placement="right" width="400" trigger="click">
                  <el-table :data="gridData">
                    <el-table-column
                      width="150"
                      property="date"
                      label="日期"
                    ></el-table-column>
                    <el-table-column
                      width="100"
                      property="name"
                      label="姓名"
                    ></el-table-column>
                    <el-table-column
                      width="300"
                      property="address"
                      label="地址"
                    ></el-table-column>
                  </el-table>
                  <button>灰度</button>
                </el-popover>
              </div>
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
    </div>
  </div>
</template>


<script>
export default {
  props: {
    articleId: {
      type: String,
    },
  },
  data() {
    return {
      commentList: [],
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      submitForm: {
        commentContent: "",
      },
    };
  },
  mounted() {
    this.getComment();
  },
  methods: {
    getComment() {
      this.$axios
        .post("/api/articleComment", { articleId: this.articleId })
        .then((res) => {
          if (res.data.code === 200) {
            this.commentList = res.data.list;
          }
        });
    },
    sendComment() {
      this.$axios
        .post("/api/addMyComment", {
          articleId: this.articleId,
          commentContent: this.submitForm.commentContent,
          userId: "bf926190-1d0b-11ec-a5f7-2d648d641c9a",
        })
        .then((res) => {
          this.submitForm.commentContent = "";
          if (res.data.code === 200) {
            this.succrssNotification(res.data.list)
            this.getComment();
          } else {
            this.errorNotification(res.data.list)

          }
        });
    },
  },
};
</script>

<style lang="less" scope>
.first-comment {
  margin: 0.2rem 0rem;
  display: flex;
  height: 1rem;
}
.comment-right {
  flex: 1;
}
.comment-left {
  width: 1rem;
  border: 1px solid;
  margin-right: 0.2rem;
}
.second-comment {
  margin: 0.2rem 0rem;
  display: flex;
  height: 1rem;
  margin-left: 1rem;
}
</style>