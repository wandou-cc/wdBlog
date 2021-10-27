<template>
  <div id="wdblog">
    <header>
      <div class="wd-header">
        <div class="header-main">
          <div class="header-menu">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="1">首页</el-menu-item>
              <el-menu-item index="3">关于</el-menu-item>
              <el-menu-item index="4">赞助</el-menu-item>
              <el-submenu index="5">
                <template slot="title">留言</template>
                <el-menu-item index="5-1">提交建议</el-menu-item>
                <el-menu-item index="5-2">提交问题</el-menu-item>
                <el-menu-item index="5-3">联系作者</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">工具</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
              </el-submenu>
              <el-menu-item index="6">友情链接</el-menu-item>
              <el-menu-item index="7">{{
                $route.query.articleType ? $route.query.articleType : ""
              }}</el-menu-item>
            </el-menu>
          </div>
          <div class="header-search">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
            <el-button
              class="btn btn-primary  btn-shine"
              @click="$router.push('/postArticle')"
              >我要投稿</el-button
            >
          </div>
        </div>
        <div
          class="header-technology"
          :class="{ 'header-scrolltop': isAddTechnologyClass }"
        >
          <div
            class="header-content"
            :class="{ 'content-scrolltop': isAddTechnologyClass }"
          >
            <div class="header-left">
              <ul v-if="technologyState">
                <li v-for="item in technologyList" :key="item.id">
                  {{ item.name }}
                </li>
              </ul>
              <h1
                class="header-title"
                :class="{ 'header-title-opacity': isAddTechnologyClass }"
                @click="$router.push('/')"
              >
                {{ headerTitle }}
              </h1>
            </div>
            <div>我呀账户</div>
          </div>
        </div>
      </div>
    </header>
    <main>
      <Nuxt />
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      technologyList: [
        { id: 1, name: "js" },
        { id: 2, name: "ts" },
      ],
      activeIndex: "1",
      isAddTechnologyClass: false,
    };
  },
  computed: {
    technologyState() {
      return this.$store.state.technologyState;
    },
    headerTitle() {
      return this.$store.state.headerTitle;
    },
  },
  watch: {
    $route: {
      handler: function (item) {
        if (item.query.articleType) {
          this.activeIndex = "7";
        }
      },
      deep: true,
      // 立即执行
      immediate: true,
    },
  },
  mounted() {
    this.addWindowScroll();
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    addWindowScroll() {
      window.onscroll = () => {
        if (document.scrollingElement.scrollTop > 200) {
          this.isAddTechnologyClass = true;
          this.$store.commit("chngeTechnologyState", {
            technologyState: false,
          });
        } else {
          this.isAddTechnologyClass = false;
          this.$store.commit("chngeTechnologyState", { technologyState: true });
        }
      };
    },
  },
};
</script>

<style lang="less" scoped>
#wdblog {
  header {
    width: 100%;
    height: 1.1rem;
    border: 1px solid #ccc;
  }
  .wd-header {
    width: 12rem;
    margin: auto;
    height: 100%;
    .header-main {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 0.6rem;
      // border: 1px solid springgreen;
      .header-search {
        line-height: 0.6rem;
        display: flex;
        align-items: center;
        .btn {
          width: 1.3rem;
          height: 0.4rem !important;
          --hue: 190;
          padding: 0.1rem;
          position: relative;
          font-size: 0.12rem;
          text-decoration: none;
          text-transform: uppercase;
          // background-color: hsl(190, 100%, 41%);
          // border: 1px solid hsl(190, 100%, 41%);

          outline: transparent;
          overflow: hidden;
          cursor: pointer;
          user-select: none;
          white-space: nowrap;
          height: 0.3rem;
          transition: 0.25s;

          &:hover {
            background: hsl(var(--hue), 100%, 31%);
          }

          &-primary {
            --hue: 187;
          }
          &-shine {
            &::before {
              position: absolute;
              content: "";
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(
                120deg,
                transparent,
                hsla(var(--hue), 100%, 41%, 0.5),
                transparent
              );
              transform: translateX(-100%);
              transition: 0.6s;
            }

            &:hover {
              background: transparent;
              box-shadow: 0 0 0.01rem 0.01rem hsla(var(--hue), 100%, 41%, 0.5);
            }

            &:hover::before {
              transform: translateX(100%);
            }
          }
        }
      }
    }
    .header-scrolltop {
      position: fixed;
      top: -0.6rem;
      left: 0;
      transform: translateY(0.6rem);
      transition: transform 0.6s;
    }
    .content-scrolltop {
      width: 12rem !important;
      margin: auto;
    }
    .header-technology {
      width: 100%;
      height: 0.5rem;
      z-index: 9999;
      line-height: 0.5rem;
      .header-content {
        display: flex;
        justify-content: space-between;
        ul {
          display: flex;
          li {
            margin: 0 0.1rem;
          }
        }
        .header-title {
          opacity: 0;
          transform: scale(0);
          font-size: 0.2rem;
        }
        .header-title-opacity {
          opacity: 1;
          transform: scale(1);
          transition: all 1s;
          cursor: pointer;
        }
      }
    }
  }
  main {
    width: 12rem;
    margin: auto;
    margin-top: 0.1rem;
  }
}
</style>
