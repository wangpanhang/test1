<template>
  <div class="development-course-container">
    <pageHeader title="发展历程" />
    <div class="course-btn-box">
      <div class="common-btn add-btn" @click="showCourseEventDialog">
        新增历程事件
      </div>
    </div>
    <div class="el-table-container">
      <div class="el-table-box">
        <el-table
          :data="tableData"
          style="width: 100%;"
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
          <el-table-column prop="historyDate" label="历程发生日期" width="176px">
          </el-table-column>
          <el-table-column prop="content" label="事件描述"> </el-table-column>
          <el-table-column prop="gmtModified" label="最后编辑时间" width="176px">
          </el-table-column>
          <el-table-column prop="editor" label="最后编辑人" width="136px">
          </el-table-column>
          <el-table-column prop="action" label="操作" width="136px" fixed="right">
            <template slot-scope="scope">
              <div class="action-box">
                <span
                  class="common-action edit-action"
                  @click="handleEdit(scope.row)"
                  >编辑</span
                >
                <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  cancel-button-type="none"
                  confirm-button-type="danger"
                  icon="el-icon-info"
                  icon-color="red"
                  title="删除后不可恢复，确定删除该历史事件吗？"
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
          style="text-align: right;"
          ref="pagination"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        />
      </div>
    </div>
    <CourseEventDialog
      :showCourseEventStatus="showCourseEventStatus"
      :type="actionType"
      :courseEventObj="courseEventObj"
      @updateCourseEvent="updateCourseEvent"
      @update:showCourseEventStatus="showCourseEventStatus = false"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import Pagination from "@/components/Pagination";
import developmentCourse from "@/api/official/developmentCourse";
import CourseEventDialog from "./components/CourseEventDialog.vue";

export default {
  components: {
    pageHeader,
    Pagination,
    CourseEventDialog
  },
  name: "developmentCourse",
  computed: {
    ...mapGetters(["name", "roles"])
  },
  mounted() {
    // this.init();
    // let that = this;
    // setTimeout(() => {
    //   that.tableData = [
    //     {
    //       id: 1,
    //       historyDate: "2024-10-21",
    //       content: "你猜猜我喜不喜欢你呢，猜对有奖哦",
    //       gmtModified: "2024-10-21",
    //       editor: "小王"
    //     }
    //   ];
    // }, 300);
  },
  data() {
    return {
      tableData: [],
      loading: false,
      showCourseEventStatus: false,
      actionType: "",
      courseEventObj: {
        historyDate: "",
        content: ""
      },
      courseId: ""
    };
  },
  methods: {
    init() {
      // 获取历程列表
      this.getCourseList();
    },
    async getCourseList() {
      let params = {
        pageIndex: this.$refs.pagination.pageParam.pageIndex,
        pageSize: this.$refs.pagination.pageParam.pageSize
      };
      const res = await developmentCourse.getHistoryLineList(params);
      if (res.code == 200) {
        this.tableData = res.data.list;
        // 赋值对应页码等数据
        this.$refs.pagination.pageParam.totalCount = res.data.total;
      }
    },
    showCourseEventDialog() {
      this.actionType = "add";
      this.showCourseEventStatus = true;
    },
    // 新增轮播图
    async updateCourseEvent(courseObj) {
      try {
        this.loading = true;
        let res = null;
        if (this.actionType == "add") {
          const params = {
            content: courseObj.content.trim(),
            historyDate: courseObj.dateVal
          };
          res = await developmentCourse.addHistoryLine(params);
        } else {
          const params = {
            id: this.courseId,
            content: courseObj.content.trim()
          };
          res = await developmentCourse.editHistoryLineList(params);
        }
        if (res.code == 200) {
          this.$message.success(
            `${this.actionType == "add" ? "新增" : "编辑"}历程成功`
          );
          // 重新刷新列表
          this.modifyPage(1);
          this.getCourseList();
        }
      } catch (_) {
        this.$message.error("历程事件更新失败，请重试");
      } finally {
        this.loading = false;
      }
    },
    modifyPage(index) {
      this.$refs.pagination.pageParam.pageIndex = index;
    },
    handleEdit(row) {
      this.courseEventObj = {
        historyDate: row.historyDate,
        content: row.content
      };
      this.courseId = row.id;
      this.actionType = "edit";
      this.showCourseEventStatus = true;
    },
    async handleDelCourse(row) {
      try {
        this.loading = true;
        const params = {
          id: row.id
        };
        const res = await developmentCourse.delHistoryLine(params);
        if (res.code == 200) {
          this.$message.success("删除成功！");
          this.getCourseList();
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
      this.getCourseList();
    },
    handleCurrentChange() {
      this.getCourseList();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.development-course-container {
  flex: 1;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 16px;
  .course-btn-box {
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
        .edit-action {
          color: #2080f0;
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
