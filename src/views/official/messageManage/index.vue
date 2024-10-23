<template>
  <div class="common-container">
    <pageHeader title="留言管理" />
    <div class="filter-box">
      <div class="filter-item">
        <div class="label">留言日期：</div>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          @change="handleSearch"
        >
        </el-date-picker>
      </div>
      <div class="filter-item">
        <div class="label">留言状态：</div>
        <el-select
          v-model="filterObj.status"
          placeholder="请选择留言状态"
          style="width: 160px;"
          size="small"
          @change="handleSearch"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-input
        v-model="filterObj.telephone"
        style="width: 200px;"
        size="small"
        suffix-icon="el-icon-search"
        placeholder="请输入联系电话"
        clearable
        @change="handleSearch"
      ></el-input>
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
          <el-table-column
            prop="historyDate"
            label="历程发生日期"
            width="176px"
          >
          </el-table-column>
          <el-table-column prop="content" label="事件描述"> </el-table-column>
          <el-table-column
            prop="gmtModified"
            label="最后编辑时间"
            width="176px"
          >
          </el-table-column>
          <el-table-column prop="editor" label="最后编辑人" width="136px">
          </el-table-column>
          <el-table-column
            prop="action"
            label="操作"
            width="136px"
            fixed="right"
          >
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import Pagination from "@/components/Pagination";
import messageManage from "@/api/official/messageManage";
import moment from "moment";

export default {
  components: {
    pageHeader,
    Pagination
  },
  name: "messageManage",
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
      dateRange: [
        moment()
          .subtract(90, "day")
          .format("YYYY-MM-DD") + " 00:00:00",
        moment().format("YYYY-MM-DD") + " 23:59:59"
      ],
      filterObj: {
        startTime: "",
        endTime: "",
        status: "",
        telephone: ""
      },
      statusOptions: [
        {
          value: "",
          label: "全部状态"
        }
      ],
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
      this.getMessageList();
    },
    handleSearch() {
      this.$refs.pagination.pageParam.pageIndex = 1;
      this.getMessageList();
    },
    async getMessageList() {
      let params = {
        startTime: this.dateRange[0] ? this.dateRange[0] : "",
        endTime: this.dateRange[1] ? this.dateRange[1] : "",
        telephone: this.filterObj.telephone || "",
        status: this.filterObj.status,
        pageIndex: this.$refs.pagination.pageParam.pageIndex,
        pageSize: this.$refs.pagination.pageParam.pageSize
      };
      const res = await messageManage.messageList(params);
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
          this.getMessageList();
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
          this.getMessageList();
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
      this.getMessageList();
    },
    handleCurrentChange() {
      this.getMessageList();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.common-container {
  flex: 1;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 16px;
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
