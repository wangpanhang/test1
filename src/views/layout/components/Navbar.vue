<template>
  <div class="navbar-container">
    <div class="navbar-left"></div>
    <div class="navbar-right">
      <div class="user-info">
        <div class="user-avatar">
          <img :src="defaultImg" alt="avatar">
        </div>
        <div class="user-name">账号名称</div>
      </div>
      <el-tooltip class="item" effect="light" content="退出" placement="bottom">
        <div class="logout-icon"></div>
      </el-tooltip>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import defaultImg from '../../../assets/img/default-img.png'

export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'sysUserCode',
      'token'
    ])
  },
  data() {
    return {
      defaultImg
    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar-container {
  width: 100%;
  background-color: #fff;
  height: 64px !important;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 10px 0px rgba(78, 89, 105, 0.06);
  z-index: 2;
  .navbar-left {
    width: 120px;
    height: 50px;
    background-image: url('../../../assets/img/login_logo.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .navbar-right {
    display: flex;
    align-items: center;
    gap: 16px;
    .user-info {
      display: flex;
      align-items: center;
      .user-avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .user-name {
        color: #333;
        font-size: 14px;
      }
    }
    .logout-icon {
      width: 24px;
      height: 24px;
      background-image: url('../../../assets/img/logout.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      cursor: pointer;
    }
  }
}
</style>

