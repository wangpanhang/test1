<template>
  <el-dialog
    :visible="showPublishTimeStatus"
    class="newPopOptions"
    width="400px"
    :close-on-press-escape="false"
    @close="closeDialog"
  >
    <div class="newPopOptionsTitle">
      <span>定时发布</span>
    </div>
    <div class="dialog-body">
      <div class="row">
        <div class="label"><span style="color: #F53F3F">*</span>发布时间:</div>
        <el-date-picker
          v-model="publishTime"
          type="datetime"
          placeholder="选择日期时间"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="popClass-bottom">
      <el-button size="mini" @click="closeDialog">取消</el-button>
      <el-button size="mini" type="primary" @click="handlePublish"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showPublishTimeStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      publishTime: ""
    };
  },
  methods: {
    handlePublish() {
      if (!this.publishTime) {
        this.$message.warning("请选择一个发布时间!");
        return;
      }
      this.$emit("updatePublishTime", this.publishTime);
      this.closeDialog();
    },
    closeDialog() {
      this.publishTime = "";
      this.$emit("update:showPublishTimeStatus");
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
</style>
