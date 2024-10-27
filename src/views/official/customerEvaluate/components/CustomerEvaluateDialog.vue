<template>
  <el-dialog
    :visible="value"
    class="newPopOptions"
    width="480px"
    :close-on-press-escape="false"
    @close="closeDialog"
  >
    <div class="newPopOptionsTitle">
      <span>{{ type == "add" ? "新增" : "编辑" }}评价</span>
    </div>
    <div class="dialog-body">
      <div class="upload-link-box" style="align-items: flex-start">
        <div class="text">客户头像:</div>
        <el-upload
          class="upload-box"
          drag
          ref="upload"
          action="action"
          :show-file-list="false"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :http-request="handleUpload"
        >
          <div
            class="upload-file-box"
            v-if="!customerEvaluateInfo.avatar"
          ></div>
          <div
            v-else
            class="upload-image"
            :style="{ backgroundImage: `url(${customerEvaluateInfo.avatar})` }"
          ></div>
        </el-upload>
        <span class="upload-tips"
          >推荐使用的宽高比为1：1小于1M的图片。
          支持JPG、PNG、JPEG、GIF格式。</span
        >
      </div>

      <div class="upload-link-box">
        <div class="text">客户名称:</div>
        <el-input
          v-model="customerEvaluateInfo.name"
          placeholder="请输入客户名称"
          style="width: 336px;border-radius: 3px;"
          maxlength="20"
          show-word-limit
        ></el-input>
      </div>
      <div class="upload-link-box">
        <div class="text">公司/职位:</div>
        <el-input
          v-model="customerEvaluateInfo.company"
          placeholder="请输入客户信息,如(公司-职位)"
          style="width: 336px;border-radius: 3px;"
          maxlength="20"
          show-word-limit
        ></el-input>
      </div>
      <div class="upload-link-box" style="align-items: flex-start">
        <div class="text">评价内容:</div>
        <el-input
          v-model="customerEvaluateInfo.content"
          placeholder="请输入客户评价"
          style="width: 336px;border-radius: 3px;"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
          maxlength="120"
          show-word-limit
        ></el-input>
      </div>
    </div>
    <div class="popClass-bottom">
      <el-button size="mini" @click="closeDialog">取消</el-button>
      <el-button size="mini" type="primary" @click="updateCarousel"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import upload from "@/api/upload.js";
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    customerEvaluateObj: {
      type: Object,
      default: () => {
        return {
          avatar: "",
          name: "",
          company: "",
          content: ""
        };
      }
    },
    type: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      customerEvaluateInfo: this.customerEvaluateObj,
      fileList: []
    };
  },
  watch: {
    customerEvaluateObj: {
      handler(val) {
        this.customerEvaluateInfo = val;
      },
      deep: true
    }
  },
  methods: {
    updateCarousel() {
      this.$emit("updateCustomerEvaluate", this.customerEvaluateInfo);
      this.closeDialog();
    },
    closeDialog() {
      this.customerEvaluateInfo = {
        avatar: "",
        name: "",
        company: "",
        content: ""
      };
      this.$emit("input");
    },
    beforeUpload(file) {
      const fileType = ["image/jpg", "image/png", "image/jpeg", "image/gif"];
      const isJPG = fileType.includes(file.type);
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error(
          "请上传图片类型文件, 仅支持JPG、PNG、JPEG、GIF类型!"
        );
        this.fileList = [];
        return false;
      }
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB!");
        this.fileList = [];
        return false;
      }
      return true;
    },
    async handleUpload(file) {
      let formData = new FormData();
      formData.append("image", file.file);
      const res = await upload.uploadImg(formData);
      if (res.code == 200) {
        this.customerEvaluateInfo = {
          ...this.customerEvaluateInfo,
          avatar: res.data.fileName
        };
        this.$message.success("上传图片成功");
      } else {
        this.$message.error("上传图片失败");
      }
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

  .upload-link-box {
    display: flex;
    align-items: center;
    // justify-content: center;
    .upload-box {
      width: 100px;
      height: 100px;
      /deep/ .el-upload-dragger {
        width: 100px;
        height: 100px;
      }
      .upload-file-box {
        width: 100px;
        height: 100px;
        background-image: url("../../../../assets/img/upload-avatar.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        cursor: move;
      }
      .upload-image {
        width: 100px;
        height: 100px;
        // background-image: url("../../../assets/img/upload-img.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
    .upload-tips {
      color: #9ea4aa;
      font-size: 12px;
      margin-left: 12px;
      line-height: 22px;
    }
    .text {
      width: 100px;
      min-width: 100px;
      font-size: 14px;
      color: #303133;
      margin-right: 8px;
      text-align: right;
    }
    .tips {
      flex: 1;
      margin-left: 8px;
      font-size: 12px;
      color: #9ea4aa;
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
/deep/ .el-button--primary {
  // background-color: #2080f0;
}
</style>
