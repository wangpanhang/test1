<template>
  <div class="honor-qualification-container">
    <pageHeader title="荣誉资质" />
    <div class="form-box">
      <div class="certificate-select">
        <div class="label">证书类型:</div>
        <el-select
          v-model="certificateVal"
          placeholder="请选择证书类型"
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
        上传荣誉资质
      </div>
    </div>
    <div class="el-table-container">
      <div class="el-table-box">
        <el-table
          :data="tableData"
          style="width: 100%;flex: 1 1 auto;"
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
          <el-table-column prop="certificateUrl" label="证书" width="176px">
            <template slot-scope="scope">
              <img :src="scope.row.certificateUrl" class="img" />
            </template>
          </el-table-column>
          <el-table-column prop="type" label="证书类型" width="136px">
          </el-table-column>
          <el-table-column prop="content" label="证书介绍"> </el-table-column>
          <el-table-column prop="uploadDate" label="上传时间" width="176px">
          </el-table-column>
          <el-table-column prop="userName" label="操作人" width="136px">
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
                  title="删除后不可恢复，确定删除该证书吗？"
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
    <UploadCertificationDialog
      :showUploadCertificateStatus="showUploadCertificateStatus"
      :type="actionType"
      :certificateObj="certificateObj"
      @updateCertificate="updateCertificate"
      @update:showUploadCertificateStatus="showUploadCertificateStatus = false"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import Pagination from "@/components/Pagination";
import honorQualification from "@/api/official/honorQualification";
import UploadCertificationDialog from "./components/UploadCertificationDialog.vue";

export default {
  components: {
    pageHeader,
    Pagination,
    UploadCertificationDialog
  },
  name: "honorQualification",
  computed: {
    ...mapGetters(["name", "roles"])
  },
  mounted() {
    this.init();
    // let that = this;
    // setTimeout(() => {
    //   that.tableData = [
    //     {
    //       id: 1,
    //       certificateUrl:
    //         "https://wallpaperm.cmcm.com/4700eaf249b71d56d95aff8ca94313fa.jpg",
    //       type: "资历证书",
    //       content: "你猜猜我喜不喜欢你呢，猜对有奖哦",
    //       uploadDate: "2024-10-21 20:52:45",
    //       userName: "小王"
    //     }
    //   ];
    // }, 300);
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
      showUploadCertificateStatus: false,
      actionType: "",
      certificateObj: {
        uploadUrl: "",
        content: "",
        type: "1"
      },
      certificateId: ""
    };
  },
  methods: {
    init() {
      // 获取证书列表
      this.getCertificateList();
    },
    async getCertificateList() {
      let params = {
        pageIndex: this.$refs.pagination.pageParam.pageIndex,
        pageSize: this.$refs.pagination.pageParam.pageSize
      };
      const res = await honorQualification.getHonorQualification(params);
      if (res.code == 200) {
        this.tableData = res.data.list;
        // 赋值对应页码等数据
        this.$refs.pagination.pageParam.totalCount = res.data.total;
      }
    },
    handleChange() {
      this.modifyPage(1);
      this.getCertificateList();
    },
    showUploadCertificateDialog() {
      this.actionType = "add";
      this.showUploadCertificateStatus = true;
    },
    // 新增轮播图
    async updateCertificate(courseObj) {
      try {
        this.loading = true;
        let res = null;
        if (this.actionType == "add") {
          const params = {
            content: courseObj.content.trim(),
            historyDate: courseObj.dateVal
          };
          res = await honorQualification.addHonorQualification(params);
        } else {
          const params = {
            id: this.courseId,
            content: courseObj.content.trim()
          };
          res = await honorQualification.editHonorQualification(params);
        }
        if (res.code == 200) {
          this.$message.success(
            `${this.actionType == "add" ? "新增" : "编辑"}历程成功`
          );
          // 重新刷新列表
          this.modifyPage(1);
          this.getCertificateList();
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
      this.certificateObj = {
        uploadUrl: row.certificateUrl,
        content: row.content,
        certificateId: row.type
      };
      this.certificateId = row.id;
      this.actionType = "edit";
      this.showUploadCertificateStatus = true;
    },
    async handleDelCourse(row) {
      try {
        this.loading = true;
        const params = {
          id: row.id
        };
        const res = await honorQualification.delHonorQualification(params);
        if (res.code == 200) {
          this.$message.success("删除成功！");
          this.getCertificateList();
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
      this.getCertificateList();
    },
    handleCurrentChange() {
      this.getCertificateList();
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
      .img {
        width: 109px;
        height: 40px;
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
