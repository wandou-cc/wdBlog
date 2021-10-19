<template>
  <main>
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
            
          </div>
      </div>
    </div>

    <div class="wd-view-aside">
      <aside></aside>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      hotList: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    };
  },
};
</script>

<style scoped lang='less'>
main {
  width: 12rem;
  margin: auto;
  display: flex;
  margin-top: 0.1rem;

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
      height: 20vh;
      border: 1px solid teal;
    }
  }
  .wd-view-aside {
    width: 3rem;
    border: 1px solid palevioletred;
  }
}
</style>