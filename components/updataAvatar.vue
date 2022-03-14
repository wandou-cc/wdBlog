<template>
  <div>
    <div class="wd-avatar" v-if="loginStater">
      <div class="avatar-main">
        <div class="avatar-main-top">
          <img :src="imgBaseUrl + firstAvatar.imgUrl" />
        </div>
        <div class="avatar-main-item">
          <img
            :src="imgBaseUrl + item.imgUrl"
            v-for="item in avatarList"
            :key="item.avatarId"
            @click="changeImg(item)"
          />
        </div>
        <div class="avatar-foot">
          <upload-img
            action="/api/addAvatar"
            @getImgInfo="getImgInfo"
          ></upload-img>
        </div>
        <div class="avator-button">
          <input
            type="submit"
            value="确定"
            class="forms_buttons-action"
            style="margin-right: 20px"
            @click="submitAvatar()"
          />
          <input
            type="submit"
            value="关闭"
            class="forms_buttons-action"
            @click="$emit('changeLoginStater')"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { imgBaseUrl } from "~/plugins/imgUrl";
export default {
  props: ["loginStater"],
  data() {
    return {
      avatarList: [],
      imgBaseUrl,
      firstAvatar: {},
    };
  },
  mounted() {
    this.randomAvatar();
  },
  methods: {
    randomAvatar() {
      this.$axios.post("/api/randomAvatar").then((res) => {
        let data = res.data;
        if (data.code === 200) {
          this.avatarList = data.list;
          this.firstAvatar = this.avatarList[0];
        } else {
          this.avatarList = [];
        }
      });
    },
    submitAvatar() {
      let user = JSON.parse(sessionStorage.getItem('store'));
      this.$axios
        .post("/api/confirmAvatar", {
          avatarId: this.firstAvatar.avatarId,
          userId: user.userInfo.userId,
        })
        .then((res) => {
          let data = res.data;
          if (data.code === 200) {
            this.succrssNotification('头像设置成功')
            this.$emit('changeLoginStater')
            this.$emit('getUserAvarat',this.firstAvatar.avatarId)
            this.$router.push("/")
            
          } else {
            this.errorNotification(data.msg)
          }
        });
    },
    changeImg(item) {
      this.firstAvatar = item;
    },
    getImgInfo(list) {
      this.firstAvatar = list;
    }
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
  padding: 0.5rem;
  width: 60%;
  height: 50%;
  background-color: #fff;
  border-radius: 0.05rem;
  display: flex;
  flex-direction: column;
}
.avatar-main-top {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.2rem;
}
.avatar-main-item {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  img {
    margin-left: 0.3rem;
    margin-bottom: 0.2rem;
    cursor: pointer;
  }
}
.avatar-foot {
  display: flex;
  justify-content: center;
}

.avator-button {
  display: flex;
  justify-content: flex-end;
}

img {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 0.03;
}

.forms_buttons-action {
  background-color: #00b3b0;
  border-radius: 3px;
  padding: 10px 25px;
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: background-color 0.2s ease-in-out;
}
.forms_buttons-action:hover {
  background-color: #e14641;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
}
input[type="submit"] {
  cursor: pointer;
}
input::-moz-placeholder {
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input:-ms-input-placeholder {
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input::placeholder {
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
</style>