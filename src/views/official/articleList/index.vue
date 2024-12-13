<template>
  <div class="honor-qualification-container">
    <pageHeader title="文章列表" />
    <div class="form-box">
      <div class="filter-box">
        <el-input
          v-model="filterObj.title"
          style="width: 200px"
          size="small"
          suffix-icon="el-icon-search"
          placeholder="输入文章标题查找"
          clearable
          @change="handleSearch"
        ></el-input>
        <div class="filter-item">
          <div class="label">文章类型：</div>
          <el-select
            v-model="filterObj.categoryId"
            placeholder="请选择文章类型"
            style="width: 160px"
            size="small"
            @change="handleSearch"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <div class="label">文章状态：</div>
          <el-select
            v-model="filterObj.state"
            placeholder="请选择文章状态"
            style="width: 160px"
            size="small"
            @change="handleSearch"
          >
            <el-option
              v-for="item in stateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="common-btn-box">
        <div class="common-btn add-btn" @click="goAddArticle">
          新增文章
        </div>
        <div class="common-btn line-btn" @click="showBatchSettingDialog">
          批量设置
        </div>
      </div>
    </div>
    <div class="el-table-container">
      <div class="el-table-box">
        <el-table
          :data="tableData"
          style="width: 100%"
          :border="false"
          height="100%"
          v-loading="loading"
          element-loading-text="正在加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :header-cell-style="{ backgroundColor: '#F2F3F5' }"
        >
          <el-table-column type="index" label="序号" width="56px">
          </el-table-column>
          <el-table-column prop="cover" label="文章封面" width="120px">
            <template slot-scope="scope">
              <div class="img">
                <img :src="scope.row.cover" class="img" />
              </div>
              <!--  -->
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            width="444px"
            :show-overflow-tooltip="true"
            label="文章标题"
          >
          </el-table-column>
          <el-table-column prop="categoryName" label="文章类型" width="120px">
            <template slot-scope="scope">
              {{ typeList[scope.row.categoryId].label }}
            </template>
          </el-table-column>
          <el-table-column prop="categoryId" label="文章状态" width="120px">
            <template slot-scope="scope">
              <div v-if="scope.row.state == 1" class="published">
                已发布
              </div>
              <div v-if="scope.row.state == 0" class="unpublished">
                未发布
              </div>
              <div v-if="scope.row.state == 3" class="timely-publish"></div>
            </template>
          </el-table-column>
          <el-table-column prop="viewCount" label="浏览量" width="120px">
          </el-table-column>
          <el-table-column prop="goodCount" label="点赞数" width="120px">
          </el-table-column>
          <el-table-column prop="commentCount" label="评论数" width="120px">
            <template slot-scope="scope">
              <div class="no-count" v-if="!scope.row.commentCount">0</div>
              <div class="has-count" v-else @click="goCommentPage(scope.row)">
                {{ scope.row.commentCount }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="publishTime" label="创建时间" width="180px">
          </el-table-column>
          <el-table-column
            prop="action"
            label="操作"
            width="200px"
            fixed="right"
          >
            <template slot-scope="scope">
              <div class="action-box">
                <span
                  class="common-action edit-action"
                  @click="handleGoDetail(scope.row)"
                  >预览</span
                >
                <span
                  class="common-action edit-action"
                  @click="handleGoEdit(scope.row)"
                  >编辑</span
                >

                <span
                  class="common-action removed-action"
                  v-if="scope.row.state == 1"
                  @click="handleUnPublish(scope.row)"
                  >下架</span
                >
                <span
                  class="common-action publish-action"
                  v-if="scope.row.state == 0"
                  @click="handlePublish(scope.row)"
                  >发布</span
                >
                <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  cancel-button-type="none"
                  confirm-button-type="danger"
                  icon="el-icon-info"
                  icon-color="red"
                  title="删除后不可恢复，确定删除该文章吗？"
                  @confirm="handleDelCourse(scope.row)"
                >
                  <span class="common-action del-action" slot="reference"
                    >删除</span
                  >
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <Pagination
          style="text-align: right"
          ref="pagination"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        />
      </div>
    </div>
    <PublishDialog
      :showPublishStatus="showPublishStatus"
      :type="actionType"
      @update:showPublishStatus="showPublishStatus = false"
      @handlePublishArticle="handlePublishArticle"
    />
    <BatchSettingDialog
      :showBatchSettingStatus="showBatchSettingStatus"
      :batchSettingObj="batchSettingObj"
      @update:showBatchSettingStatus="showBatchSettingStatus = false"
      @updateBatchSetting="updateBatchSetting"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import Pagination from "@/components/Pagination";
import articleList from "@/api/official/articleList";
import PublishDialog from "./components/PublishDialog.vue";
import BatchSettingDialog from "./components/BatchSettingDialog.vue";

export default {
  components: {
    pageHeader,
    Pagination,
    PublishDialog,
    BatchSettingDialog
  },
  name: "articleList",
  computed: {
    ...mapGetters(["name", "roles"])
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      tableData: [],
      loading: false,
      certificateVal: 0,
      filterObj: {
        categoryId: "",
        state: "",
        title: ""
      },
      typeList: [
        {
          value: "",
          label: "全部类型"
        },
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
      stateList: [
        {
          value: "",
          label: "全部状态"
        },
        {
          value: 0,
          label: "未发布"
        },
        {
          value: 1,
          label: "已发布"
        }
      ],
      showPublishStatus: false,
      actionType: "",
      showBatchSettingStatus: false,
      batchSettingObj: {
        commentAllow: true,
        commentShow: true,
        likeNumber: false,
        viewNumber: false,
        commentNumber: false
      },
      articleId: ""
    };
  },
  methods: {
    init() {
      // 获取文章列表
      this.getArticleList();
      // 获取文章批量设置信息
      this.getBatchConfig();
    },
    async getArticleList() {
      let params = {
        pageIndex: this.$refs.pagination.pageParam.pageIndex,
        pageSize: this.$refs.pagination.pageParam.pageSize,
        ...this.filterObj
      };
      const res = await articleList.getArticleList(params);
      if (res.code == 200) {
        this.tableData = res.data.list;
        // 赋值对应页码等数据
        this.$refs.pagination.pageParam.totalCount = res.data.total;
      }
    },
    async getBatchConfig() {
      const res = await articleList.getBatchConfig({});
      if (res.code == 200) {
        this.batchSettingObj = res.data;
      }
    },
    handleSearch() {
      this.modifyPage(1);
      this.getArticleList();
    },
    goAddArticle() {
      this.$router.push({ name: "addArticle" });
    },
    modifyPage(index) {
      this.$refs.pagination.pageParam.pageIndex = index;
    },
    handleGoEdit(row) {
      this.$router.push({
        name: "editArticle",
        params: {
          id: row.id
        }
      });
    },
    handleGoDetail(row) {
      this.$router.push({
        name: "previewArticle",
        params: {
          id: row.id
        }
      });
    },
    goCommentPage(row) {
      this.$router.push({
        name: "articleComment",
        params: {
          id: row.id
        }
      });
    },
    showBatchSettingDialog() {
      this.showBatchSettingStatus = true;
    },
    async updateBatchSetting(obj) {
      this.batchSettingObj = obj;
      const res = await articleList.setBatchConfig(obj);
      if (res.code == 200) {
        this.$message.success("设置成功!");
      } else {
        this.$message.error("设置失败,请重试!");
      }
    },
    handleUnPublish(row) {
      this.actionType = "unPublish";
      this.articleId = row.id;
      this.showPublishStatus = true;
    },
    handlePublish(row) {
      this.actionType = "publish";
      this.articleId = row.id;
      this.showPublishStatus = true;
    },
    async handleDelCourse(row) {
      try {
        this.loading = true;
        const params = {
          id: row.id
        };
        const res = await articleList.delArticle(params);
        if (res.code == 200) {
          this.$message.success("删除成功！");
          this.getArticleList();
        } else {
          this.$message.error("删除失败！");
        }
      } catch (_) {
        this.$message.error("删除失败！");
      } finally {
        this.loading = false;
      }
    },
    handleSizeChange() {
      this.getArticleList();
    },
    handleCurrentChange() {
      this.getArticleList();
    },
    async handlePublishArticle() {
      try {
        this.loading = true;
        const params = {
          id: this.articleId,
          status: this.actionType == "publish" ? 1 : 0
        };
        const res = await articleList.updateArticleList(params);
        if (res.code == 200) {
          this.$message.success(
            `${this.actionType == "publish" ? "发布" : "下架"}文章成功！`
          );
          this.getArticleList();
        } else {
          this.$message.error(
            `${this.actionType == "publish" ? "发布" : "下架"}文章失败！`
          );
        }
      } catch (_) {
        this.$message.error(
          `${this.actionType == "publish" ? "发布" : "下架"}文章失败！`
        );
      } finally {
        this.loading = false;
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 16px;
  .form-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .filter-box {
      display: flex;
      align-items: center;
      gap: 24px;
      .filter-item {
        display: flex;
        align-items: center;
        .label {
          font-size: 14px;
          color: #303133;
        }
      }
    }
    .common-btn-box {
      display: flex;
      align-items: center;
      gap: 12px;
      .common-btn {
        height: 34px;
        line-height: 34px;
        box-sizing: border-box;
        padding: 0 14px;
        text-align: center;
        transition: opacity 0.3s;
        cursor: pointer;
        border-radius: 3px;
        font-size: 14px;
        &:hover {
          opacity: 0.8;
        }
      }
      .add-btn {
        background-color: #2080f0;
        color: #fff;
      }
      .line-btn {
        border: 1px solid #2080f0;
        color: #2080f0;
      }
    }
  }
  .el-table-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    position: relative;
    .el-table-box {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .img {
        width: 56px;
        height: 42px;
        object-fit: cover;
      }
      .has-count {
        color: #2080f0;
        cursor: pointer;
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
      .action-box {
        display: flex;
        align-items: center;
        .common-action {
          font-size: 14px;
          cursor: pointer;
          &:not(:last-child) {
            margin-right: 12px;
          }
        }
        .edit-action {
          color: #2080f0;
        }
        .removed-action {
          color: #fcb040;
        }
        .publish-action {
          color: #18a058;
        }
        .del-action {
          color: #d03050;
        }
      }
    }
  }
  /deep/ .el-dialog {
    background-color: #fff;
    border-radius: 4px;
  }
  /deep/ .el-dialog__header {
    padding: 0;
  }
  /deep/ .el-dialog__body {
    padding: 20px 0;
  }
}
</style>
