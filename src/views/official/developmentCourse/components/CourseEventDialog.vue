<template>
  <el-dialog
    :visible="showCourseEventStatus"
    class="newPopOptions"
    width="520px"
    :close-on-press-escape="false"
    @close="closeDialog"
  >
    <div class="newPopOptionsTitle">
      <span>{{ type == "add" ? "新增" : "编辑" }}历程事件</span>
    </div>
    <div class="dialog-body">
      <div class="row">
        <div class="label"><span style="color: #F53F3F">*</span>发生日期:</div>
        <el-date-picker
          style="width: 360px"
          v-model="dateVal"
          :disabled="type != 'add'"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </div>
      <div class="row" style="align-items: flex-start">
        <div class="label"><span style="color: #F53F3F">*</span>事件描述:</div>
        <el-input
          style="width: 360px;"
          type="textarea"
          :rows="3"
          maxlength="120"
          show-word-limit
          placeholder="请输入事件描述"
          v-model="content"
          :clearable="true"
        >
        </el-input>
      </div>
    </div>
    <div class="popClass-bottom">
      <el-button size="mini" @click="closeDialog">取消</el-button>
      <el-button size="mini" type="primary" @click="updateCourseEvent"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showCourseEventStatus: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "add"
    },
    courseEventObj: {
      type: Object,
      default: {
        historyDate: "",
        content: ""
      }
    }
  },
  data() {
    return {
      dateVal: "",
      content: ""
    };
  },
  watch: {
    courseEventObj: {
      handler(val) {
        this.dateVal = val.historyDate;
        this.content = val.content;
      },
      deep: true
    }
  },
  methods: {
    updateCourseEvent() {
      if (this.dateVal === "" || this.content === "") {
        this.$message.warning("发生日期或事件描述内容不能为空");
        return;
      }
      console.log("this.dateVal", this.dateVal);
      this.$emit("updateCourseEvent", {
        dateVal: this.dateVal,
        content: this.content
      });
      this.closeDialog();
    },
    closeDialog() {
      this.dateVal = "";
      this.content = "";
      this.$emit("update:showCourseEventStatus");
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
</style>
