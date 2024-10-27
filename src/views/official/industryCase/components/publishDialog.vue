<template>
  <el-dialog
    :visible="showPublishStatus"
    class="newPopOptions"
    width="446px"
    :close-on-press-escape="false"
    @close="closeDialog"
  >
    <div class="newPopOptionsTitle">
      <template v-if="type == 'unPublish'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23.6668 11.9998C23.6668 5.55651 18.4435 0.33317 12.0002 0.33317C5.55684 0.33317 0.333496 5.55651 0.333496 11.9998C0.333496 18.4432 5.55684 23.6665 12.0002 23.6665C18.4435 23.6665 23.6668 18.4432 23.6668 11.9998ZM10.8335 16.8332C10.8335 17.3855 11.2812 17.8332 11.8335 17.8332H12.1668C12.7191 17.8332 13.1668 17.3855 13.1668 16.8332V10.6665C13.1668 10.1142 12.7191 9.6665 12.1668 9.6665H11.8335C11.2812 9.6665 10.8335 10.1142 10.8335 10.6665V16.8332ZM12.0002 6.1665C12.6445 6.1665 13.1668 6.68884 13.1668 7.33317C13.1668 7.9775 12.6445 8.49984 12.0002 8.49984C11.3558 8.49984 10.8335 7.9775 10.8335 7.33317C10.8335 6.68884 11.3558 6.1665 12.0002 6.1665Z"
            fill="#FCB040"
          />
        </svg>
      </template>
      <template v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.0002 23.6663C18.4435 23.6663 23.6668 18.443 23.6668 11.9997C23.6668 5.55635 18.4435 0.333008 12.0002 0.333008C5.55684 0.333008 0.333496 5.55635 0.333496 11.9997C0.333496 18.443 5.55684 23.6663 12.0002 23.6663ZM10.7627 14.4687L15.9128 9.31859C16.3033 8.92807 16.9365 8.92807 17.327 9.31859L17.4802 9.4718C17.8708 9.86232 17.8708 10.4955 17.4802 10.886L11.623 16.7432L11.4698 16.8964C11.0793 17.2869 10.4461 17.2869 10.0556 16.8964L9.90241 16.7432L6.52008 13.3609C6.12956 12.9704 6.12956 12.3372 6.52008 11.9467L6.67329 11.7935C7.06382 11.4029 7.69698 11.4029 8.0875 11.7935L10.7627 14.4687Z"
            fill="#18A058"
          />
        </svg>
      </template>
      <span style="margin-left: 12px"
        >{{ type == "unPublish" ? "下架" : "发布" }}岗位</span
      >
    </div>
    <div class="dialog-body">
      <div class="tips">
        {{
          type == "unPublish"
            ? "下架后该案例将不会在官网页面显示，确定要下架吗？"
            : "发布案例将在官网页面进行显示，确定发布吗？"
        }}
      </div>
    </div>
    <div class="popClass-bottom">
      <div class="common-btn cancel-btn" @click="closeDialog">取消</div>
      <div
        class="common-btn unpublish-btn"
        v-if="type == 'unPublish'"
        @click="handlePublishArticle"
      >
        确定
      </div>
      <div class="common-btn publish-btn" v-else @click="handlePublishArticle">
        确定
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showPublishStatus: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "publish"
    }
  },
  data() {
    return {};
  },
  methods: {
    handlePublishArticle() {
      this.$emit("handlePublishArticle");
      this.closeDialog();
    },
    closeDialog() {
      this.$emit("update:showPublishStatus");
    }
  }
};
</script>

<style lang="scss" scoped>
.newPopOptionsTitle {
  text-align: left;
  font-size: 18px;
  color: #1f2225;
  box-sizing: border-box;
  padding: 0 20px;
  font-weight: bold;
  // border-bottom: 1px solid #e0e0e6;
  display: flex;
  align-items: center;
}
.dialog-body {
  width: 100%;
  box-sizing: border-box;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .tips {
    font-size: 14px;
    color: #333639;
  }
}
.popClass-bottom {
  box-sizing: border-box;
  padding: 0 20px;
  width: 100%;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .common-btn {
    height: 28px;
    padding: 0 14px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    cursor: pointer;
    font-size: 14px;
    color: #fff;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.8;
    }
    &:not(:last-child) {
      margin-right: 12px;
    }
  }
  .unpublish-btn {
    background: #fcb040;
  }
  .publish-btn {
    background: #18a058;
  }
  .cancel-btn {
    background: #fff;
    border: 1px solid #e0e0e6;
    color: #333;
  }
  // border-top: 1px solid #e0e0e6;
}
</style>
