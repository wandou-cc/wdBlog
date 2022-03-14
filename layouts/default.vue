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
                <el-menu-item index="" class="wd-logo"
                  ><img src="../assets/icon/logo1.png" alt="豌豆博客"
                /></el-menu-item>
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/adminAbout">关于</el-menu-item>
                <el-menu-item index="/userSponsor">赞助</el-menu-item>
                <!-- <el-menu-item index="/friendsLinks">友情链接</el-menu-item> -->

                <el-menu-item index="/leaveMessage">反馈/留言</el-menu-item>
                <!-- <el-submenu index="2">
                  <template slot="title">工具</template>
                  <el-menu-item index="2-1">选项1</el-menu-item>
                </el-submenu> -->
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
              <ul v-if="!isAddTechnologyClass">
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
                  jumpToAccount(item);
                }
              "
            >
              <el-button type="primary">
                我的账户
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <div class="account-avatar">
                  <p>
                    <img :src="imgBaseUrl + avaratImg" v-if="avaratImg" />
                    <img src="../assets/icon/logo.png" v-else />
                  </p>
                </div>
                <template v-for="item in accountList">
                  <el-dropdown-item :key="item.id" :command="item">
                    <span>{{ item.name }}</span>
                  </el-dropdown-item>
                </template>
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
import { imgBaseUrl } from "~/plugins/imgUrl";
export default {
  data() {
    return {
      imgBaseUrl,
      accountList: [
        { path: "/userLogin", name: "注册/登录" },
        { path: "/postArticle", name: "发布文章" },
        { path: "/myArticle", name: "我的数据" },
        { path: "/adminPage", name: "管理页面" },
      ],
      input: "",
      technologyList: [
        { id: 1, name: "js" },
        { id: 2, name: "ts" },
      ],
      isAddTechnologyClass: false,
      headerHoverIndex: "/",
      avaratImg: "",
    };
  },
  computed: {
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
        // if (process.client) {
        //   this.beforeEach(item.path);
        // }

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
    "$store.state": {
      handler(n) {
        this.avaratImg = n.userInfo.userAvatar;
        if (n.userInfo.token) {
          this.accountList[0] = { path: "", name: "退出登录" };
        } else {
          this.accountList[0] = { path: "/userLogin", name: "注册/登录" };
        }
        sessionStorage.setItem("store", JSON.stringify(n));
      },
      deep: true,
    },
  },

  mounted() {
    this.getStore();
    this.addEvent();
    this.getAuthority();
  },

  methods: {
    // beforeEach(path) {
    //   debugger
    //   let store = JSON.parse(sessionStorage.getItem("store"));
    //   let authorityList = store.authorityList;
    //   let userInfo = store.userInfo;
    //   let authorityResult = authorityList.filter((item) => {
    //     return item.authorityPath === path;
    //   });
    //   console.log(authorityList)
    //   console.log(authorityResult)
    //   if (authorityResult.length === 0 && !userInfo.token) {
    //     this.errorNotification("请先登录");
    //     this.$router.push("/userLogin");
    //     return;
    //   }
    // },
    getStore() {
      if (sessionStorage.getItem("store")) {
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
        } else {
          this.isAddTechnologyClass = false;
        }
      };
    },
    jumpToAccount(item) {
      if (item.name === "退出登录") {
        let store = JSON.parse(sessionStorage.getItem("store"));
        store.userInfo = {};
        sessionStorage.setItem("store", JSON.stringify(store));
        this.getStore();
        this.$router.push('/');
        return;
      }
      this.$router.push(item.path);
    },
    contribute() {
      this.$router.push({ path: "/postArticle" });
    },
    getAuthority() {
      this.$axios.post("/api/getauthority").then((res) => {
        let data = res.data;
        if (data.code === 200) {
          this.$store.commit("changAuthority", data.list);
        } else {
          this.$store.commit("changAuthority", {
            authorityId: 1,
            authorityName: "首页",
            authorityPath: "/",
          });
        }
      });
    },
     handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
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
    .wd-logo {
      display: flex;
      align-items: center;
      img {
        width: 0.6rem;
        height: 0.35rem;
      }
    }
    .header-top {
      border-bottom: 1px solid #ccc;
      width: 100%;
      padding: 0rem 0.5rem;
      .header-top-main {
        display: flex;
        justify-content: space-between;
        // width: @view-width;
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
    min-height: calc(100vh - 1.2rem);
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
    border-radius: 0.05rem;
    img {
      height: 100%;
      width: 100%;
    }
  }
  i {
    font-size: 0.14rem;
  }
}
</style>

