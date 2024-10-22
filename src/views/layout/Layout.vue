<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/> -->
    <navbar style="height: 64px;" />
    <div class="container">
      <sidebar />
      <div class="main-container">
        <div class="breadcrumb-box">
          <div class="breadcrumb-icon"></div>
          <div class="breadcrumb-text">
            <span
              v-if="breadcrumbTextList.length == 1"
              style="color: #9EA4AA"
              >{{
                breadcrumbTextList.length > 0 ? breadcrumbTextList[0] : ""
              }}</span
            >
            <span v-else>
              <span v-for="(item, index) in breadcrumbTextList" :key="index">
                <span
                  v-if="index < breadcrumbTextList.length - 1"
                  style="color: #9EA4AA"
                  >{{ item }}</span
                >
                <span v-else style="color: #333639">{{ item }}</span>
              </span>
            </span>
          </div>
        </div>
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  data() {
    return {
      breadcrumbTextList: [],
      breadcrumbFirstRouteObj: {
        official: "官网管理",
        setting: "系统设置"
      }
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const routeArr = route.path.split("/").filter(item => item);
        if (routeArr.length === 1) {
          this.breadcrumbTextList[0] = this.breadcrumbFirstRouteObj[
            routeArr[0]
          ];
        } else if (routeArr.length > 1) {
          this.breadcrumbTextList[0] = this.breadcrumbFirstRouteObj[
            routeArr[0]
          ];
          this.breadcrumbTextList[1] = `/${route.meta.title || ""}`;
        } else {
          this.breadcrumbTextList = [];
        }
      },
      immediate: true
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("CloseSideBar", { withoutAnimation: false });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .container {
    width: 100%;
    height: calc(100vh - 64px);
    // flex: 1;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.breadcrumb-box {
  width: 100%;
  display: flex;
  align-items: center;

  .breadcrumb-icon {
    width: 18px;
    height: 18px;
    background-image: url("../../assets/img/breadcrumb-icon.png");
    background-position: center;
    background-repeat: no-repeat;
  }
  .breadcrumb-text {
    margin-left: 4px;
    font-size: 14px;
  }
}
</style>
