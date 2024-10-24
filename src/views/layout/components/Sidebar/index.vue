<template>
  <div class="sidebar-box">
    <div class="meun-box">
      <div class="menu-item" v-for="item in menuList" :key="item.key">
        <template v-if="item.key === '/home'">
          <div class="menu-item-box" @click="handleGoHome">
            <img
              :src="
                curSelectedMenuKey === item.key
                  ? selectedMenuLogo
                  : defaultMenuLogo
              "
              class="menu-icon"
            />
            <span
              :class="[
                'default-text',
                curSelectedMenuKey === item.key ? 'active-text' : '',
              ]"
              >{{ item.name }}</span
            >
          </div>
        </template>
        <template v-else>
          <el-popover placement="right-start" title="" trigger="hover">
            <div class="popover-box" v-if="item.key == '/official'">
              <div class="column">
                <div class="page-box">
                  <div class="title">首页</div>
                  <div
                    :class="[
                      'page-item',
                      curSelectedRouteName == 'homeCarousel'
                        ? 'selected-page'
                        : '',
                    ]"
                    @click="handleGoPage('homeCarousel')"
                  >
                    首页轮播图
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="page-box">
                  <div class="title">客户评价</div>
                  <div class="page-item">评价列表</div>
                </div>
                <div class="page-box">
                  <div class="title">行业案例</div>
                  <div class="page-item">案例列表</div>
                </div>
              </div>
              <div class="column">
                <div class="page-box">
                  <div class="title">咨询中心</div>
                  <div
                    :class="[
                      'page-item',
                      curSelectedRouteName == 'articleList'
                        ? 'selected-page'
                        : '',
                    ]"
                    @click="handleGoPage('articleList')"
                  >
                    文章列表
                  </div>
                  <div class="page-item">文章分类</div>
                </div>
              </div>
              <div class="column">
                <div class="page-box">
                  <div class="title">关于我们</div>
                  <div
                    :class="[
                      'page-item',
                      curSelectedRouteName == 'developmentCourse'
                        ? 'selected-page'
                        : '',
                    ]"
                    @click="handleGoPage('developmentCourse')"
                  >
                    发展历程
                  </div>
                  <div
                    :class="[
                      'page-item',
                      curSelectedRouteName == 'honorQualification'
                        ? 'selected-page'
                        : '',
                    ]"
                    @click="handleGoPage('honorQualification')"
                  >
                    荣誉资质
                  </div>
                  <div
                    :class="[
                      'page-item',
                      curSelectedRouteName == 'recruitManage'
                        ? 'selected-page'
                        : '',
                    ]"
                    @click="handleGoPage('recruitManage')"
                  >
                    招聘管理
                  </div>
                  <div
                    :class="[
                      'page-item',
                      curSelectedRouteName == 'contactUs'
                        ? 'selected-page'
                        : '',
                    ]"
                    @click="handleGoPage('contactUs')"
                  >
                    联系我们
                  </div>
                  <div
                    :class="[
                      'page-item',
                      curSelectedRouteName == 'messageManage'
                        ? 'selected-page'
                        : '',
                    ]"
                    @click="handleGoPage('messageManage')"
                  >
                    留言管理
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="page-box">
                  <div class="title">其它设置</div>
                  <div class="page-item">悬浮信息</div>
                  <div class="page-item">招聘管理</div>
                </div>
              </div>
            </div>
            <div class="popover-box" v-else-if="item.key == '/setting'">
              <div class="column">
                <div class="page-box">
                  <div class="title">人员管理</div>
                  <div class="page-item">角色管理</div>
                  <div class="page-item">员工管理</div>
                </div>
              </div>
              <div class="column">
                <div class="page-box">
                  <div class="title">系统设置</div>
                  <div class="page-item">操作日志</div>
                </div>
              </div>
            </div>
            <div class="menu-item-box" slot="reference">
              <img
                :src="
                  curSelectedMenuKey === item.key
                    ? selectedMenuLogo
                    : defaultMenuLogo
                "
                class="menu-icon"
              />
              <span
                :class="[
                  'default-text',
                  curSelectedMenuKey === item.key ? 'active-text' : '',
                ]"
                >{{ item.name }}</span
              >
              <img
                :src="
                  curSelectedMenuKey === item.key
                    ? rightSelectedIcon
                    : rightDefaultIcon
                "
                class="right-icon"
              />
            </div>
          </el-popover>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import SidebarItem from './SidebarItem'
import Logo from "./Logo";
import defaultMenuLogo from "@/assets/img/default-menu-logo.png";
import selectedMenuLogo from "@/assets/img/selected-menu-logo.png";
import rightDefaultIcon from "@/assets/img/right-default-icon.png";
import rightSelectedIcon from "@/assets/img/right-selected-icon.png";

export default {
  components: { Logo },
  computed: {},
  data() {
    return {
      menuList: [
        {
          name: "首页",
          key: "/home",
        },
        {
          name: "官网管理",
          key: "/official",
        },
        {
          name: "系统设置",
          key: "/setting",
        },
      ],
      defaultMenuLogo,
      selectedMenuLogo,
      rightDefaultIcon,
      rightSelectedIcon,
      curSelectedMenuKey: "/home",
      curSelectedRouteName: "",
      // cur
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const routeArr = route.path.split("/").filter((item) => item);

        this.curSelectedMenuKey = "/" + routeArr[0];
        this.curSelectedRouteName = route.name;
      },
      immediate: true,
    },
  },
  methods: {
    handleGoHome() {
      this.$router.push("/home");
    },
    handleGoPage(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-box {
  height: 100%;
  min-width: 200px;
  width: 200px;
  max-width: 200px;
  overflow: hidden;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px 0;
  .meun-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    .menu-item {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 8px 10px 12px;
      cursor: pointer;
      .menu-item-box {
        width: 100%;
        display: flex;
        align-items: center;
        .menu-icon {
          width: 20px;
          height: 20px;
          display: block;
        }
        .default-text {
          margin-left: 8px;
          font-size: 15px;
          color: #333;
        }
        .active-text {
          color: #2080f0;
        }
        .right-icon {
          margin-left: auto;
          width: 16px;
          height: 16px;
          display: block;
        }
      }
    }
  }
}
.popover-box {
  width: 100%;
  box-sizing: border-box;
  // padding: 16px 20px;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  .column {
    width: 160px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .page-box {
      width: 100%;
      .title {
        box-sizing: border-box;
        padding: 0 16px;
        height: 32px;
        line-height: 32px;
        color: #333;
        font-size: 16px;
        font-weight: bold;
      }
      .page-item {
        box-sizing: border-box;
        padding: 0 16px;
        width: 100%;
        height: 36px;
        color: #666;
        font-size: 15px;
        line-height: 36px;
        cursor: pointer;
        position: relative;
        &:hover {
          border-radius: 2px;
          background: #f5f7fa;
          color: #2080f0;
        }
      }
      .selected-page {
        border-radius: 2px;
        background: #f5f7fa;
        color: #2080f0;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          left: 4px;
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 5px;
          border-radius: 5px;
          background-color: #2080f0;
        }
      }
    }
  }
}
</style>
