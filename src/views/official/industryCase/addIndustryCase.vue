<template>
  <div class="common-container">
    <div class="page-header">
      <pageHeader title="新增案例" />
      <div class="line"></div>
    </div>
    <div class="article-body">
      <div class="article-left">
        <div class="article-left-form">
          <el-form
            :model="articleObj"
            :rules="rules"
            label-position="top"
            ref="formRef"
          >
            <el-form-item label="案例标题" prop="title">
              <el-input
                style="width: 360px;border-radius: 3px;"
                v-model="articleObj.title"
                size="medium"
                placeholder="请输入案例标题"
                maxlength="30"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item prop="tags">
              <div slot="label" class="label-box">
                <span style="font-size: 14px;">案例标签</span>
                <span style="font-size: 14px;color:#9EA4AA;margin-left: 224px;"
                  >可添加3个</span
                >
              </div>
              <el-select
                v-model="articleObj.tags"
                multiple
                filterable
                allow-create
                default-first-option
                style="width: 360px;border-radius: 3px;"
                placeholder="请输入标签按回车键确认"
                :multiple-limit="3"
              >
                <el-option
                  v-for="item in tagOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="文章来源">
              <el-radio-group v-model="articleObj.source">
                <el-radio label="1">原创</el-radio>
                <el-radio label="2"
                  >转载<el-input
                    style="margin-left: 20px;width: 200px;border-radius: 3px;"
                    v-model="reprinted"
                    size="medium"
                    placeholder="来源(如:央视新闻)"
                    maxlength="10"
                    show-word-limit
                  ></el-input
                ></el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="案例分类">
              <el-select
                v-model="articleObj.categoryId"
                placeholder="请选择案例分类"
                style="width: 200px;border-radius: 3px;"
              >
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="案例封面" prop="cover">
              <div class="upload-cover-box">
                <el-upload
                  class="upload-box"
                  action="action"
                  :show-file-list="false"
                  :file-list="fileList"
                  :before-upload="beforeUpload"
                  :http-request="handleUpload1"
                >
                  <div class="upload-file-box" v-if="!articleObj.cover"></div>
                  <div
                    v-else
                    class="upload-image"
                    :style="{ backgroundImage: `url(${articleObj.cover})` }"
                  ></div>
                </el-upload>
                <div class="upload-tips">
                  <span>推荐使用的宽高为375px*200px或同比例小于1M的图片。</span>
                  <span>支持JPG、PNG、JPEG格式。</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="案例头图">
              <div class="upload-headImg-box">
                <el-upload
                  class="upload-box"
                  action="action"
                  :show-file-list="false"
                  :file-list="fileList"
                  :before-upload="beforeUpload"
                  :http-request="handleUpload2"
                >
                  <div
                    class="upload-file-box"
                    v-if="!articleObj.headImage"
                  ></div>
                  <div
                    v-else
                    class="upload-image"
                    :style="{ backgroundImage: `url(${articleObj.headImage})` }"
                  ></div>
                </el-upload>
                <div class="upload-tips">
                  <span
                    >推荐使用的宽高为1920px*400px或同比例小于1M的图片。</span
                  >
                  <span>支持JPG、PNG、JPEG格式。</span>
                  <span>注：未上传默认使用列表页头图。</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="案例客户logo" prop="cover">
              <div class="upload-customer-logo-box">
                <el-upload
                  class="upload-box"
                  action="action"
                  :show-file-list="false"
                  :file-list="fileList"
                  :before-upload="beforeUpload"
                  :http-request="handleUpload3"
                >
                  <div
                    class="upload-file-box"
                    v-if="!articleObj.customerLogo"
                  ></div>
                  <div
                    v-else
                    class="upload-image"
                    :style="{
                      backgroundImage: `url(${articleObj.customerLogo})`
                    }"
                  ></div>
                </el-upload>
                <div class="upload-tips">
                  <span>推荐使用的宽高为1:1大小小于1M的图片。</span>
                  <span>支持JPG、PNG、JPEG格式。</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="客户规模" prop="customerScale">
              <el-input
                style="width: 360px;border-radius: 3px;"
                v-model="articleObj.customerScale"
                size="medium"
                placeholder="如: 制造业/5,000人/广州"
                maxlength="30"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="案例客户介绍" prop="digest">
              <div class="digest-box">
                <el-input
                  style="width: 360px;border-radius: 3px;"
                  v-model="articleObj.digest"
                  size="medium"
                  placeholder="请输入案例客户介绍"
                  :autosize="{ minRows: 5, maxRows: 8 }"
                  type="textarea"
                  maxlength="180"
                  show-word-limit
                ></el-input>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="rich-text-box">
        <RichText width="1200" v-model="articleObj.contentHtml" />
      </div>
    </div>
    <div class="footer">
      <div class="common-btn cancel-btn" @click="$router.go(-1)">取消</div>
      <!-- <div class="common-btn publish-btn" @click="timelyPublish">定时发布</div> -->
      <div class="common-btn save-btn" @click="savePublish">保存并发布</div>
    </div>
  </div>
</template>

<script>
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import upload from "@/api/upload.js";
import RichText from "@/components/RichText/index.vue";
import industryCase from "@/api/official/industryCase";
export default {
  name: "addArticle",
  components: {
    pageHeader,
    RichText
  },
  data() {
    return {
      articleObj: {
        title: "",
        tags: [],
        categoryId: 11,
        cover: "",
        headImage: "",
        contentHtml: "",
        digest: "",
        customerLogo: "",
        customerScale: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入案例标题", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur"
          }
        ],
        tags: [
          {
            type: "array",
            required: true,
            message: "请输入至少一个标签"
          }
        ],
        cover: [{ required: true, message: "请上传案例封面", trigger: "blur" }],
        customerScale: [
          { required: true, message: "请输入客户规模", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur"
          }
        ],
        digest: [
          { required: true, message: "请输入文章摘要", trigger: "blur" },
          {
            min: 1,
            max: 180,
            message: "长度在 1 到 180 个字符",
            trigger: "blur"
          }
        ]
      },
      tagOptions: [],
      reprinted: "",
      typeList: [
        {
          value: 11,
          label: "服务器"
        },
        {
          value: 12,
          label: "高端装备"
        },
        {
          value: 13,
          label: "工业及传感"
        },
        {
          value: 14,
          label: "器件视觉"
        },
        {
          value: 15,
          label: "通信"
        },
        {
          value: 16,
          label: "医疗电子"
        },
        {
          value: 17,
          label: "汽车电子"
        },
        {
          value: 18,
          label: "计算机"
        }
      ],
      fileList: [],
      submitStatus: false
    };
  },
  methods: {
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
        this.$message.error("上传图片大小不能超过 1MB!");
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
        this.articleObj.cover = res.data.fileName;
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
        this.articleObj.headImage = res.data.fileName;
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
        this.articleObj.customerLogo = res.data.fileName;
        this.$message.success("上传图片成功");
      } else {
        this.$message.error("上传图片失败");
      }
    },
    savePublish() {
      if (this.submitStatus) {
        this.$message.warning("请勿频繁操作");
        return;
      }
      this.submitStatus = true;
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          this.publishArticle();
        } else {
          this.submitStatus = false;
        }
      });
    },
    async publishArticle(time = null) {
      try {
        const params = {
          categoryId: this.articleObj.categoryId,
          content: "",
          contentHtml: this.articleObj.contentHtml,
          cover: this.articleObj.cover,
          title: this.articleObj.title,
          headImage: this.articleObj.headImage,
          digest: this.articleObj.digest,
          tags: this.articleObj.tags.join(","),
          customerLogo: this.articleObj.customerLogo,
          customerScale: this.articleObj.customerScale
        };
        const res = await industryCase.addCase(params);
        if (res.code == 200) {
          this.$message.success("案例发布成功!");
          this.$router.replace({
            name: "industryCase"
          });
        } else {
          this.$message.error("案例发布失败!");
        }
      } catch (_) {
        this.$message.error("案例发布失败!");
      } finally {
        this.submitStatus = false;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.common-container {
  flex: 1;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px 20px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 16px;
  position: relative;
  .page-header {
    .line {
      width: 100%;
      margin-top: 8px;
      height: 1px;
      background-color: #e0e0e0;
    }
  }
  .article-body {
    flex: 1;
    display: flex;
    align-items: center;
    overflow: hidden;
    .article-left {
      // flex: 1;
      max-width: 400px;
      height: 100%;
      overflow: hidden;
      display: flex;
      /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
      ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
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
      .article-left-form {
        flex: 1;
        overflow: auto;
        .label-box {
          display: inline-block;
        }
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
          resize: none;
        }

        .digest-box {
          /deep/ .el-input__count {
            background-color: #f2f3f5;
          }
        }
        .upload-cover-box {
          width: 100%;
          display: flex;
          .upload-box {
            width: 140px;
            height: 105px;
            /deep/ .el-upload-dragger {
              width: 140px;
              height: 105px;
            }
            .upload-file-box {
              width: 140px;
              height: 105px;
              background-image: url("../../../assets/img/upload-cover.png");
              background-size: 100% 100%;
              background-repeat: no-repeat;
              cursor: pointer;
              &:hover {
                border: 1px solid;
              }
            }
            .upload-image {
              width: 140px;
              height: 105px;
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-position: center;
            }
          }
          .upload-tips {
            width: 208px;
            margin-left: 12px;
            font-size: 12px;
            color: #9ea4aa;
            span {
              display: block;
              line-height: 20px;
            }
          }
        }
        .upload-headImg-box {
          width: 100%;
          display: flex;
          .upload-box {
            width: 157px;
            height: 80px;
            /deep/ .el-upload-dragger {
              width: 157px;
              height: 80px;
            }
            .upload-file-box {
              width: 157px;
              height: 80px;
              background-image: url("../../../assets/img/upload-head-img.png");
              background-size: 100% 100%;
              background-repeat: no-repeat;
              cursor: pointer;
              &:hover {
                border: 1px solid;
              }
            }
            .upload-image {
              width: 157px;
              height: 80px;
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-position: center;
            }
          }
          .upload-tips {
            width: 208px;
            margin-left: 12px;
            font-size: 12px;
            color: #9ea4aa;
            span {
              display: block;
              line-height: 20px;
            }
          }
        }
        .upload-customer-logo-box {
          width: 100%;
          display: flex;
          .upload-box {
            width: 80px;
            height: 80px;
            /deep/ .el-upload-dragger {
              width: 80px;
              height: 80px;
            }
            .upload-file-box {
              width: 80px;
              height: 80px;
              background-image: url("../../../assets/img/upload-logo.png");
              background-size: 100% 100%;
              background-repeat: no-repeat;
              cursor: pointer;
              &:hover {
                border: 1px solid;
              }
            }
            .upload-image {
              width: 80px;
              height: 80px;
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-position: center;
            }
          }
          .upload-tips {
            width: 268px;
            margin-left: 12px;
            font-size: 12px;
            color: #9ea4aa;
            span {
              display: block;
              line-height: 20px;
            }
          }
        }
      }
    }
    .rich-text-box {
      height: 100%;
      overflow: hidden;
      display: flex;
      box-sizing: border-box;
      padding: 12px;
      border-radius: 4px;
      background: #f0f2f5;
      margin-left: 20px;
    }
  }
  .footer {
    width: 100%;
    height: 56px;
    background-color: #fff;
    border-top: 1px solid var(--border-, #e4e7ed);
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    .common-btn {
      width: 120px;
      height: 34px;
      padding: 0 14px;
      text-align: center;
      line-height: 34px;
      border-radius: 3px;
      font-size: 14px;
      cursor: pointer;
      transition: opacity 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }
    .cancel-btn {
      background-color: #fff;
      border: 1px solid #e0e0e6;
      color: #333;
    }
    .publish-btn {
      background: #fcb040;
      color: #fff;
    }
    .save-btn {
      background: #2080f0;
      color: #fff;
    }
  }
}
</style>
