<template>
  <div class="honor-qualification-container">
    <pageHeader title="客户评价" />
    <div class="form-box">
      <el-input
        v-model="customName"
        style="width: 200px"
        size="small"
        suffix-icon="el-icon-search"
        placeholder="输入名称名称查找"
        clearable
        @change="handleSearch"
      ></el-input>
      <div class="common-btn-box">
        <div class="common-btn add-btn" @click="showCustomerDialog">
          新增客户评价
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
          <el-table-column prop="avatar" label="客户头像" width="120px">
            <template slot-scope="scope">
              <div class="img">
                <img :src="scope.row.avatar" class="img" />
              </div>
              <!--  -->
            </template>
          </el-table-column>
          <el-table-column prop="name" width="160px" label="客户名称">
          </el-table-column>
          <el-table-column prop="company" label="公司与职位" width="240px">
          </el-table-column>
          <el-table-column
            prop="content"
            label="评价内容"
            :show-overflow-tooltip="true"
            width="700px"
          ></el-table-column>
          <el-table-column prop="gmtCreate" label="创建时间" width="180px">
          </el-table-column>
          <el-table-column
            prop="action"
            label="操作"
            width="160px"
            fixed="right"
          >
            <template slot-scope="scope">
              <div class="action-box">
                <span
                  class="common-action edit-action"
                  @click="handleGoEdit(scope.row)"
                  >编辑</span
                >
                <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  cancel-button-type="none"
                  confirm-button-type="danger"
                  icon="el-icon-info"
                  icon-color="red"
                  title="删除后不可恢复，确定删除该评价吗？"
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
    <CustomerEvaluateDialog
      v-model="showCustomerStatus"
      :type="actionType"
      :customerEvaluateObj="customerEvaluateObj"
      @updateCustomerEvaluate="updateCustomerEvaluate"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import Pagination from "@/components/Pagination";
import customerEvaluate from "@/api/official/customerEvaluate";
import CustomerEvaluateDialog from "./components/CustomerEvaluateDialog.vue";

export default {
  components: {
    pageHeader,
    Pagination,
    CustomerEvaluateDialog
  },
  name: "customerEvaluate",
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
      customName: "",
      actionType: "",
      showCustomerStatus: false,
      customerEvaluateId: "",
      customerEvaluateObj: {
        name: "",
        avatar: "",
        content: "",
        company: ""
      }
    };
  },
  methods: {
    init() {
      this.getCustomerEvaluateList();
    },
    async getCustomerEvaluateList() {
      const params = {
        pageIndex: this.$refs.pagination.pageParam.pageIndex,
        pageSize: this.$refs.pagination.pageParam.pageSize,
        name: this.customName || ""
      };
      const res = await customerEvaluate.getCustomerEvaluateList(params);
      if (res.code == 200) {
        this.tableData = res.data.list;
        // 赋值对应页码等数据
        this.$refs.pagination.pageParam.totalCount = res.data.total;
      }
    },
    handleSearch() {
      this.modifyPage(1);
      this.getCustomerEvaluateList();
    },
    modifyPage(index) {
      this.$refs.pagination.pageParam.pageIndex = index;
    },
    showCustomerDialog() {
      this.actionType = "add";
      this.customerEvaluateObj = {};
      this.showCustomerStatus = true;
    },
    handleGoEdit(row) {
      this.actionType = "edit";
      this.customerEvaluateId = row.id;
      this.customerEvaluateObj = {
        name: row.name || "",
        avatar: row.avatar || "",
        content: row.content || "",
        company: row.company || ""
      };
      this.showCustomerStatus = true;
    },
    async updateCustomerEvaluate(obj) {
      const params = { ...obj };
      let res = null;
      if (this.actionType == "edit") {
        params["id"] = this.customerEvaluateId;
        res = await customerEvaluate.updateCustomerEvaluate(params);
      } else {
        res = await customerEvaluate.addCustomerEvaluate(params);
      }
      if (res.code == 200) {
        this.$message.success(
          `${this.actionType == "add" ? "新增" : "编辑"}评价成功`
        );
        this.getCustomerEvaluateList();
      } else {
        this.$message.error(
          `${this.actionType == "add" ? "新增" : "编辑"}评价失败`
        );
      }
    },
    async handleDelCourse(row) {
      try {
        this.loading = true;
        const params = {
          id: row.id
        };
        const res = await customerEvaluate.delCustomerEvaluate(params);
        if (res.code == 200) {
          this.$message.success("删除成功！");
          this.getCustomerEvaluateList();
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
      this.getCustomerEvaluateList();
    },
    handleCurrentChange() {
      this.getCustomerEvaluateList();
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
        width: 42px;
        height: 42px;
        object-fit: cover;
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
