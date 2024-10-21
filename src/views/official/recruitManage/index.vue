<template>
    <div class="honor-qualification-container">
      <pageHeader title="招聘管理" />
      <div class="form-box">
        <div class="certificate-select">
          <div class="label">岗位状态:</div>
          <el-select
            v-model="certificateVal"
            placeholder="请选择岗位状态"
            style="width: 160px"
            size="small"
            @change="handleChange"
          > 
            <el-option
              v-for="item in certificateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="common-btn add-btn" @click="showUploadCertificateDialog">
          发布岗位
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
          <el-table-column type="index" label="序号" min-width="56px">
          </el-table-column>
          <el-table-column prop="jobTitle" label="岗位名称" min-width="136px">
          </el-table-column>
          <el-table-column prop="recruitSection" label="招聘部门" min-width="96px">
          </el-table-column>
          <el-table-column prop="workPlace" label="工作地点" min-width="96px"> </el-table-column>
          <el-table-column prop="degree" label="学历要求" min-width="96px">
          </el-table-column>
          <el-table-column prop="recruitNumber" label="招聘人数" min-width="96px">
          </el-table-column>
          <el-table-column prop="email" label="投递邮箱" min-width="308px">
          </el-table-column>
          <el-table-column prop="jobStatus" label="岗位状态" min-width="96px">
            <template slot-scope="scope">
              <div v-if="scope.row.jobStatus == 1" class="published">已发布</div>
              <div v-if="scope.row.jobStatus == 2" class="unpublished">未发布</div>
            </template>
          </el-table-column>
          <el-table-column prop="gmtCreate" label="创建时间" min-width="156px">
          </el-table-column>
          <el-table-column prop="userName" label="发布人" min-width="96px">
          </el-table-column>
          <el-table-column prop="action" label="操作" min-width="216px" fixed="right">
            <template slot-scope="scope">
              <div class="action-box">
                <span
                  class="common-action edit-action"
                  @click="handleGoEdit(scope.row)"
                  >编辑</span
                >
                <span
                  class="common-action edit-action"
                  @click="handleGoDetail(scope.row)"
                  >详情</span
                >
                <span
                  class="common-action removed-action"
                  v-if="scope.row.jobStatus == 1"
                  @click="handleUnPublish(scope.row)"
                  >下架</span
                >
                <span
                  class="common-action publish-action"
                  v-if="scope.row.jobStatus == 2"
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
                  title="删除后不可恢复，确定删除该岗位吗？"
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
      <PublishDialog
        :showPublishStatus="showPublishStatus"
        :type="actionType"
        @update:showPublishStatus="showPublishStatus = false"
        @handlePublishJob="handlePublishJob"
      />
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  import pageHeader from "@/components/pageHeader/pageHeader.vue";
  import Pagination from "@/components/Pagination";
  import recruitManage from "@/api/official/recruitManage";
  import PublishDialog from "./components/PublishDialog.vue";
  
  export default {
    components: {
      pageHeader,
      Pagination,
      PublishDialog
    },
    name: "recruitlManage",
    computed: {
      ...mapGetters(["name", "roles"])
    },
    mounted() {
      // this.init();
      let that = this;
      setTimeout(() => {
        that.tableData = [
          {
            id: 1,
            jobTitle: '前端工程师',
            recruitSection: '技术部',
            workPlace: "东莞市",
            degree: "本科",
            recruitNumber: 1,
            email: '18142879080@163.com',
            jobStatus: '1',
            gmtCreate: "2024-10-21 20:52:45",
            userName: "小王"
          },
          
        ];
      }, 300);
    },
    data() {
      return {
        tableData: [],
        loading: false,
        certificateVal: "",
        certificateList: [
          {
            value: "",
            label: "全部类型"
          },
          {
            value: "1",
            label: "资质认证"
          },
          {
            value: "2",
            label: "专利认证"
          },
          {
            value: "3",
            label: "软著证书"
          }
        ],
        showPublishStatus: false,
        actionType: "",
      };
    },
    methods: {
      init() {
        // 获取职位列表
        this.getRecruitList();
      },
      async getRecruitList() {
        let params = {
          pageIndex: this.$refs.pagination.pageParam.pageIndex,
          pageSize: this.$refs.pagination.pageParam.pageSize
        };
        const res = await recruitManage.getRecruitList(params);
        if (res.code == 200) {
          this.tableData = res.data.list;
          // 赋值对应页码等数据
          this.$refs.pagination.pageParam.totalCount = res.data.total;
        }
      },
      handleChange() {
        this.modifyPage(1);
        this.getRecruitList();
      },
      showUploadCertificateDialog() {
        this.actionType = "add";
        this.showUploadCertificateStatus = true;
      },
      modifyPage(index) {
        this.$refs.pagination.pageParam.pageIndex = index;
      },
      handleGoEdit(row) {
        console.log('row', row)
      },
      handleGoDetail(row) {
        console.log('row', row)
      },
      handleUnPublish(row) {
        this.actionType = "unPublish"
        this.jobId = row.id
        this.showPublishStatus = true
      },
      handlePublish(row) {
        this.actionType = "publish"
        this.jobId = row.id
        this.showPublishStatus = true
      },
      async handleDelCourse(row) {
        try {
          this.loading = true;
          const params = {
            id: row.id
          };
          const res = await recruitManage.delRecruit(params);
          if (res.code == 200) {
            this.$message.success("删除成功！");
            this.getRecruitList();
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
        this.getRecruitList();
      },
      handleCurrentChange() {
        this.getRecruitList();
      },
      async handlePublishJob() {
        try {
          this.loading = true;
          const params = {
            id: this.jobId,
            state: this.actionType == "publish" ? 1 : 0
          };
          const res = await recruitManage.delRecruit(params);
          if (res.code == 200) {
            this.$message.success(`${this.actionType == 'publish' ? '发布' : '下架'}职位成功！`);
            this.getRecruitList();
          } else {
            this.$message.error(`${this.actionType == 'publish' ? '发布' : '下架'}职位失败！`);
          }
        } catch (_) {
          this.$message.error(`${this.actionType == 'publish' ? '发布' : '下架'}职位失败！`);
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
      .certificate-select {
        display: flex;
        align-items: center;
        .label {
          color: #333;
          font-size: 14px;
          font-weight: bold;
          margin-right: 8px;
        }
      }
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
        .published {
          display: flex;
          width: max-content;
          height: 28px;
          padding: 0px 8px;
          align-items: center;
          border-radius: 2px;
          border: 1px solid rgba(24, 160, 88, 0.30);
          background: #EAF5EF;
          color: #18A058;
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
          border: 1px solid rgba(252, 176, 64, 0.30);
          background: #FDF4E7;
          color: #FCB040;
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
            color: #FCB040;
          }
          .publish-action {
            color: #18A058;
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
  