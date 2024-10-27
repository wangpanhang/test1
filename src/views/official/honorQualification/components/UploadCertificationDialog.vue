<template>
  <el-dialog
    :visible="showUploadCertificateStatus"
    class="newPopOptions"
    width="520px"
    :close-on-press-escape="false"
    @close="closeDialog"
  >
    <div class="newPopOptionsTitle">
      <span>{{ type == "add" ? "上传" : "编辑" }}荣誉证书</span>
    </div>
    <div class="dialog-body">
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
        <div class="upload-file-box" v-if="!uploadUrl"></div>
        <div
          v-else
          class="upload-image"
          :style="{ backgroundImage: `url(${uploadUrl})` }"
        ></div>
      </el-upload>

      <div class="upload-link-box">
        <div class="text">跳转链接:</div>
        <el-select
          v-model="certificateId"
          placeholder="请选择证书类型"
          style="width: 360px"
          size="small"
        >
          <el-option
            v-for="item in certificateList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="upload-link-box">
        <div class="text">是否显示:</div>
        <el-input
          style="width: 360px"
          v-model="content"
          placeholder="请输入证书介绍"
          maxlength="30"
          show-word-limit
        ></el-input>
      </div>
    </div>
    <div class="popClass-bottom">
      <el-button size="mini" @click="closeDialog">取消</el-button>
      <el-button size="mini" type="primary" @click="updateCertificate"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import upload from "@/api/upload.js";
export default {
  props: {
    showUploadCertificateStatus: {
      type: Boolean,
      default: false
    },
    certificateObj: {
      type: Object,
      default: () => {
        return {
          content: "",
          certificateId: "1",
          uploadUrl: ""
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
      fileList: [],
      uploadUrl: "",
      certificateId: "1",
      certificateList: [
        {
          value: "1",
          label: "资质认证"
        },
        {
          value: "2",
          label: "专利认证"
        },
        {
          value: "3",
          label: "软著证书"
        }
      ],
      content: ""
    };
  },
  watch: {
    certificateObj: {
      handler(val) {
        this.uploadUrl = val.uploadUrl || "";
        this.certificateId = val.certificateId;
        this.content = val.content.trim();
      },
      deep: true
    }
  },
  methods: {
    updateCertificate() {
      if (this.uploadUrl === "" || !this.uploadUrl) {
        this.$message.error("请上传荣誉证书照片");
        return;
      }
      const uploadImageObj = {
        uploadUrl: this.uploadUrl,
        type: this.certificateId,
        content: this.content.trim()
      };
      this.$emit("updateCertificate", uploadImageObj);
      this.closeDialog();
    },
    closeDialog() {
      this.uploadUrl = "";
      this.content = "";
      this.certificateId = "1";
      this.$emit("update:showUploadCertificateStatus");
    },
    beforeUpload(file) {
      const fileType = ["image/jpg", "image/png", "image/jpeg", "image/gif"];
      const isJPG = fileType.includes(file.type);
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isJPG) {
        this.$message.error(
          "请上传图片类型文件, 仅支持JPG、PNG、JPEG、GIF类型!"
        );
        this.fileList = [];
        return false;
      }
      if (!isLt3M) {
        this.$message.error("上传轮播图图片大小不能超过 3MB!");
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
        this.uploadUrl = res.data.fileName;
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
  .upload-box {
    width: 480px;
    height: 140px;
    /deep/ .el-upload-dragger {
      width: 480px;
      height: 140px;
    }
    .upload-file-box {
      width: 100%;
      height: 140px;
      background-image: url("../../../../assets/img/upload-img.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      cursor: move;
    }
    .upload-image {
      width: 100%;
      height: 140px;
      // background-image: url("../../../assets/img/upload-img.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  .upload-link-box {
    display: flex;
    align-items: center;
    // justify-content: center;
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
