<template>
  <div class="wd-postEditor">
    <el-form :model="submitForm" ref="submitFormOne">
      <el-form-item prop="articleTitle">
        <div class="article-title">
          <el-input
            v-model="submitForm.articleTitle"
            placeholder="请输入标题"
          ></el-input>
          <el-button class="buttton" type="primary" @click="isShowOuter"
            >立即创建</el-button
          >
        </div>
      </el-form-item>
      <el-form-item prop="articleContent">
        <no-ssr>
          <mavon-editor
            :toolbars="markdownOption"
            style="width: 100%; height: calc(100vh - 2.5rem)"
            :ishljs="true"
            ref="mavonEditor"
            @change="updateDoc"
          />
        </no-ssr>
      </el-form-item>
    </el-form>
    <div class="create-now" v-if="isShowRelease">
      <el-form :model="submitForm" label-width="80px" ref="submitFormTwo">
        <el-form-item label="文章分类" prop="cifId">
          <el-select
            v-model="submitForm.cifId"
            clearable
            placeholder="请选择文章分类"
          >
            <el-option
              v-for="item in classificationList"
              :key="item.cifId"
              :label="item.cifName"
              :value="item.cifId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源" prop="isOriginal">
          <el-select
            v-model="submitForm.isOriginal"
            placeholder="请选择文章来源"
            clearable
          >
            <el-option
              v-for="item in sourceList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="来源地址" v-if="submitForm.isOriginal === 1" prop="reprintSource">
          <el-input
            clearable
            v-model="submitForm.reprintSource"
            placeholder="请输入来源地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章封面">
          <upload-img
            action="/api/addCover"
            @getImgInfo="getImgInfo"
          ></upload-img>
        </el-form-item>
        <el-form-item label="文章简介" prop="articleIntroduction">
          <el-input
            clearable
            type="textarea"
            v-model="submitForm.articleIntroduction"
            placeholder="请输入文章简介"
          ></el-input>
        </el-form-item>
        <el-form-item label="开启评论" prop="isComment">
          <el-select
            v-model="submitForm.isComment"
            placeholder="是否开启评论功能"
            clearable
          >
            <el-option
              v-for="item in commentList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="determineRelease">确定发布</el-button>
          <el-button @click="cancel">取消/关闭</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markdownOption: Object.freeze({
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }),
      sourceList: Object.freeze([
        {
          value: 0,
          label: "原创",
        },
        {
          value: 1,
          label: "转载",
        },
      ]),
      commentList: Object.freeze([
        {
          value: 1,
          label: "开启",
        },
        {
          value: 0,
          label: "关闭",
        },
      ]),
      classificationList: [],
      submitForm: {
        articleTitle: "",
        articleContent: "",
        cifId: "",
        isOriginal: "",
        reprintSource: "",
        articleIntroduction: "",
        articleImg: "",
        isComment: 1,
        userId:'bf926190-1d0b-11ec-a5f7-2d648d641c9a'
      },
      isShowRelease: false,
      imageUrl: "",
    };
  },
  watch: {
    isShowRelease() {
      this.isShowRelease && this.getTypeInfo();
    },
  },
  mounted() {
    this.changeStateTitle();
  },
  // async asyncData({ $axios }) {
  //   const classificationList = await $axios.$post("/getCif");
  //   console.log(classificationList);
  //   return { classificationList: classificationList.list };
  // },
  methods: {
    changeStateTitle() {
      this.$store.commit("changeTechnologyTitle", { headerTitle: "添加博客" });
    },
    determineRelease() {
      this.$axios.post("/api/addArticle", this.submitForm).then((res) => {
        if (res.data.code === 200) {
          this.$notify({
            message: "添加成功,请等待审核",
            position: "bottom-right",
            type: 'success'
          });
          this.isShowRelease = false
        }else {
          this.$notify({
            message: res.data.msg,
            position: "bottom-right",
            type: 'error'
          });
        }
        this.reset()
      });
    },
    cancel(){
      this.isShowRelease = false;
      this.reset();
    },
    updateDoc(value,html) {
      this.submitForm.articleContent = html;
    },
    isShowOuter() {
      this.isShowRelease = !this.isShowRelease;
    },
    getImgInfo(imgid) {
      this.submitForm.articleImg = imgid;
    },
    getTypeInfo() {
      this.$axios.post("/api/getCif").then((res) => {
        if (res.data.code === 200) {
          this.classificationList = res.data.list;
        }
      });
    },
    reset(){
      this.$refs.submitFormOne.resetFields();
      this.$refs.submitFormTwo.resetFields();
      this.submitForm.articleImg = '';
      this.submitForm.articleContent = '';
    }
  },
};
</script>

<style lang="less" scoped>
.wd-postEditor {
  z-index: 1;
  position: relative;
  .article-title {
    display: flex;
    .el-button {
      margin-left: 0.1rem;
    }
  }
  .create-now {
    padding: 0.1rem;
    width: 4rem;
    border: 1px solid #ccc;
    background: #fff;
    position: absolute;
    top: 0.5rem;
    right: 0;
    z-index: 9999;
  }
  /deep/.el-form {
    .el-form-item {
      .el-input__inner {
        border: none !important;
        border-bottom: 1px solid #ccc !important;
      }
    }
  }
}
</style>
