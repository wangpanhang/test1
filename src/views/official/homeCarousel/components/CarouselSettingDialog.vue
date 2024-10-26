<template>
  <el-dialog
    :visible="showCarouselSettingStatus"
    class="newPopOptions"
    width="520px"
    :close-on-press-escape="false"
    @close="closeDialog"
  >
    <div class="newPopOptionsTitle">
      <span>{{ type == "add" ? "新增" : "编辑" }}轮播图</span>
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
        <el-input
          v-model="linkText"
          placeholder="请输入完整的跳转网址地址"
          style="width: 360px;"
        ></el-input>
      </div>
      <div class="upload-link-box">
        <div class="text">是否显示:</div>
        <el-switch
          v-model="isShowStatus"
          active-color="#18A058"
          inactive-color="#EDEDED"
        >
        </el-switch>
        <div class="tips">开启后轮播图将在首页进行轮播显示</div>
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
import article from "@/api/upload.js";
export default {
  props: {
    showCarouselSettingStatus: {
      type: Boolean,
      default: false
    },
    carouselActionObj: {
      type: Object,
      default: () => {
        return {
          linkVal: "",
          isShow: true,
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
      linkText: "",
      isShowStatus: true,
      fileList: [],
      uploadUrl: ""
    };
  },
  watch: {
    carouselActionObj: {
      handler(val) {
        console.log("carouselActionObj", val);
        this.linkText = val.linkVal || "";
        this.isShowStatus = !!val.isShow;
        this.uploadUrl = val.uploadUrl || "";
      },
      deep: true
    }
  },
  methods: {
    updateCarousel() {
      if (this.uploadUrl === "" || !this.uploadUrl) {
        this.$message.error("请上传一张轮播图");
        return;
      }
      const uploadImageObj = {
        uploadUrl: this.uploadUrl,
        linkText: this.linkText,
        isShowStatus: this.isShowStatus
      };
      this.$emit("add:carousel", uploadImageObj);
      this.uploadUrl = "";
    },
    closeDialog() {
      this.uploadUrl = "";
      this.$emit("update:showCarouselSettingStatus");
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
