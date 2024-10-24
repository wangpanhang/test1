<template>
  <el-dialog
    :visible="showDetailStatus"
    class="newPopOptions"
    width="800px"
    :close-on-press-escape="false"
    @close="closeDialog"
  >
    <div class="newPopOptionsTitle">
      <span>处理</span>
    </div>
    <div class="dialog-body">
      <div class="row">
        <div class="column">
          <div class="label">联系人:</div>
          <div class="content">
            {{ messageInfo.authorName ? messageInfo.authorName : "--" }}
          </div>
        </div>
        <div class="column">
          <div class="label">联系电话:</div>
          <div class="content">
            {{ messageInfo.telephone ? messageInfo.telephone : "--" }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="label">业务类型:</div>
          <div class="content">
            {{ messageInfo.authorName ? messageInfo.authorName : "--" }}
          </div>
        </div>
        <div class="column">
          <div class="label">项目周期:</div>
          <div class="content">
            {{ messageInfo.telephone ? messageInfo.telephone : "--" }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="label">详细描述:</div>
          <div class="content-box">
            {{ messageInfo.content ? messageInfo.content : "--" }}
          </div>
        </div>
      </div>
      <template v-if="status == 0">
        <div class="row">
          <div class="column">
            <div class="label">处理时间:</div>
            <div class="content">
              {{ messageInfo.time ? messageInfo.time : "--" }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <div class="label">处理方式:</div>
            <div class="content" style="color: #d03050">
              {{ messageInfo.processStr ? messageInfo.processStr : "电话回访" }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <div class="label">处理描述:</div>
            <div class="content-box">
              {{ messageInfo.description ? messageInfo.description : "--" }}
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="popClass-bottom">
      <el-button size="mini" @click="closeDialog">取消</el-button>
      <el-button size="mini" type="primary" @click="closeDialog"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import messageManage from "@/api/official/messageManage";
export default {
  props: {
    showDetailStatus: {
      type: Boolean,
      default: false,
    },
    messageId: {
      type: String | Number,
      default: "",
    },
    status: {
      type: String | Number,
      default: 0,
    },
  },
  watch: {
    messageId: {
      handler(val) {
        this.getMessageInfo();
      },
      // immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      messageInfo: {
        authorName: "",
        telephone: "",
      },
    };
  },
  methods: {
    async getMessageInfo() {
      const params = {
        id: this.messageId,
      };
      const res = await messageManage.getMessageInfo(params);
      if (res.code == 200) {
        // this.messageInfo = res.data;
      }
    },
    closeDialog() {
      this.$emit("update:showDetailStatus");
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
    .column {
      flex: 1;
      display: flex;
      align-items: center;
      .label {
        width: 120px;
        min-width: 120px;
        max-width: 120px;
        color: #303133;
        font-size: 14px;
        text-align: right;
        margin-right: 8px;
      }
      .content {
        flex: 1;
      }
      .content-box {
        flex: 1;
        box-sizing: border-box;
        padding: 12px;
        border-radius: 3px;
        background: #f2f3f5;
        white-space: wrap;
        word-break: break-all;
      }
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
