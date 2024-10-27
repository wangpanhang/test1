<template>
  <div class="common-container">
    <div class="page-header">
      <pageHeader title="案例预览" />
      <div class="line"></div>
    </div>
    <div class="article-body">
      <div class="preview-container">
        <div class="preview-header-container">
          <div class="title">{{ articleObj.title }}</div>
          <div class="row">
            <span class="text">{{ articleObj.publishTime }}</span>
            <span class="text" v-if="articleObj.source">{{
              articleObj.source
            }}</span>
            <span class="text">谦亨电子</span>
            <span class="text">浏览量：{{ articleObj.viewCount || 0 }}</span>
          </div>
          <div class="row">
            <div class="unpublished" v-if="articleObj.state == 0">未发布</div>
            <div class="published" v-else-if="articleObj.state == 1">
              已发布
            </div>
            <div class="timely-publish" v-else-if="articleObj.state == 3">
              定时发布
            </div>
          </div>
          <div class="digest-box" v-if="articleObj.digest">
            {{ articleObj.digest }}
          </div>
        </div>
        <div v-if="articleObj.contentHtml" class="preview-content">
          <div v-html="articleObj.contentHtml"></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="common-btn cancel-btn" @click="$router.go(-1)">返回</div>
      <div class="common-btn save-btn" @click="goToEdit">编辑</div>
    </div>
  </div>
</template>

<script>
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import industryCase from "@/api/official/industryCase";
export default {
  name: "previewIndustryCase",
  components: {
    pageHeader
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
      caseId: ""
    };
  },
  created() {
    this.caseId = this.$route.params.id || "";
    this.getIndustryCaseInfo();
  },
  methods: {
    async getIndustryCaseInfo() {
      const params = {
        id: this.caseId
      };
      const res = await industryCase.getCaseInfo(params);
      if (res.code == 200) {
        this.$message.success("获取案例详情成功!");
        const data = res.data;
        this.articleObj = {
          title: data.title,
          tags: data.tags.split(",").filter(item => item),
          categoryId: data.categoryId,
          cover: data.cover,
          headImage: data.headImage || "",
          contentHtml: data.contentHtml,
          digest: data.digest,
          customerLogo: data.customerLogo,
          customerScale: data.customerScale
        };
      } else {
        this.$message.success("获取案例详情失败!");
        if (!this.caseId) {
          this.$router.replace({ name: "industryCase" });
        }
      }
    },
    goToEdit() {
      this.$router.push({
        name: "editIndustryCase",
        params: {
          id: this.caseId
        }
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
    justify-content: center;
    background-color: #f5f7ff;
    overflow: hidden;
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
    .preview-container {
      width: 1200px;
      height: 100%;
      overflow-y: auto;
      box-sizing: border-box;
      padding: 12px 0;
      .preview-header-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;
        box-sizing: border-box;
        padding: 40px;
        background-color: #fff;
        .title {
          font-size: 32px;
          color: #303133;
          font-weight: 700;
        }
        .row {
          display: flex;
          align-items: center;
          gap: 20px;
          .text {
            color: #9ea4aa;
            font-size: 14px;
          }
          .published {
            display: flex;
            width: max-content;
            height: 28px;
            padding: 0px 8px;
            align-items: center;
            border-radius: 2px;
            border: 1px solid rgba(24, 160, 88, 0.3);
            background: #eaf5ef;
            color: #18a058;
            font-size: 14px;
            text-align: center;
          }
          .unpublished {
            display: flex;
            width: max-content;
            height: 28px;
            padding: 0px 8px;
            align-items: center;
            border-radius: 2px;
            border: 1px solid rgba(252, 176, 64, 0.3);
            background: #fdf4e7;
            color: #fcb040;
            font-size: 14px;
            text-align: center;
          }
          .timely-publish {
            display: flex;
            width: max-content;
            height: 28px;
            padding: 0px 8px;
            align-items: center;
            border-radius: 2px;
            border: 1px solid rgba(208, 48, 80, 0.3);
            background: #fcf0f3;
            color: #d03050;
            font-size: 14px;
            text-align: center;
          }
        }
        .digest-box {
          width: 100%;
          background-color: #f4f5f6;
          box-sizing: border-box;
          padding: 16px;
          color: #333;
          font-size: 15px;
          white-space: wrap;
          line-height: 22px;
        }
      }
      .preview-content {
        box-sizing: border-box;
        padding: 40px;
        background-color: #fff;
      }
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
    .save-btn {
      background: #2080f0;
      color: #fff;
    }
  }
}
</style>
