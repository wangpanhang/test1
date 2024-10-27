<template>
  <div class="honor-qualification-container">
    <pageHeader title="操作日志" />
    <div class="form-box">
      <el-input
        v-model="nickName"
        style="width: 200px"
        size="small"
        suffix-icon="el-icon-search"
        placeholder="输入操作人名称查找"
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
          <el-table-column prop="gmtCreate" label="操作时间" width="200px">
          </el-table-column>
          <el-table-column prop="nickName" width="160px" label="操作账号">
          </el-table-column>
          <el-table-column prop="company" label="操作类型" width="240px">
          </el-table-column>
          <el-table-column
            prop="describe"
            label="操作内容"
            :show-overflow-tooltip="true"
            width="970px"
          ></el-table-column>
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
import operationLog from "@/api/systemSetting/operationLog";
import moment from "moment";

export default {
  components: {
    pageHeader,
    Pagination
  },
  name: "operationLog",
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
      nickName: "",
      type: ""
    };
  },
  methods: {
    init() {
      this.getOperationLogList();
    },
    async getOperationLogList() {
      const params = {
        pageIndex: this.$refs.pagination.pageParam.pageIndex,
        pageSize: this.$refs.pagination.pageParam.pageSize,
        nickName: this.nickName || "",
        type: this.type
      };
      const res = await operationLog.getOperationLogList(params);
      if (res.code == 200) {
        this.tableData = res.data.list;
        // 赋值对应页码等数据
        this.$refs.pagination.pageParam.totalCount = res.data.total;
      }
    },
    handleSearch() {
      this.$refs.pagination.pageParam.pageIndex = 1;
      this.getOperationLogList();
    },
    handleSizeChange() {
      this.getOperationLogList();
    },
    handleCurrentChange() {
      this.getOperationLogList();
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
    }
  }
}
</style>
