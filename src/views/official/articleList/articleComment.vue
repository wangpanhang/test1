<template>
  <div class="honor-qualification-container">
    <div class="page-header">
      <pageHeader title="文章评论" />
      <div class="line"></div>
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
          <el-table-column prop="commentTime" label="评论时间" width="200px">
          </el-table-column>
          <el-table-column prop="nickname" width="200px" label="用户名称">
          </el-table-column>
          <el-table-column
            prop="content"
            :show-overflow-tooltip="true"
            label="评论内容"
            width="1000px"
          >
          </el-table-column>
          <el-table-column
            prop="action"
            label="操作"
            width="160px"
            fixed="right"
          >
            <template slot-scope="scope">
              <div class="action-box">
                <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  cancel-button-type="none"
                  confirm-button-type="danger"
                  icon="el-icon-info"
                  icon-color="red"
                  title="删除后该评论将不会在文章中显示？"
                  @confirm="handleDelComment(scope.row)"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import Pagination from "@/components/Pagination";
import comment from "@/api/official/comment";

export default {
  components: {
    pageHeader,
    Pagination
  },
  name: "articleComment",
  computed: {
    ...mapGetters(["name", "roles"])
  },
  created() {
    this.articleId = this.$route.params.id || "";
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      tableData: [],
      loading: false,
      articleId: ""
    };
  },
  methods: {
    init() {
      this.getCommentList();
    },
    async getCommentList() {
      const params = {
        articleId: this.articleId,
        pageIndex: this.$refs.pagination.pageParam.pageIndex,
        pageSize: this.$refs.pagination.pageParam.pageSize
      };
      const res = await comment.getCommentList(params);
      if (res.code == 200) {
        this.tableData = res.data.list;
        // 赋值对应页码等数据
        this.$refs.pagination.pageParam.totalCount = res.data.total;
      }
    },
    async handleDelComment(row) {
      try {
        this.loading = true;
        const params = {
          commentId: row.commentId
        };
        const res = await comment.delArticleComment(params);
        if (res.code == 200) {
          this.$message.success("删除成功！");
          this.getCommentList();
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
      this.getCommentList();
    },
    handleCurrentChange() {
      this.getCommentList();
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
  .page-header {
    .line {
      width: 100%;
      margin-top: 8px;
      height: 1px;
      background-color: #e0e0e0;
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
        .del-action {
          color: #d03050;
        }
      }
    }
  }
}
</style>
