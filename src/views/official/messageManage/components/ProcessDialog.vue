<template>
  <el-dialog
    :visible="showProcessStatus"
    class="newPopOptions"
    width="520px"
    :close-on-press-escape="false"
    @close="closeDialog"
  >
    <div class="newPopOptionsTitle">
      <span>处理</span>
    </div>
    <div class="dialog-body">
      <div class="row">
        <div class="label"><span style="color: #f53f3f">*</span>发生日期:</div>
        <el-select
          v-model="type"
          placeholder="请选择"
          size="small"
          style="width: 360px"
        >
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="row" style="align-items: flex-start">
        <div class="label">事件描述:</div>
        <el-input
          style="width: 360px"
          type="textarea"
          :rows="3"
          maxlength="120"
          show-word-limit
          placeholder="请简单描述处理结果，非必填"
          v-model="content"
          :clearable="true"
        >
        </el-input>
      </div>
    </div>
    <div class="popClass-bottom">
      <el-button size="mini" @click="closeDialog">取消</el-button>
      <el-button size="mini" type="primary" @click="updateProcess"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showProcessStatus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      type: 1,
      content: "",
      typeList: [
        {
          value: 1,
          label: "电话回访",
        },
        {
          value: 2,
          label: "添加微信/企微好友",
        },
        {
          value: 3,
          label: "邮件回访",
        },
        {
          value: 4,
          label: "无需回访",
        },
        {
          value: 5,
          label: "其它",
        },
      ],
    };
  },
  methods: {
    updateProcess() {
      this.$emit("updateProcess", {
        type: this.type,
        content: this.content,
      });
      this.closeDialog();
    },
    closeDialog() {
      this.type = 1;
      this.content = "";
      this.$emit("update:showProcessStatus");
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
