<template>
  <div id="wdblog">
    <header>
      <div class="wd-header">
        <div class="header-top">
          <div class="header-top-main">
            <div class="header-menu">
              <el-menu
                :default-active="headerHoverIndex"
                class="el-menu-demo"
                mode="horizontal"
                router
              >
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/adminAbout">关于</el-menu-item>
                <el-menu-item index="/userSponsor">赞助</el-menu-item>
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
                <el-menu-item index="/friendsLinks">友情链接</el-menu-item>
                <el-menu-item index="7" disabled v-if="headerSeventhName">{{
                  headerSeventhName
                }}</el-menu-item>
              </el-menu>
            </div>
            <div class="header-search">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
              <el-button
                class="btn btn-primary btn-shine"
                @click="contribute()"
              >
                我要投稿
              </el-button>
            </div>
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
              <!-- 显示 技术列表 -->
              <ul v-if="technologyState">
                <li v-for="item in technologyList" :key="item.id">
                  {{ item.name }}
                </li>
              </ul>
              <!-- 显示标题 -->
              <h1
                class="header-title"
                :class="{
                  'header-title-opacity': isAddTechnologyClass,
                  reveal: isAddTechnologyClass,
                }"
                @click="$router.push('/')"
              >
                {{ headerTitle }}
              </h1>
            </div>
            <el-dropdown
              class="my-account"
              @command="
                (item) => {
                  $router.push(item.path);
                }
              "
            >
              <el-button type="primary">
                我的账户
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <div class="account-avatar">
                  <p></p>
                </div>
                <el-dropdown-item
                  v-for="item in accountList"
                  :key="item.id"
                  :command="item"
                >
                  <span>{{ item.name }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
      lastUrl: Object.freeze(["/postArticle", "/userLogin", "/myArticle"]),
      accountList: Object.freeze([
        { path: "/userLogin", name: "注册/登录" },
        { path: "/postArticle", name: "发布文章" },
        { path: "/myArticle", name: "我的数据" },
        { path: "/adminPage", name: "管理页面" },
      ]),
      input: "",
      technologyList: [
        { id: 1, name: "js" },
        { id: 2, name: "ts" },
      ],
      isAddTechnologyClass: false,
      headerHoverIndex: "/",
    };
  },
  computed: {
    technologyState() {
      return this.$store.state.technologyState;
    },
    headerTitle() {
      return this.$store.state.headerTitle;
    },
    headerSeventhName() {
      return this.$store.state.headerSeventhName;
    },
  },
  watch: {
    // 根据路由来确定展示那个
    $route: {
      handler: function (item) {
        this.headerHoverIndex = item.path;
        let result = this.accountList.filter((_item) => {
          return _item.path === item.path;
        });
        if (result.length !== 0 || item.path === "/articleDetail") {
          this.$store.commit("changeHeaderSeventhName", {
            seventhName:
              (result.length !== 0 && result[0].name) || item.query.articleType,
          });
          this.headerHoverIndex = "7";
        } else {
          if (this.headerSeventhName) {
            this.$store.commit("changeHeaderSeventhName", {
              seventhName: "",
            });
          }
        }
      },
      deep: true,
      immediate: true,
    },

    headerHoverIndex() {
      this.$store.commit("changeHeaderHoverIndex", {
        activeIndex: this.headerHoverIndex,
      });
    },
  },
  mounted() {
    this.getStore();
    this.addEvent();
  },

  methods: {
    getStore() {
      if (sessionStorage.getItem("store") && this.$route.path !== "/") {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(sessionStorage.getItem("store"))
          )
        );
      }
    },
    addEvent() {
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
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state));
      });
      // 监听历史记录 实现返回前进 功能
      // window.onpopstate = (event) => {
      //   this.$store.commit("changeHeaderSeventhName", {
      //     seventhName: event.state.name,
      //   });
      // };
    },
    contribute() {
      this.$router.push({ path: "/postArticle" });
    },
  },
};
</script>

<style lang="less" scoped>
#wdblog {
  header {
    width: 100%;
    height: 1.1rem;
    background: @header-backage-color;
    box-shadow: 0.1rem 0 0.1rem #ccc;
  }
  .wd-header {
    height: 100%;
    .header-top {
      border-bottom: 1px solid #ccc;
      width: 100%;
      .header-top-main {
        display: flex;
        justify-content: space-between;
        width: @view-width;
        margin: auto;
      }
      .el-menu.el-menu--horizontal {
        border-bottom: none;
        .el-menu-item.is-disabled {
          cursor: pointer !important;
          opacity: 1 !important;
        }
      }
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
      width: 100%;
      position: fixed;
      top: -0.6rem;
      left: 0;
      transform: translateY(0.6rem);
      transition: transform 0.6s;
      background: @backage-color;
    }
    .content-scrolltop {
      width: @view-width !important;
      margin: auto;
    }

    .header-technology {
      width: 100%;
      height: 0.5rem;
      z-index: 9999;
      .header-content {
        width: @view-width;
        margin: auto;
        height: 100%;
        display: flex;
        justify-content: space-between;
        .my-account {
          display: flex;
          align-items: center;
        }
        ul {
          display: flex;
          height: 100%;
          li {
            line-height: 0.5rem;
            margin: 0 0.1rem;
            cursor: pointer;
            &:hover {
              color: @default-theme-color;
            }
          }
        }
        .header-title {
          opacity: 0;
          transform: scale(0);
          font-size: 0.2rem;
          line-height: 0.5rem;
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
    width: @view-width;
    margin: auto;
    margin-top: 0.1rem;
  }
}

.account-avatar {
  text-align: center;
  height: 0.6rem;
  p {
    height: 80%;
    margin: auto;
    width: 0.5rem;
    // border: 1px solid tomato;
    border-radius: 0.05rem;
  }
  i {
    font-size: 0.14rem;
  }
}
</style>

