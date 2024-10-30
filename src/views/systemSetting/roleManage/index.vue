<template>
  <div class="honor-qualification-container">
    <pageHeader title="角色管理" />
    <div class="form-box">
      <el-input
        v-model="roleName"
        style="width: 200px"
        size="small"
        suffix-icon="el-icon-search"
        placeholder="输入角色名称查找"
        clearable
        @change="handleSearch"
      ></el-input>
      <div class="common-btn-box">
        <div class="common-btn add-btn" @click="showCustomerDialog">
          新建角色
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
          <el-table-column type="index" label="序号" width="80px">
          </el-table-column>
          <el-table-column prop="roleName" width="313px" label="角色名称">
          </el-table-column>
          <el-table-column prop="roleId" label="角色编号" width="313px">
          </el-table-column>
          <el-table-column prop="status" label="角色状态" width="313px">
          </el-table-column>
          <el-table-column prop="gmtCreate" label="创建时间" width="313px">
          </el-table-column>
          <el-table-column
            prop="action"
            label="操作"
            width="313px"
            fixed="right"
          >
            <template slot-scope="scope">
              <div class="action-box">
                <el-button type="text">编辑</el-button>
                <el-button type="text">授权</el-button>
                <el-button
                  type="text"
                  style="color: #FCB040;"
                  @click="showActionComponent('unPublish')"
                  >停用</el-button
                >
                <el-button
                  type="text"
                  style="color: #18A058;"
                  @click="showActionComponent('publish')"
                  >启用</el-button
                >
                <el-button
                  type="text"
                  style="color: #D03050;"
                  @click="showActionComponent('delete')"
                  >删除</el-button
                >
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
    <ActionComponent
      v-model="showPublishStatus"
      :type="actionType"
      @updateRoleAction="updateRoleAction"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import Pagination from "@/components/Pagination";
import roleManage from "@/api/systemSetting/roleManage";
import ActionComponent from "./components/ActionComponent.vue";

export default {
  components: {
    pageHeader,
    Pagination,
    ActionComponent
  },
  name: "roleManage",
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
      roleName: "",
      actionType: "",
      showUpdateRoleStatus: false,
      showPublishStatus: false,
      roleId: "",
      selectedName: ""
    };
  },
  methods: {
    init() {
      this.getRoleList();
    },
    async getRoleList() {
      const params = {
        pageIndex: this.$refs.pagination.pageParam.pageIndex,
        pageSize: this.$refs.pagination.pageParam.pageSize,
        roleName: this.roleName || ""
      };
      const res = await roleManage.getRoleList(params);
      if (res.code == 200) {
        this.tableData = res.data.list;
        // 赋值对应页码等数据
        this.$refs.pagination.pageParam.totalCount = res.data.total;
      }
    },
    handleSearch() {
      this.modifyPage(1);
      this.getRoleList();
    },
    modifyPage(index) {
      this.$refs.pagination.pageParam.pageIndex = index;
    },
    showCustomerDialog() {
      this.actionType = "add";
      this.showUpdateRoleStatus = true;
    },
    handleGoEdit(row) {
      this.actionType = "edit";
      this.roleId = row.id;
      this.selectedName = row.roleName;
      this.showUpdateRoleStatus = true;
    },
    async updateCustomerEvaluate(obj) {
      const params = { ...obj };
      let res = null;
      if (this.actionType == "edit") {
        params["id"] = this.roleId;
        res = await customerEvaluate.updateCustomerEvaluate(params);
      } else {
        res = await customerEvaluate.addCustomerEvaluate(params);
      }
      if (res.code == 200) {
        this.$message.success(
          `${this.actionType == "add" ? "新增" : "编辑"}评价成功`
        );
        this.getRoleList();
      } else {
        this.$message.error(
          `${this.actionType == "add" ? "新增" : "编辑"}评价失败`
        );
      }
    },
    showActionComponent(key) {
      this.actionType = key;
      this.showPublishStatus = true;
    },
    async updateRoleAction() {},
    handleSizeChange() {
      this.getRoleList();
    },
    handleCurrentChange() {
      this.getRoleList();
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
