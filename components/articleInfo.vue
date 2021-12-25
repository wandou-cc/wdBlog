<template>
  <div>
    <div class="header-info-data">
      <p>
        <i class="icon-time"></i>
        <span>{{ articleDetail.createTime }}</span>
      </p>
      <!-- 查看 -->
      <p>
        <i class="icon-check"></i>
        <span>{{ articleDetail.articleCheck }}</span>
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
</template>

<script>
export default {
  props: ["articleDetail"],
};
</script>

<style lang='less' scope>
.icon-time {
  background-image: url("../assets/icon/time-hover.svg");
}
.icon-check {
  background-image: url("../assets/icon/readNum-hover.svg");
}
.icon-like {
  background-image: url("../assets/icon/likeNum-hover.svg");
}
.icon-hot {
  background-image: url("../assets/icon/hot-hover.svg");
}
.icon-great {
  background-image: url("../assets/icon/great-hover.svg");
}
.icon-collect {
  background-image: url("../assets/icon/collect-hover.svg");
}
.icon-type {
  background-image: url("../assets/icon/type-hover.svg");
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
</style>
