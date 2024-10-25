<template>
  <el-dialog
    :visible="showBatchSettingStatus"
    class="newPopOptions"
    width="520px"
    :close-on-press-escape="false"
    @close="closeDialog"
  >
    <div class="newPopOptionsTitle">
      <span>批量设置</span>
    </div>
    <div class="dialog-body">
      <div class="row">
        <div class="label">允许评论:</div>
        <el-switch
          v-model="batchSettingInfo.allowComment"
          active-color="#18A058"
          inactive-color="#EDEDED"
        >
        </el-switch>
        <span style="color: #b3b3b3; font-size: 12px; margin-left: 12px"
          >开启后所有文章将支持评论，关闭后仅支持系统自动轮播</span
        >
      </div>
      <div class="row">
        <div class="label">显示评论:</div>
        <el-switch
          v-model="batchSettingInfo.showComment"
          active-color="#18A058"
          inactive-color="#EDEDED"
        >
        </el-switch>
        <span style="color: #b3b3b3; font-size: 12px; margin-left: 12px"
          >开启后所有文章评论将公开</span
        >
      </div>
      <div class="row" style="align-items: flex-start">
        <div class="label">数据显示:</div>
        <el-checkbox-group v-model="batchSettingInfo.checkList">
          <el-checkbox label="showCount">显示文章数量</el-checkbox>
          <el-checkbox label="showView">显示浏览量</el-checkbox>
          <el-checkbox label="showGood">显示点赞数量</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="popClass-bottom">
      <el-button size="mini" @click="closeDialog">取消</el-button>
      <el-button size="mini" type="primary" @click="updateBatchSetting"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showBatchSettingStatus: {
      type: Boolean,
      default: false,
    },
    batchSettingObj: {
      type: Object,
      default: {
        allowComment: true,
        showComment: true,
        checkList: [],
      },
    },
  },
  data() {
    return {
      batchSettingInfo: this.batchSettingObj,
    };
  },
  watch: {
    batchSettingObj: {
      handler(val) {
        this.batchSettingInfo = val;
      },
      deep: true,
    },
  },
  methods: {
    updateBatchSetting() {
      this.$emit("updateBatchSetting", this.batchSettingInfo);
      this.closeDialog();
    },
    closeDialog() {
      this.$emit("update:showBatchSettingStatus");
    },
  },
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
  .row {
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
