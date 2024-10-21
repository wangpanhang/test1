<template>
  <el-dialog
    :visible="showCarouselConfigStatus"
    class="newPopOptions"
    width="520px"
    :close-on-press-escape="false"
    @close="closeDialog"
  >
    <div class="newPopOptionsTitle">
      <span>轮播图播放设置</span>
    </div>
    <div class="dialog-body">
      <div class="carousel-config-row">
        <div class="label">轮播时间:</div>
        <el-select v-model="carouselConfigObj.interval" style="width: 160px;">
          <el-option
            v-for="item in intervalList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="carousel-config-row">
        <div class="label">指示器样式:</div>
        <el-select v-model="carouselConfigObj.dotType" style="width: 160px;">
          <el-option
            v-for="item in dotTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="carousel-config-row">
        <div class="label">指示器位置:</div>
        <el-select
          v-model="carouselConfigObj.dotPlacement"
          style="width: 160px;"
        >
          <el-option
            v-for="item in dotPlacementList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="carousel-config-row">
        <div class="label">支持拖拽:</div>
        <el-switch
          v-model="carouselConfigObj.draggable"
          active-color="#18A058"
          inactive-color="#EDEDED"
        ></el-switch>
        <div class="tips">开启后支持鼠标拖拽移动，关闭后仅支持系统自动轮播</div>
      </div>
    </div>
    <div class="popClass-bottom">
      <el-button size="mini" @click="closeDialog">取消</el-button>
      <el-button size="mini" type="primary" @click="updateCarouselConfig"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showCarouselConfigStatus: {
      type: Boolean,
      default: false
    },
    carouselConfig: {
      type: Object,
      default: () => {
        return {
          interval: 4,
          draggable: true,
          dotType: "dot",
          dotPlacement: "bottom"
        };
      }
    }
  },
  data() {
    return {
      carouselConfigObj: {
        interval: 4,
        draggable: true,
        dotType: "dot",
        dotPlacement: "bottom"
      },
      intervalList: [
        {
          value: 2,
          label: "2秒"
        },
        {
          value: 3,
          label: "3秒"
        },
        {
          value: 4,
          label: "4秒"
        },
        {
          value: 5,
          label: "5秒"
        },
        {
          value: 6,
          label: "6秒"
        }
      ],
      dotTypeList: [
        {
          value: "dot",
          label: "点"
        },
        {
          value: "line",
          label: "线"
        }
      ],
      dotPlacementList: [
        {
          value: "left",
          label: "左边"
        },
        {
          value: "right",
          label: "右边"
        },
        {
          value: "top",
          label: "顶部"
        },
        {
          value: "bottom",
          label: "底部"
        }
      ]
    };
  },
  watch: {
    carouselConfig: {
      handler(val) {
        this.carouselConfigObj = val;
      },
      deep: true
    }
  },
  methods: {
    updateCarouselConfig() {
      this.$emit("updateCarouselConfig", this.carouselConfigObj);
      this.closeDialog();
    },
    closeDialog() {
      this.$emit("update:showCarouselConfigStatus");
    }
  }
};
</script>

<style lang="scss" scoped>
.newPopOptionsTitle {
  text-align: left;
  font-size: 16px;
  color: #101828;
  box-sizing: border-box;
  padding: 0 20px 12px;
  border-bottom: 1px solid #e0e0e6;
}
.dialog-body {
  width: 100%;
  box-sizing: border-box;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .carousel-config-row {
    width: 100%;
    display: flex;
    align-items: center;
    .label {
      width: 100px;
      min-width: 100px;
      max-width: 100px;
      color: #303133;
      font-size: 14px;
      text-align: right;
      margin-right: 8px;
    }
    .tips {
      margin-left: 12px;
      font-size: 12px;
      color: #b3b3b3;
    }
  }
}
.popClass-bottom {
  box-sizing: border-box;
  padding: 16px 20px 0;
  width: 100%;
  text-align: right;
  border-top: 1px solid #e0e0e6;
}
</style>
