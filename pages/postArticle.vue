<template>
  <div class="wd-postEditor">
    <el-form :model="submitForm">
      <el-form-item>
        <div class="article-title">
          <el-input
            v-model="submitForm.title"
            placeholder="请输入标题"
          ></el-input>
          <el-button class="buttton" type="primary" @click="isShowOuter"
            >立即创建</el-button
          >
        </div>
      </el-form-item>
      <el-form-item>
        <no-ssr>
          <mavon-editor
            :toolbars="markdownOption"
            v-model="submitForm.content"
            style="width: 100%; height: calc(100vh - 2.5rem)"
            :ishljs="true"
            @change="updateDoc"
            @save="saveDoc"
          />
        </no-ssr>
      </el-form-item>
    </el-form>
    <div class="create-now" v-if="isShowRelease">
      <el-form :model="submitForm" label-width="80px">
        <el-form-item label="文章分类">
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
        <el-form-item label="来源">
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

        <el-form-item label="来源地址" v-if="submitForm.isOriginal === 1">
          <el-input
            clearable
            v-model="submitForm.reprintSource"
            placeholder="请输入来源地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章封面">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章简介">
          <el-input
            clearable
            type="textarea"
            v-model="submitForm.articleIntroduction"
            placeholder="请输入文章简介"
          ></el-input>
        </el-form-item>
        <el-form-item label="开启评论">
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
          <el-button @click="isShowRelease = false">取消/关闭</el-button>
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
          value: 0,
          label: "开启",
        },
        {
          value: 1,
          label: "关闭",
        },
      ]),
      classificationList: [],
      submitForm: {
        title: "",
        content: "",
        cifId: "",
        isOriginal: "",
        reprintSource: "",
        articleIntroduction: "",
        articleImg: "",
        isComment:0
      },
      isShowRelease: false,
      imageUrl: "",
    };
  },
  mounted() {
    this.changeStateTitle();
  },
  methods: {
    updateDoc(e) {
      console.log(e);
    },
    saveDoc(e) {
      console.log(e);
    },

    determineRelease() {
      console.log(this.submitForm)
    },
    changeStateTitle() {
      this.$store.commit("changeTechnologyTitle", { headerTitle: "添加博客" });
    },
    isShowOuter() {
      this.isShowRelease = !this.isShowRelease;
      // this.articleIntroduction = this.submitForm.content.slice(0,99);
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 0.06rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 0.28rem;
    color: #8c939d;
    width: 2rem;
    height: 1.4rem;
    line-height: 1.4rem;
    text-align: center;
  }

  .avatar {
    width: 2rem;
    height: 1.4rem;
    display: block;
  }
}
</style>
