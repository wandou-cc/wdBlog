<template>
  <div class="kongming-container">
    <div class="container__elements">
      <div class="pill">
        <span
          v-for="item in 24"
          :key="item"
          :class="'star' + item"
          class="star"
        ></span>
        <img class="lanternHills" src="../assets/img/lanternHills.png" />
        <p class="kongming-title">{{ title }}</p>
        <div class="lanternContainer">
          <div v-for="item in 6" :key="item" :class="'lanternX' + item">
            <img
              :class="'lanternY' + item"
              src="../assets/img/LanternsLarge.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style scoped>
.kongming-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  /* background: #ece8fc; */
}
.container__elements {
  height: 100%;
  width: 100%;
}

.pill {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  /* background: linear-gradient(to bottom, #312952 0%, #5A49DF 35%, #7b6bc6 100%); */
  overflow: hidden;
}
.kongming-title {
  z-index: 999;
  color: #fff;
  padding: 0.1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}

.lanternHills {
  position: absolute;
  bottom: -0.5rem;
  width: 100%;
}

.star {
  background-color: white;
  position: absolute;
  border-radius: 50%;
}

.star1 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 0.15rem;
  top: 1.5rem;
}

.star2 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 0.19rem;
  top: 1.6rem;
}

.star3 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 68px;
  top: 75px;
}

.star4 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 67px;
  top: 26px;
}

.star5 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 19px;
  top: 16px;
}

.star6 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 103px;
  top: 147px;
}

.star7 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 115px;
  top: 65px;
}

.star8 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 73px;
  top: 21px;
}

.star9 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 107px;
}

.star10 {
  width: 1px;
  height: 1px;
  transform: scale(1.1);
  left: 158px;
  top: 64px;
}

.star11 {
  width: 1px;
  height: 1px;
  transform: scale(1.1);
  left: 29px;
  top: 50px;
}

.star12 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 29px;
  top: 58px;
}

.star13 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 92px;
}

.star14 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 149px;
  top: 114px;
}

.star15 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 0.39rem;
  top: 0.86rem;
}

.star16 {
  width: 1px;
  height: 1px;
  transform: scale(1.1);
  left: 58px;
  top: 69px;
}

.star17 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 158px;
  top: 2px;
}

.star18 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 172px;
  top: 13px;
}

.star19 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 99px;
  top: 150px;
}

.star20 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 175px;
  top: 165px;
}

.star21 {
  width: 1px;
  height: 1px;
  transform: scale(1.1);
  left: 145px;
  top: 50px;
}

.star22 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 46px;
  top: 123px;
}

.star23 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 77px;
  top: 2px;
}

.star24 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 41px;
  top: 177px;
}

.star25 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 42px;
  top: 19px;
}

.lanternX1 {
  position: absolute;
  bottom: -80px;
  left: 97px;
  transform: translateX(0);
  animation-name: lanternX1;
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY1 {
  display: inline block;
  width: 42px;
  z-index: 42000;
  animation-name: lanternY;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 1s;
}

@keyframes lanternX1 {
  50% {
    transform: translateX(49px);
  }
}
@keyframes lanternY {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
  100% {
    transform: translateY(-400px);
  }
}
.lanternX2 {
  position: absolute;
  bottom: -80px;
  left: 78px;
  transform: translateX(0);
  animation-name: lanternX2;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY2 {
  display: inline block;
  width: 44px;
  z-index: 44000;
  animation-name: lanternY;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 4s;
}

@keyframes lanternX2 {
  50% {
    transform: translateX(67px);
  }
}
@keyframes lanternY {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
  100% {
    transform: translateY(-400px);
  }
}
.lanternX3 {
  position: absolute;
  bottom: -80px;
  left: 9px;
  transform: translateX(0);
  animation-name: lanternX3;
  animation-duration: 9s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY3 {
  display: inline block;
  width: 49px;
  z-index: 49000;
  animation-name: lanternY;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
}

@keyframes lanternX3 {
  50% {
    transform: translateX(32px);
  }
}
@keyframes lanternY {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
  100% {
    transform: translateY(-400px);
  }
}
.lanternX4 {
  position: absolute;
  bottom: -80px;
  left: 54px;
  transform: translateX(0);
  animation-name: lanternX4;
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY4 {
  display: inline block;
  width: 52px;
  z-index: 52000;
  animation-name: lanternY;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 1s;
}

@keyframes lanternX4 {
  50% {
    transform: translateX(31px);
  }
}
@keyframes lanternY {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
  100% {
    transform: translateY(-400px);
  }
}
.lanternX5 {
  position: absolute;
  bottom: -80px;
  left: 40px;
  transform: translateX(0);
  animation-name: lanternX5;
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY5 {
  display: inline block;
  width: 78px;
  z-index: 78000;
  animation-name: lanternY;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 3s;
}

@keyframes lanternX5 {
  50% {
    transform: translateX(39px);
  }
}
@keyframes lanternY {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
  100% {
    transform: translateY(-400px);
  }
}
.lanternX6 {
  position: absolute;
  bottom: -80px;
  left: 27px;
  transform: translateX(0);
  animation-name: lanternX6;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY6 {
  display: inline block;
  width: 49px;
  z-index: 49000;
  animation-name: lanternY;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
}

@keyframes lanternX6 {
  50% {
    transform: translateX(3px);
  }
}
@keyframes lanternY {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
  100% {
    transform: translateY(-400px);
  }
}
.lanternX7 {
  position: absolute;
  bottom: -80px;
  left: 99px;
  transform: translateX(0);
  animation-name: lanternX7;
  animation-duration: 9s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY7 {
  display: inline block;
  width: 72px;
  z-index: 72000;
  animation-name: lanternY;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 2s;
}

@keyframes lanternX7 {
  50% {
    transform: translateX(42px);
  }
}
@keyframes lanternY {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
  100% {
    transform: translateY(-400px);
  }
}
.lanternX8 {
  position: absolute;
  bottom: -80px;
  left: 99px;
  transform: translateX(0);
  animation-name: lanternX8;
  animation-duration: 9s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY8 {
  display: inline block;
  width: 74px;
  z-index: 74000;
  animation-name: lanternY;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 2s;
}

@keyframes lanternX8 {
  50% {
    transform: translateX(55px);
  }
}
@keyframes lanternY {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
  100% {
    transform: translateY(-400px);
  }
}
.lanternX9 {
  position: absolute;
  bottom: -80px;
  left: 68px;
  transform: translateX(0);
  animation-name: lanternX9;
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY9 {
  display: inline block;
  width: 66px;
  z-index: 66000;
  animation-name: lanternY;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 1s;
}

@keyframes lanternX9 {
  50% {
    transform: translateX(20px);
  }
}
@keyframes lanternY {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
  100% {
    transform: translateY(-400px);
  }
}
.lanternX10 {
  position: absolute;
  bottom: -80px;
  left: 34px;
  transform: translateX(0);
  animation-name: lanternX10;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY10 {
  display: inline block;
  width: 56px;
  z-index: 56000;
  animation-name: lanternY;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 2s;
}

@keyframes lanternX10 {
  50% {
    transform: translateX(70px);
  }
}
@keyframes lanternY {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
  100% {
    transform: translateY(-400px);
  }
}
</style>
