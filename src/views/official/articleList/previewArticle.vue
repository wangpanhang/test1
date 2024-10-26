<template>
  <div class="common-container">
    <div class="page-header">
      <pageHeader title="文章预览" />
      <div class="line"></div>
    </div>
    <div class="article-body"></div>
    <div class="footer">
      <div class="common-btn cancel-btn" @click="$router.go(-1)">返回</div>
      <div class="common-btn save-btn" @click="goToEdit">编辑</div>
    </div>
  </div>
</template>

<script>
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import articleList from "@/api/official/articleList";
export default {
  name: "previewArticle",
  components: {
    pageHeader
  },
  data() {
    return {
      articleObj: {
        title: "",
        tags: [],
        source: "1",
        categoryId: 1,
        cover: "",
        headImg: "",
        contentHtml: "",
        digest: ""
      },
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
          console.log("res", res);
          this.$message.success("获取文章详情成功!");
          const data = res.data;
          this.articleObj = {
            title: data.title || "",
            digest: data.digest || "",
            tags: data.tags.split(",").filter(item => item),
            categoryId: data.categoryId || 1,
            cover: data.cover || "",
            contentHtml: ""
          };
        } else {
          this.$message.error("获取文章详情失败!");
        }
      } catch (_) {
        this.$message.error("系统出错了，请稍后再试");
      }
    },
    goToEdit() {
      this.$router.push({
        name: "editArticle",
        params: {
          id: this.articleId
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
    overflow: hidden;
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
