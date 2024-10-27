<template>
  <div class="common-container">
    <div class="page-header">
      <pageHeader title="编辑文章" />
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
            <el-form-item label="文章标题" prop="title">
              <el-input
                style="width: 360px;border-radius: 3px;"
                v-model="articleObj.title"
                size="medium"
                placeholder="请输入文章标题"
                maxlength="30"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item prop="tags">
              <div slot="label" class="label-box">
                <span style="font-size: 14px;">文章标签</span>
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
                placeholder="请选择文章标签"
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
            <el-form-item label="文章来源">
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
            </el-form-item>
            <el-form-item label="文章分类">
              <el-select
                v-model="articleObj.categoryId"
                placeholder="请选择文章分类"
                style="width: 200px;border-radius: 3px;"
                disabled
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
            <el-form-item label="文章封面">
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
                  <span>推荐使用的宽高为280px*210px或同比例小于1M的图片。</span>
                  <span>支持JPG、PNG、JPEG格式。</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="文章摘要" prop="digest">
              <div class="digest-box">
                <el-input
                  style="width: 360px;border-radius: 3px;"
                  v-model="articleObj.digest"
                  size="medium"
                  placeholder="请输入文章摘要"
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
        <RichText width="820" v-model="articleObj.contentHtml" />
      </div>
    </div>
    <div class="footer">
      <div class="common-btn cancel-btn" @click="back">取消</div>
      <!-- <div class="common-btn publish-btn" @click="timelyPublish">定时发布</div> -->
      <div class="common-btn save-btn" @click="savePublish">保存并发布</div>
    </div>
    <PublishTimeDialog
      :showPublishTimeStatus="showPublishTimeStatus"
      @update:showPublishTimeStatus="showPublishTimeStatus = false"
      @updatePublishTime="publishArticle"
    />
  </div>
</template>

<script>
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import upload from "@/api/upload.js";
import RichText from "@/components/RichText/index.vue";
import articleList from "@/api/official/articleList";
import PublishTimeDialog from "./components/PublishTimeDialog.vue";
export default {
  name: "editArticle",
  components: {
    pageHeader,
    RichText,
    PublishTimeDialog
  },
  data() {
    return {
      articleObj: {
        title: "",
        tags: [],
        source: "1",
        categoryId: 1,
        cover: "",
        contentHtml: "",
        digest: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
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
          value: 1,
          label: "公司新闻"
        },
        {
          value: 2,
          label: "行业动态"
        },
        {
          value: 3,
          label: "技术方案"
        }
      ],
      fileList: [],
      showPublishTimeStatus: false,
      submitStatus: false,
      articleId: ""
    };
  },
  created() {
    this.articleId = this.$route.params.id || "";
    this.getArticleInfo();
  },
  methods: {
    async getArticleInfo() {
      try {
        const params = {
          id: this.articleId
        };
        const res = await articleList.getArticleInfo(params);
        if (res.code == 200) {
          this.$message.success("获取文章详情成功!");
          const data = res.data;
          this.articleObj = {
            title: data.title || "",
            digest: data.digest || "",
            tags: data.tags.split(",").filter(item => item),
            categoryId: data.categoryId || 1,
            cover: data.cover || "",
            contentHtml: data.contentHtml || "",
            source: data.source === "原创" ? "1" : "2"
          };
          if (data.source !== "原创") {
            this.reprinted = data.source;
          }
        } else {
          this.$message.error("获取文章详情失败!");
        }
      } catch (_) {
        this.$message.error("系统出错了，请稍后再试");
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
        this.$message.error("上传图片大小不能超过 1MB!");
        this.fileList = [];
        return false;
      }
      return true;
    },
    async handleUpload1(file) {
      console.log("hahahah", file);
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
        this.articleObj.headImg = res.data.fileName;
        this.$message.success("上传图片成功");
      } else {
        this.$message.error("上传图片失败");
      }
    },
    timelyPublish() {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          if (this.articleObj.source == "2") {
            if (this.reprinted === "" || !this.reprinted) {
              this.$message.warning("请输入文章来源");
              return;
            }
          }
          if (this.articleObj.contentHtml === "") {
            this.$message.warning("请输入文章内容");
            return;
          }
          this.showPublishTimeStatus = true;
        }
      });
    },
    savePublish() {
      if (this.submitStatus) {
        this.$message.warning("请勿频繁操作");
        return;
      }
      this.submitStatus = true;
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          if (this.articleObj.source == "2") {
            if (this.reprinted === "" || !this.reprinted) {
              this.$message.warning("请输入文章来源");
              return;
            }
          }
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
          source: this.articleObj.source == 1 ? "原创" : this.reprinted,
          digest: this.articleObj.digest,
          tags: this.articleObj.tags.join(","),
          id: this.articleId
        };
        const res = await articleList.editArticleList(params);
        if (res.code == 200) {
          this.$message.success("文章发布成功!");
          this.$router.replace({
            name: "articleList"
          });
        } else {
          this.$message.error("文章发布失败!");
        }
      } catch (_) {
        this.$message.error("文章发布失败!");
      } finally {
        this.submitStatus = false;
      }
    },
    back() {
      this.$router.replace({
        name: "articleList"
      });
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
