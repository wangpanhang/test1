<template>
  <div class="sidebar-box">
    <div class="meun-box">
      <div class="menu-item" v-for="item in menuList" :key="item.key">
        <template v-if="item.key === '/home'">
          <div class="menu-item-box" @click="handleGoHome">
            <img :src="curSelectedMenuKey === item.key ? selectedMenuLogo : defaultMenuLogo" class="menu-icon"/>
            <span :class="['default-text', curSelectedMenuKey === item.key ? 'active-text' : '']">{{ item.name }}</span>
          </div>
        </template>
        <template v-else>
          <el-popover
            placement="right-start"
            title=""
            width="200"
            trigger="hover">
            <div class="" slot="content"></div>
            <div class="menu-item-box" slot="reference">
              <img :src="curSelectedMenuKey === item.key ? selectedMenuLogo : defaultMenuLogo" class="menu-icon"/>
              <span :class="['default-text', curSelectedMenuKey === item.key ? 'active-text' : '']">{{ item.name }}</span>
              <img :src="curSelectedMenuKey === item.key ? rightSelectedIcon : rightDefaultIcon" class="right-icon"/>
            </div>
          </el-popover>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import SidebarItem from './SidebarItem'
import Logo from "./Logo";
import defaultMenuLogo from '@/assets/img/default-menu-logo.png'
import selectedMenuLogo from '@/assets/img/selected-menu-logo.png'
import rightDefaultIcon from '@/assets/img/right-default-icon.png'
import rightSelectedIcon from '@/assets/img/right-selected-icon.png'

export default {
  components: { Logo},
  computed: {
  },
  data() {
    return {
      menuList: [
        {
          name: '首页',
          key: '/home'
        },
        {
          name: '官网管理',
          key: '/official'
        },
        {
          name: '系统设置',
          key: '/setting'
        }
      ],
      defaultMenuLogo,
      selectedMenuLogo,
      rightDefaultIcon,
      rightSelectedIcon,
      curSelectedMenuKey: '/home'
      // cur
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log('route', route)
        const routeArr = route.path.split('/').filter(item => item)
        console.log('routeArr', routeArr)
        this.curSelectedMenuKey = '/' + routeArr[0]
      },
      immediate: true
    }
  },
  methods: {
    handleGoHome() {
      this.$router.push('/home')
    },
  }
}
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
          color: #2080F0;
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
</style>
