<template>
  <div class="wd-user-sponsor main-content main-color">
    <el-tabs v-model="activeName" style="margin-bottom: 0.5rem">
      <el-tab-pane label="微信" name="vx">
        <img src="../../wdBlog/assets/img/lanternHills.png" alt="" />
      </el-tab-pane>
      <el-tab-pane label="支付宝" name="zfb">
        <img src="../../wdBlog/assets/img/LanternsLarge.png" alt="" />
      </el-tab-pane>
    </el-tabs>
    <publicText title="说一下" text="感谢各位赞助" />
    <div class="wd-block">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          icon="el-icon-info"
          color="#0bbd87"
          size="large"
          :timestamp="activity.sponsorTime"
        >
          {{ activity.sponsorName }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getSponsor();
  },
  data() {
    return {
      activeName: "vx",
      activities: [],
    };
  },
  methods: {
    getSponsor() {
      this.$axios.post("/api/getSponsor").then((res) => {
        let data = res.data;
        if (data.code === 200) {
          this.activities = data.list;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wd-user-sponsor {
  img {
    width: 1rem;
    height: 1rem;
  }
}
.wd-block {
  margin-top: 0.2rem;
}
</style>