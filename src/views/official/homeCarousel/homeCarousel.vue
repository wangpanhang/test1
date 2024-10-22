<template>
  <div class="home-carousel-container">
    <pageHeader title="首页轮播图" tips="轮播图最多支持添加十张" />
    <div class="carousel-tips-container">
      <div class="carousel-tips-content">轮播图说明</div>
      <div class="carousel-tips">
        最多可添加10张轮播图，最大支持同时开启5张轮播图显示；
      </div>
    </div>
    <div class="carousel-btn-box">
      <div class="common-btn add-btn" @click="showCarouseActionDialog">
        新增轮播图
      </div>
      <div class="common-btn edit-btn" @click="showCarouseConfigDialog">
        播放设置
      </div>
    </div>
    <div class="table-container">
      <el-table
        :data="tableData"
        style="width: 100%;position:absolute;table-layout: auto;"
        :border="false"
        v-loading="loading"
        element-loading-text="正在加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :header-cell-style="{ backgroundColor: '#F2F3F5' }"
      >
        <el-table-column type="index" label="序号" width="56px">
        </el-table-column>
        <el-table-column prop="carouselUrl" label="轮播图" min-width="176px">
          <template slot-scope="scope">
            <img :src="scope.row.carouselUrl" class="img" />
          </template>
        </el-table-column>
        <el-table-column prop="redirectUrl" label="跳转链接" min-width="344px">
        </el-table-column>
        <el-table-column prop="createTime" label="上传时间" min-width="176px">
        </el-table-column>
        <el-table-column prop="createUser" label="操作人" min-width="136px">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="最后编辑时间"
          min-width="176px"
        >
        </el-table-column>
        <el-table-column prop="updateUser" label="最后编辑人" min-width="136px">
        </el-table-column>
        <el-table-column prop="isShow" label="是否显示" min-width="96px">
          <template slot-scope="scope">
            <el-switch
              :value="scope.row.isShow"
              active-color="#18A058"
              inactive-color="#EDEDED"
              @change="handleSwitchChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="action"
          label="操作"
          min-width="136px"
          fixed="right"
        >
          <template slot-scope="scope">
            <div class="action-box">
              <span
                class="common-action edit-action"
                @click="handleEdit(scope.row)"
                >编辑</span
              >
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                cancel-button-type="none"
                confirm-button-type="danger"
                icon="el-icon-info"
                icon-color="red"
                title="删除后不可恢复，确定删除该轮播图吗？"
                @confirm="handleDelCarousel(scope.row)"
              >
                <span class="common-action del-action" slot="reference"
                  >删除</span
                >
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <CarouselSettingDialog
      :showCarouselSettingStatus="showCarouselSettingStatus"
      :carouselActionObj="carouselActionObj"
      :type="actionType"
      @update:showCarouselSettingStatus="showCarouselSettingStatus = false"
      @add:carousel="addCarousel"
    />
    <CarouselConfigDialog
      :showCarouselConfigStatus="showCarouselConfigStatus"
      :carouselConfig="carouselConfig"
      @update:showCarouselConfigStatus="showCarouselConfigStatus = false"
      @updateCarouselConfig="updateCarouselConfig"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import CarouselSettingDialog from "./components/CarouselSettingDialog.vue";
import CarouselConfigDialog from "./components/CarouselConfigDialog.vue";
import carousel from "@/api/official/carousel.js";

export default {
  components: {
    pageHeader,
    CarouselSettingDialog,
    CarouselConfigDialog
  },
  name: "homeCarousel",
  computed: {
    ...mapGetters(["name", "roles"])
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      tableData: [
        // {
        //   id: 1,
        //   carouselUrl:
        //     "https://wallpaperm.cmcm.com/4700eaf249b71d56d95aff8ca94313fa.jpg",
        //   redirectUrl: "https://www.baidu.com",
        //   gmtCreate: "2024-10-21 15:29:35",
        //   creator: "小王",
        //   gmtModified: "2024-10-21 15:29:35",
        //   editor: "小王",
        //   isShow: true
        // }
      ],
      showCarouselSettingStatus: false,
      showCarouselConfigStatus: false,
      carouselActionObj: {
        linkVal: "",
        isShow: true,
        uploadUrl: ""
      },
      loading: false,
      actionType: "",
      carouselConfig: {
        interval: 4,
        draggable: true,
        dotType: "dot",
        dotPlacement: "bottom"
      },
      carouselId: ""
    };
  },
  methods: {
    init() {
      // 获取轮播图设置
      this.getCarouselConfig();
      // 获取轮播图列表
      this.getCarouselList();
    },
    async getCarouselConfig() {
      const res = await carousel.getCarouselConfig();
      if (res.code == 200) {
        const data = res.data.data || {};
        if (Object.keys(data).length) {
          this.carouselConfig = {
            ...data,
            draggable: data.draggable == 1
          };
        }
      }
    },
    async getCarouselList() {
      const res = await carousel.getCarouselList();
      if (res.code == 200) {
        this.tableData = res.data.map(item => {
          item.isShow = item.isShow == 1;
          return item;
        });
      }
    },
    showCarouseActionDialog() {
      if (this.tableData.length == 10) {
        this.$message({
          message: "最多添加10张轮播图",
          type: "warning",
          duration: 2000
        });
        return;
      }
      this.actionType = "add";
      this.showCarouselSettingStatus = true;
    },
    showCarouseConfigDialog() {
      this.showCarouselConfigStatus = true;
    },
    // 新增轮播图
    async addCarousel(uploadObj) {
      try {
        this.loading = true;
        let res = null;
        if (this.actionType == "add") {
          const params = {
            carouselRank: this.tableData.length + 1,
            carouselUrl: uploadObj.uploadUrl || "",
            isShow: uploadObj.isShowStatus ? 1 : 0,
            redirectUrl: uploadObj.linkText || ""
          };
          res = await carousel.addCarousel(params);
        } else {
          const params = {
            id: this.carouselId,
            carouselRank: this.tableData.length + 1,
            carouselUrl: uploadObj.uploadUrl || "",
            isShow: uploadObj.isShowStatus ? 1 : 0,
            redirectUrl: uploadObj.linkText || ""
          };
          res = await carousel.editCarousel(params);
        }
        if (res.code == 200) {
          this.$message.success(
            `${this.actionType == "add" ? "新增" : "编辑"}轮播图成功`
          );
          // 重新刷新列表
          this.getCarouselList();
        }
      } catch (_) {
        this.$message.error("轮播图更新失败，请重试");
      } finally {
        this.loading = false;
      }
    },
    handleEdit(row) {
      this.carouselActionObj = {
        linkVal: row.redirectUrl,
        isShow: row.isShow,
        uploadUrl: row.carouselUrl
      };
      this.carouselId = row.id;
      this.actionType = "edit";
      this.showCarouselSettingStatus = true;
    },
    handleSwitchChange(row) {
      const curSwitchShow = !row.isShow;
      if (curSwitchShow) {
        let showLen = this.tableData.filter(item => item.isShow);
        if (showLen >= 5) {
          this.$message.warning(
            "最多支持同时显示5张轮播图，请先关闭其它轮播图在进行开启。"
          );
          return;
        }
      }
      row.isShow = curSwitchShow;
    },
    async handleDelCarousel(row) {
      try {
        this.loading = true;
        const params = {
          id: row.id
        };
        const res = await carousel.delCarousel(params);
        if (res.code == 200) {
          this.$message.success("删除成功！");
          this.getCarouselList();
        } else {
          this.$message.error("删除失败！");
        }
      } catch (_) {
        this.$message.error("删除失败！");
      } finally {
        this.loading = false;
      }
    },
    async updateCarouselConfig(carouselConfigObj) {
      const params = {
        ...carouselConfigObj,
        draggable: carouselConfigObj.draggable ? 1 : 0
      };
      const res = await carousel.setCarouselConfig(params);
      if (res.code == 200) {
        this.$message.success("轮播图设置成功!");
        this.carouselConfig = {
          ...carouselConfigObj
        };
      } else {
        this.$message.error("轮播图设置失败!");
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.home-carousel-container {
  flex: 1;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 16px;
  .carousel-tips-container {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #c7dffb;
    background: #edf5fe;
    .carousel-tips-content {
      font-size: 16px;
      color: #333;
      font-weight: bold;
      margin-bottom: 4px;
    }
    .carousel-tips {
      font-size: 14px;
      color: #666;
    }
  }
  .carousel-btn-box {
    display: flex;
    align-items: center;
    gap: 12px;
    .common-btn {
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      padding: 0 14px;
      text-align: center;
      transition: opacity 0.3s;
      cursor: pointer;
      border-radius: 3px;
      font-size: 14px;
      &:hover {
        opacity: 0.8;
      }
    }
    .add-btn {
      background-color: #2080f0;
      color: #fff;
    }
    .edit-btn {
      border: 1px solid #2080f0;
      color: #2080f0;
    }
  }
  .table-container {
    flex: 1;
    display: flex;
    position: relative;
    overflow: hidden;
    .img {
      width: 109px;
      height: 40px;
      object-fit: cover;
    }
    .action-box {
      display: flex;
      align-items: center;
      .common-action {
        font-size: 14px;
        cursor: pointer;
        &:not(:last-child) {
          margin-right: 12px;
        }
      }
      .edit-action {
        color: #2080f0;
      }
      .del-action {
        color: #d03050;
      }
    }
  }
  /deep/ .el-dialog {
    background-color: #fff;
    border-radius: 4px;
  }
  /deep/ .el-dialog__header {
    padding: 0;
  }
  /deep/ .el-dialog__body {
    padding: 20px 0;
  }
}
</style>
