<template>
  <el-container class="home-view">
    <el-aside :width="isCollapse ? '54px' : '190px'">
      <div class="ae-title">
        <img src="../assets/logo.png" alt="" class="ae-title-img" v-if="!isCollapse">
      </div>
      <el-menu class="ae-menu" :default-active="$route.path" mode="vertical" :collapse="isCollapse" :collapse-transition="false" router>
        <el-submenu v-for="route in routes" :key="route.index" :index="route.index" :show-timeout="50" :hide-timeout="50">
          <template slot="title">
            <i :class="route.icon"></i>
            <span v-if="!isCollapse" slot="title">{{route.text}}</span>
          </template>
          <el-menu-item v-for="item in route.children" :index="item.path" :key="item.name">{{item.value}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container class="inner-container">
      <el-header height="90px">
        <div class="home-view-head">
          <div class="home-view-head-system left">
            <div class="optionImg" @click="collapseMenu">
              <img :src="isCollapse ? require('../assets/logo.png') : ''" alt="" style="width: 20px; height: 20px; vertical-align: text-top">
            </div>
            <span class="home-title">主页内容</span>
          </div>
          <div class="home-view-head-user right">
            <span class="current-time">当前时间：{{currentTime}}</span>
            <el-dropdown trigger="hover">
              <div class="el-dropdown-link">
                <img class="user-image" src="../assets/logo.png" alt="" style="width: 32px; height: 32px;">
                <span class="user-name">{{umAccount}}</span>
                <i class="el-icon-caret-bottom"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="removeCookie">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div ref="navCards">
          <draggable class="nav-cards" :options="{animation: '500'}" draggable="true" :move="getdata" @update="datadragEnd">
            <div class="nav-card" v-for="(nav, index) in navs" :key="nav.path" :class="nav.path===$route.path ? 'active' : ''">
              <router-link class="nav-card-link" :to="nav.path" :draggable="false">{{nav.value}}</router-link>
              <i class="el-icon-close" @click="removeTab(nav.path, index)"></i>
            </div>
          </draggable>
        </div>
      </el-header>
      <el-main>
        <transition name="slide-fade" :duration="{enter: 200, leave: 100}" mode="out-in" appear="">
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import draggable from 'vuedraggable';
// import Cookies from 'js-cookie';
import { mapGetters, mapActions } from 'vuex';
import { menus } from '@/router/home';

export default {
  name: 'home',
  components: {
    draggable
  },
  data() {
    return {
      isCollapse: true,
      currentTime: null,
      routes: menus, // 线上这个注释
      i: 0
    };
  },
  computed: {
    // ...mapGetters(['userName', 'homeRouters', 'navs', 'routes', 'umAccount'])
    // 本地启用下面
    ...mapGetters(['userName', 'homeRouters', 'navs', 'umAccount'])

  },
  created() {
    const today = new Date();

    this.currentTime = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
    this.menuList();
    this.$store.dispatch('getUmAccount').then(res => {
      if (res === '未知用户') {
        console.log();
      }
    });
  },
  methods: {
    ...mapActions(['delNav', 'addNav', 'changeNav']),
    handleAside() {
      this.isCollapse = !this.isCollapse;
    },
    handleLogout() {
      this.$store.dispatch('goLogout').then(() => {
        location.reload();
      });
    },
    removeCookie() {
      // window.location.replace(`http://${window.location.host}/caslogout`);
      this.$router.replace({
        path: '/login'
      });
    },
    removeTab(path, index) {
      if (this.$route.path === path) {
        const newPath = this.navs[index + 1] || this.navs[index - 1] || '/';

        this.$router.push(newPath);
      }
      this.delNav(index);
    },
    menuList() {
      const menuList = [];

      for (const route of this.homeRouters) {
        if (!route.hidden) {
          menuList.push(route);
        }
      }
      return menuList;
    },
    getdata(evt) {
      console.log(evt);
    },
    datadragEnd(eve) {
      const pathname = eve.clone.innerText.trim();

      this.navs.forEach(item => {
        if (item.value === pathname) {
          return this.$router.push(item.path);
        }
      });
    },
    collapseMenu() {
      this.i++;
      if (this.i % 2 === 0) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
    }
  }
};
</script>

<style lang="scss">
  $HEADHEIGHT: 80px;
  $HEADBORDERBOTTOM: 2px;

  $pre: '.home-view';
  .el-menu--vertical .el-menu--popup{
    background-color: #304156 !important;
    border-radius: 5px;

    .el-menu-item {
      color: #fff;
    }

    .el-menu-item.is-active {
      color: #ffffff;
    }

    .el-menu-item:hover {
      background-color: #263445;
    }
  }

  #{$pre} {
    .slide-fade-enter-active {
      transition: all .8s ease;
    }

    .slide-fade-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter,
    .slide-fade-leave-to {
      transform: translateX(10px);
      opacity: 0;
    }

    position: relative;
    width: 100%;
    height: 100%;

    // 侧边栏导航
    .ae-title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 62px;
      &-img {
        width: 180px;
        height: auto;
      }
    }

    .el-aside {
      overflow: auto;
      transition: width .5s;
      position: relative;
      z-index: 2;
      background: rgb(48, 65, 86);
    }

    .ae-menu {
      width: 100%;
      border-right: 0;
      background: rgb(48, 65, 86);
    }

    .el-submenu {
      &__title {
        color: #aebaca;
        font-size: 14px;
        padding-left: 15px !important;
        i {
          color: #748295;
        }
        &:hover {
          background: #263445 !important;
        }
      }

      .el-menu {
        background: #1f2d3d;
      }
      &__icon-arrow {
        top: 52%;
      }
      .el-menu-item {
        min-width: 190px;
        padding-left: 35px !important;
        padding: 0 35px;
      }
    }
    .el-menu-item {
      font-size: 14px;
      color: #748295;
      &::before {
        content: '';
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        vertical-align: middle;
        background: #fff;
      }
      &:hover {
        background: #001528;
      }
    }
    .el-menu-item.is-active {
      background-color: #001528;
      color: #FFF;
      &::before {
        background: #ff743f;
      }
    }
    .el-header {
      position: relative;
      padding: 0;
      background-color: #FFF;
    }
    &-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 20px;
      height: 54px;
      border-bottom: 2px solid #dcdfe6;
      background: #414c61;

      &-system {
        padding: 0 20px 0 10px;
        font-size: 16px;
        color: #ffffff;

        .optionImg {
          padding: 10px;
          display: inline-block;
          cursor: pointer;
        }
        .optionImg:hover {
          background-color: #1f2d3d;
        }
        .home-title {
          display: inline-block;
          vertical-align: middle;
        }
      }

      .current-time {
        margin-right: 20px;
        color: #ffffff;
      }
      .user-image {
        margin-right: 10px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .user-name {
        color: #fff;
      }
      .el-dropdown-link {
        font-size: 14px;
        color: #333;
        cursor: pointer;
        i[class^='el-icon'] {
          color: #fff;
        }
      }
    }

    .nav-cards {
      position: relative;
      display: flex;
      height: 30px - $HEADBORDERBOTTOM;
      box-shadow: 0 4px 6px 0 rgba(204, 204, 204, 0.51);
      background: #F5F6FB;
      z-index: 1;
      overflow-y: hidden;
      overflow-x: auto;
    }

    .nav-card {
      flex-shrink: 0;
      flex-grow: 0;
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 100%;
      width: 180px;
      line-height: 30px;
      border-right: 1px solid #dcdfe6;
      text-align: center;
      color: #909399;
      &:hover {
        background: #ffffff;
        color: #ff742f;
      }
      &.active {
        background: #ff742f;
        color: #ffffff;
      }
      &-link {
        flex-grow: 1;
      }

      .el-icon-close {
        cursor: pointer;
        &:hover {
          color: #ffffff;
        }
      }

      .el-icon-rank {
        cursor: move;
        &:hover {
          color: #67c23a;
        }
      }
    }
    .inner-container {
      position: relative;
      min-width: 940px;
      height: 940px;
    }
    .el-main {
      position: absolute;
      top: $HEADHEIGHT;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-x: hidden;
      overflow-y: auto;
      background: #eceef6;
    }

    .inner-main {
      position: relative;
      min-height: 100%;
    }

    .el-submenu__icon-arrow.el-icon-arrow-down::before {
      content: '\E60C';
    }

    .el-form-item__content {
      line-height: 32px;
      .el-button {
        padding: 8px 24px;
        border-radius: 16px;
      }
    }

    .el-form-item__label {
      line-height: 32px;
    }

    .el-botton {
      font-size: 13px;
    }

    .el-input__icon {
      line-height: 32px;
    }

    .part-table {
      .el-table {
        &::before {
          display: none;
        }
        th {
          background: #f6f8fa;
        }
        th, td {
          padding: 0;
          height: 40px;
          border-bottom: none !important;
        }
      }

      .el-table__header {
        .cell {
          color: #333;
        }
      }

      .el-table__row {
        &:nth-child(2n) {
          background: #f6f8fa !important;
          th, td {
            background: #f6f8fa !important;
          }
        }

        .cell {
          color: #666;
          padding-left: 5px;
          padding-right: 5px;
        }
      }
    }

  }

  /** home 标签内部 */
  .part {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 4px 10px 0 rgba(223, 223, 223, 0.51);

    &-head {
      margin: 5px 0;
      padding-left: 12px;
      border-left: 3px solid #3569fd;
      color: #333;
      font-weight: bold;
      font-size: 16px;
    }

    &-body {
      padding: 5px 20px;
    }

    &-table {
      padding: 10px 0;
    }

    &-info {
      padding: 5px 0 5px 20px;
    }

    &-title {
      padding: 5px 0 5px 15px;
      border-bottom: 1px solid #dcdfe6;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .box {
    padding-top: 10px;
  }

  // 关于pop页面
  .pop-dialog {
    .policy-no {
      font-size: 16px;
      color: #3569fd;
    }

    .title {
      margin-top: 18px;
      color: #333;
      font-size: 16px;
      font-weight: bold;
    }

    .pop-title {
      margin-top: 18px;
      &::before {
        display: none;
      }

      th {
        background: #f6f8fa;
      }

      th, td {
        padding: 0;
        height: 36px;
      }

      .el-table__header {
        .cell {
          color: #333;
        }
      }

      .el-table__row {
        background: #fafafa;
        th, td {
          background: #fafafa;
        }
        .cell {
          color: #666;
        }
      }
    }
  }

  .btnGroup {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  // 动画效果
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
