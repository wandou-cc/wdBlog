<template>
  <div>
    <div class="wd-avatar" v-if="loginStater">
      <div class="avatar-main">
        <div class="avatar-main-top"><img src="" alt=""></div>
        <div>

        </div>
        <div>底部自己上传</div>
        <div>
          <div>上传</div>
          <div @click="$emit('changeLoginStater')">关闭</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["loginStater"],
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.wd-avatar {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(71, 71, 71, 0.6);
}
.avatar-main {
    width: 60%;
    height: 50%;
    background-color: #fff;
    border-radius: 0.05rem;
}
img {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: .03;
}
.avatar-main-top {
  margin: auto;
}
</style>