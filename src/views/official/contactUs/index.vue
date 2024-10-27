<template>
  <div class="honor-qualification-container">
    <pageHeader title="联系我们" />
    <div class="form-box">
      <div class="form-container">
        <el-form
          :model="jobObj"
          :rules="rules"
          label-width="240px"
          ref="formRef"
          label-position="top"
        >
          <el-form-item label="联系电话" prop="telephone">
            <el-input
              style="width: 360px;border-radius: 3px;"
              v-model="jobObj.telephone"
              size="medium"
              placeholder="请输入联系人手机号"
              maxlength="11"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="工作时间" prop="workTime">
            <el-input
              style="width: 360px;border-radius: 3px;"
              v-model="jobObj.workTime"
              size="medium"
              placeholder="请输入公司上班时间(如：周一至周五 9:00 - 18:00)"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱" prop="mailbox">
            <el-input
              style="width: 360px;border-radius: 3px;"
              v-model="jobObj.mailbox"
              size="medium"
              placeholder="请输入公司联系人邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系地址" prop="address">
            <el-input
              style="width: 360px;border-radius: 3px;"
              v-model="jobObj.address"
              size="medium"
              type="textarea"
              rows="4"
              placeholder="请输入公司联系地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="二维码联系">
            <div class="qrCode-box">
              <div class="qrCode-item">
                <el-upload
                  class="upload-box"
                  action="action"
                  :show-file-list="false"
                  :file-list="fileList"
                  :before-upload="beforeUpload"
                  :http-request="handleUpload1"
                >
                  <div class="upload-file-box" v-if="!qrcode1"></div>
                  <div
                    v-else
                    class="upload-image"
                    :style="{ backgroundImage: `url(${qrcode1})` }"
                  ></div>
                </el-upload>
                <el-input
                  style="margin-top: 8px;width: 200px;border-radius: 3px;"
                  v-model="qrcode1Remark"
                  size="medium"
                  placeholder="输入二维码描述"
                  maxlength="8"
                  show-word-limit
                ></el-input>
              </div>
              <div class="qrCode-item">
                <el-upload
                  class="upload-box"
                  action="action"
                  :show-file-list="false"
                  :file-list="fileList"
                  :before-upload="beforeUpload"
                  :http-request="handleUpload2"
                >
                  <div class="upload-file-box" v-if="!qrcode2"></div>
                  <div
                    v-else
                    class="upload-image"
                    :style="{ backgroundImage: `url(${qrcode2})` }"
                  ></div>
                </el-upload>
                <el-input
                  style="margin-top: 8px;width: 200px;border-radius: 3px;"
                  v-model="qrcode2Remark"
                  size="medium"
                  placeholder="输入二维码描述"
                  maxlength="8"
                  show-word-limit
                ></el-input>
              </div>
              <div class="qrCode-item">
                <el-upload
                  class="upload-box"
                  action="action"
                  :show-file-list="false"
                  :file-list="fileList"
                  :before-upload="beforeUpload"
                  :http-request="handleUpload3"
                >
                  <div class="upload-file-box" v-if="!qrcode3"></div>
                  <div
                    v-else
                    class="upload-image"
                    :style="{ backgroundImage: `url(${qrcode3})` }"
                  ></div>
                </el-upload>
                <el-input
                  style="margin-top: 8px;width: 200px;border-radius: 3px;"
                  v-model="qrcode3Remark"
                  size="medium"
                  placeholder="输入二维码描述"
                  maxlength="8"
                  show-word-limit
                ></el-input>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bottom-btn-box">
      <el-button size="small" style="width: 120px;" @click="$router.go(-1)"
        >返回</el-button
      >
      <el-button
        size="small"
        style="width: 120px;"
        type="primary"
        @click="toSave"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import contactUs from "@/api/official/contactUs.js";
import upload from "@/api/upload.js";

export default {
  components: {
    pageHeader
  },
  name: "contactUs",
  computed: {
    ...mapGetters(["name", "roles"])
  },
  mounted() {
    this.init();
  },
  data() {
    const validatePhone = (_, value, callback) => {
      const reg = new RegExp(
        /^(1(3[0-9]|4[0145789]|5[0-35-9]|6[267]|7[0-8]|8[0-9]|9[0-9]))\d{8}$/g
      );
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("手机号格式错误"));
      }
    };
    return {
      jobObj: {
        telephone: "",
        workTime: "",
        mailbox: "",
        address: ""
      },
      rules: {
        telephone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            min: 1,
            max: 11,
            message: "长度在 1 到 11 个字符",
            trigger: "blur"
          },
          {
            validator: validatePhone,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        workTime: [
          { required: true, message: "请输入工作时间", trigger: "blur" }
        ],
        mailbox: [
          { required: true, message: "请输入公司联系人邮箱", trigger: "blur" }
        ],
        address: [
          {
            required: true,
            message: "请输入公司联系地址",
            trigger: "blur"
          }
        ]
      },
      submitStatus: false,
      fileList: [],
      qrcode1: "",
      qrcode1Remark: "",
      qrcode2: "",
      qrcode2Remark: "",
      qrcode3: "",
      qrcode3Remark: ""
    };
  },
  methods: {
    async init() {
      const res = await contactUs.getContactUs();
      if (res.code == 200) {
        this.jobObj = {
          telephone: res.data.telephone,
          workTime: res.data.workTime,
          mailbox: res.data.mailbox,
          address: res.data.address
        };
        this.qrcode1 = res.data.qrcode1 || "";
        this.qrcode2 = res.data.qrcode2 || "";
        this.qrcode3 = res.data.qrcode3 || "";
      }
    },
    beforeUpload(file) {
      const fileType = ["image/jpg", "image/png", "image/jpeg"];
      const isJPG = fileType.includes(file.type);
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error("请上传图片类型文件, 仅支持JPG、PNG、JPEG类型!");
        this.fileList = [];
        return false;
      }
      if (!isLt1M) {
        this.$message.error("上传二维码图片大小不能超过 1MB!");
        this.fileList = [];
        return false;
      }
      return true;
    },
    async handleUpload1(file) {
      let formData = new FormData();
      formData.append("image", file.file);
      const res = await upload.uploadImg(formData);
      if (res.code == 200) {
        this.qrcode1 = res.data.fileName;
        this.$message.success("上传图片成功");
      } else {
        this.$message.error("上传图片失败");
      }
    },
    async handleUpload2(file) {
      let formData = new FormData();
      formData.append("image", file.file);
      const res = await upload.uploadImg(formData);
      if (res.code == 200) {
        this.qrcode2 = res.data.fileName;
        this.$message.success("上传图片成功");
      } else {
        this.$message.error("上传图片失败");
      }
    },
    async handleUpload3(file) {
      let formData = new FormData();
      formData.append("image", file.file);
      const res = await upload.uploadImg(formData);
      if (res.code == 200) {
        this.qrcode3 = res.data.fileName;
        this.$message.success("上传图片成功");
      } else {
        this.$message.error("上传图片失败");
      }
    },
    async toSave() {
      if (this.submitStatus) {
        this.$message.warning("请勿频繁操作");
        return;
      }
      this.submitStatus = true;
      try {
        this.$refs.formRef.validate(async valid => {
          if (valid) {
            const params = {
              ...this.jobObj,
              qrcode1: this.qrcode1,
              qrcode2: this.qrcode2,
              qrcode3: this.qrcode3,
              qrcode3Remark: this.qrcode3Remark,
              qrcode2Remark: this.qrcode2Remark,
              qrcode1Remark: this.qrcode1Remark
            };
            const res = await contactUs.setContactUs(params);
            if (res.code == 200) {
              this.$message.success("保存信息成功");
              this.init();
            } else {
              this.$message.error("保存信息失败");
            }
          }
        });
      } catch (error) {
        console.log("error", error);
      } finally {
        this.submitStatus = false;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.honor-qualification-container {
  flex: 1;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px 20px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 16px;
  position: relative;
  .form-box {
    flex: 1;
    height: 100%;
    overflow: hidden;
    display: flex;
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: #f5f5f5;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
      // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #fff;
    }

    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #b4b4b4;
    }
    .form-container {
      flex: 1;
      overflow: auto;
      /deep/ .el-textarea__inner {
        background-color: #f2f3f5;
      }
      /deep/ .el-input .el-input__count .el-input__count-inner {
        background-color: #f2f3f5;
      }
      /deep/ .el-input__inner {
        background-color: #f2f3f5;
      }
      /deep/ .el-form-item__label {
        line-height: 30px;
        padding: 0px;
      }
      /deep/ .el-textarea__inner {
        white-space: pre-wrap;
        resize: none;
      }
      .qrCode-box {
        display: flex;
        align-items: center;
        gap: 24px;
        .qrCode-item {
          width: 200px;
          .upload-box {
            width: 200px;
            height: 200px;
            /deep/ .el-upload-dragger {
              width: 200px;
              height: 200px;
            }
            .upload-file-box {
              width: 200px;
              height: 200px;
              background-image: url("../../../assets/img/upload-qrcode.png");
              background-size: 100% 100%;
              background-repeat: no-repeat;
              cursor: pointer;
              &:hover {
                border: 1px solid;
              }
            }
            .upload-image {
              width: 200px;
              height: 200px;
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-position: center;
            }
          }
        }
      }
    }
  }
  .bottom-btn-box {
    width: 100%;
    height: 56px;
    border-top: 1px solid var(--border-, #e4e7ed);
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
}
</style>
