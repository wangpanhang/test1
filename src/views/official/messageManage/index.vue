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
          style="width: 160px"
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
        style="width: 200px"
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
          <el-table-column prop="messageTime" label="留言时间" width="180px">
          </el-table-column>
          <el-table-column prop="authorName" label="联系人" width="160px">
          </el-table-column>
          <el-table-column prop="telephone" label="联系电话" width="160px">
          </el-table-column>
          <el-table-column
            prop="content"
            :show-overflow-tooltip="true"
            label="留言预览"
          >
          </el-table-column>
          <el-table-column prop="status" label="留言状态" width="120px">
            <template slot-scope="scope">
              <div class="processed" v-if="scope.row.status == 1">已处理</div>
              <div class="undisposed" v-else>待处理</div>
            </template>
          </el-table-column>
          <el-table-column prop="handleUser" label="处理人" width="120px">
            <template slot-scope="scope">
              {{ scope.row.handleUser || "--" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="action"
            label="操作"
            width="160px"
            fixed="right"
          >
            <template slot-scope="scope">
              <div class="action-box">
                <el-button type="text" @click="handleDetail(scope.row)"
                  >详情</el-button
                >
                <el-button
                  type="text"
                  style="margin-right: 12px"
                  :disabled="scope.row.status == 1"
                  @click="showProcessDialog(scope.row)"
                  >处理</el-button
                >
                <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  cancel-button-type="none"
                  confirm-button-type="danger"
                  icon="el-icon-info"
                  icon-color="red"
                  title="删除后不可恢复，确定删除该留言吗？"
                  @confirm="handleDelCourse(scope.row)"
                >
                  <el-button type="text" style="color: #d03050" slot="reference"
                    >删除</el-button
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
    <ProcessDialog
      :showProcessStatus="showProcessStatus"
      @update:showProcessStatus="showProcessStatus = false"
      @updateProcess="updateProcess"
    />
    <DetailDialog
      :showDetailStatus="showDetailStatus"
      :messageId="messageId"
      :status="messageStatus"
      @update:showDetailStatus="showDetailStatus = false"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import Pagination from "@/components/Pagination";
import messageManage from "@/api/official/messageManage";
import ProcessDialog from "./components/ProcessDialog.vue";
import DetailDialog from "./components/DetailDialog.vue";
import moment from "moment";

export default {
  components: {
    pageHeader,
    Pagination,
    ProcessDialog,
    DetailDialog,
  },
  name: "messageManage",
  computed: {
    ...mapGetters(["name", "roles"]),
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      tableData: [],
      loading: false,
      dateRange: [
        moment().subtract(90, "day").format("YYYY-MM-DD") + " 00:00:00",
        moment().format("YYYY-MM-DD") + " 23:59:59",
      ],
      filterObj: {
        startTime: "",
        endTime: "",
        status: "",
        telephone: "",
      },
      statusOptions: [
        {
          value: "",
          label: "全部状态",
        },
        {
          value: "0",
          label: "待处理",
        },
        {
          value: "1",
          label: "已处理",
        },
      ],
      showProcessStatus: false,
      showDetailStatus: false,
      messageId: "",
      messageStatus: "",
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
        pageSize: this.$refs.pagination.pageParam.pageSize,
      };
      const res = await messageManage.messageList(params);
      if (res.code == 200) {
        this.tableData = res.data.list;
        // 赋值对应页码等数据
        this.$refs.pagination.pageParam.totalCount = res.data.total;
      }
    },
    modifyPage(index) {
      this.$refs.pagination.pageParam.pageIndex = index;
    },
    showProcessDialog(row) {
      this.messageId = row.id;
      this.showProcessStatus = true;
    },
    async updateProcess(data) {
      const params = {
        id: this.messageId,
        type: data.type,
        content: data.content ? data.content.trim() : "",
      };
      const res = await messageManage.handleMessage(params);
      if (res.code == 200) {
        this.$message.success("处理成功");
        this.getMessageList();
      } else {
        this.$message.error("处理失败");
      }
    },
    handleDetail(row) {
      this.messageId = row.id;
      this.messageStatus = row.status || 0;
      this.showDetailStatus = true;
    },
    async handleDelMessage(row) {
      try {
        this.loading = true;
        const params = {
          id: row.id,
        };
        const res = await messageManage.delMessage(params);
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
    },
  },
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
      .processed {
        width: max-content;
        height: 28px;
        line-height: 28px;
        box-sizing: border-box;
        padding: 0 8px;
        border-radius: 2px;
        border: 1px solid rgba(24, 160, 88, 0.3);
        background: #eaf5ef;
        text-align: center;
        color: #18a058;
        font-size: 14px;
      }
      .undisposed {
        width: max-content;
        height: 28px;
        line-height: 28px;
        box-sizing: border-box;
        padding: 0 8px;
        border-radius: 2px;
        border: 1px solid rgba(252, 176, 64, 0.3);
        background: #fdf4e7;
        text-align: center;
        color: #fcb040;
        font-size: 14px;
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
