<template>
  <div class="honor-qualification-container">
    <pageHeader title="行业案例" />
    <div class="form-box">
      <div class="filter-box">
        <el-input
          v-model="filterObj.title"
          style="width: 200px"
          size="small"
          suffix-icon="el-icon-search"
          placeholder="输入案例标题查找"
          clearable
          @change="handleSearch"
        ></el-input>
        <div class="filter-item">
          <div class="label">案例类型：</div>
          <el-select
            v-model="filterObj.categoryId"
            placeholder="请选择案例类型"
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
          <div class="label">案例状态：</div>
          <el-select
            v-model="filterObj.state"
            placeholder="请选择案例状态"
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
          新增案例
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
          <el-table-column prop="cover" label="案例封面" width="120px">
            <template slot-scope="scope">
              <div class="img">
                <img :src="scope.row.cover" class="img" />
              </div>
              <!--  -->
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            width="408px"
            :show-overflow-tooltip="true"
            label="案例名称"
          >
          </el-table-column>
          <el-table-column prop="categoryName" label="案例分类" width="200px">
            <template slot-scope="scope">
              {{ typeTextObj[scope.row.categoryId] }}
            </template>
          </el-table-column>
          <el-table-column prop="tags" label="案例标签" width="296px">
            <template slot-scope="scope">
              <div
                v-if="scope.row.tags && scope.row.tags.length > 0"
                class="tag-box"
              >
                <div
                  class="tag-item"
                  v-for="(item, index) of scope.row.tags"
                  :key="index"
                >
                  {{ item }}
                </div>
              </div>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column prop="categoryId" label="案例状态" width="120px">
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
          <el-table-column prop="createTime" label="创建时间" width="200px">
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
                  title="删除后不可恢复，确定删除该案例吗？"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import Pagination from "@/components/Pagination";
import articleList from "@/api/official/articleList";
import industryCase from "@/api/official/industryCase";
import PublishDialog from "./components/PublishDialog.vue";

export default {
  components: {
    pageHeader,
    Pagination,
    PublishDialog
  },
  name: "industryCase",
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
          value: "11",
          label: "服务器"
        },
        {
          value: "12",
          label: "高端装备"
        },
        {
          value: "13",
          label: "工业及传感"
        },
        {
          value: "14",
          label: "器件视觉"
        },
        {
          value: "15",
          label: "通信"
        },
        {
          value: "16",
          label: "医疗电子"
        },
        {
          value: "17",
          label: "汽车电子"
        },
        {
          value: "18",
          label: "计算机"
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
      typeTextObj: {
        11: "服务器",
        12: "高端装备",
        13: "工业及传感",
        14: "器件视觉",
        15: "通信",
        16: "医疗电子",
        17: "汽车电子",
        18: "计算机"
      },
      caseId: ""
    };
  },
  methods: {
    init() {
      // 获取文章列表
      this.getCaseList();
    },
    async getCaseList() {
      let params = {
        pageIndex: this.$refs.pagination.pageParam.pageIndex,
        pageSize: this.$refs.pagination.pageParam.pageSize,
        ...this.filterObj
      };
      const res = await industryCase.getCaseList(params);
      if (res.code == 200) {
        this.tableData = res.data.list.map(item => {
          return {
            ...item,
            tags: item.tags.split(",").filter(item => item)
          };
        });
        // 赋值对应页码等数据
        this.$refs.pagination.pageParam.totalCount = res.data.total;
      }
    },
    handleSearch() {
      this.modifyPage(1);
      this.getCaseList();
    },
    goAddArticle() {
      this.$router.push({ name: "addIndustryCase" });
    },
    modifyPage(index) {
      this.$refs.pagination.pageParam.pageIndex = index;
    },
    handleGoEdit(row) {
      this.$router.push({
        name: "editIndustryCase",
        params: {
          id: row.id
        }
      });
    },
    handleGoDetail(row) {
      this.$router.push({
        name: "previewIndustryCase",
        params: {
          id: row.id
        }
      });
    },
    handleUnPublish(row) {
      this.actionType = "unPublish";
      this.caseId = row.id;
      this.showPublishStatus = true;
    },
    handlePublish(row) {
      this.actionType = "publish";
      this.caseId = row.id;
      this.showPublishStatus = true;
    },
    async handleDelCourse(row) {
      try {
        this.loading = true;
        const params = {
          id: row.id
        };
        const res = await industryCase.delCase(params);
        if (res.code == 200) {
          this.$message.success("删除成功！");
          this.getCaseList();
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
      this.getCaseList();
    },
    handleCurrentChange() {
      this.getCaseList();
    },
    async handlePublishArticle() {
      try {
        this.loading = true;
        const params = {
          id: this.caseId,
          status: this.actionType == "publish" ? 1 : 0
        };
        const res = await industryCase.publishCase(params);
        if (res.code == 200) {
          this.$message.success(
            `${this.actionType == "publish" ? "发布" : "下架"}案例成功！`
          );
          this.getCaseList();
        } else {
          this.$message.error(
            `${this.actionType == "publish" ? "发布" : "下架"}案例失败！`
          );
        }
      } catch (_) {
        this.$message.error(
          `${this.actionType == "publish" ? "发布" : "下架"}案例失败！`
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
      .tag-box {
        display: flex;
        align-items: center;
        gap: 10px;
        .tag-item {
          box-sizing: border-box;
          padding: 2px 8px;
          width: max-content;
          border-radius: 2px;
          border: 1px solid #e0e0e6;
          background: #fafafc;
          font-size: 14px;
          color: #333639;
        }
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
