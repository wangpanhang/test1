<template>
  <div class="common-container">
    <div class="title-box">
      <div class="title">岗位详情</div>
    </div>
    <div class="form-box">
      <div class="form-container">
        <div class="common-info-grid">
          <div class="common-info">
            <div class="label">岗位名称:</div>
            <div class="content">前端开发工程师</div>
          </div>
          <div class="common-info">
            <div class="label">所属部门:</div>
            <div class="content">前端开发工程师</div>
          </div>
          <div class="common-info">
            <div class="label">工作地点:</div>
            <div class="content">前端开发工程师</div>
          </div>
          <div class="common-info">
            <div class="label">招聘人数:</div>
            <div class="content">前端开发工程师</div>
          </div>
          <div class="common-info">
            <div class="label">学历要求:</div>
            <div class="content">前端开发工程师</div>
          </div>
          <div class="common-info">
            <div class="label">经验要求:</div>
            <div class="content">前端开发工程师</div>
          </div>
          <div class="common-info">
            <div class="label">专业要求:</div>
            <div class="content">前端开发工程师</div>
          </div>
          <div class="common-info">
            <div class="label">投递邮箱:</div>
            <div class="content">前端开发工程师</div>
          </div>
          <div class="common-info">
            <div class="label">创建时间:</div>
            <div class="content">前端开发工程师</div>
          </div>
        </div>
        <div class="common-info-flex">
          <div class="common-info">
            <div class="label">职位描述:</div>
            <div class="info"></div>
          </div>
        </div>
        <div class="common-info-flex">
          <div class="common-info">
            <div class="label">职位要求:</div>
            <div class="info"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-btn-box">
      <el-button size="small" style="width: 120px;" @click="$router.go(-1)"
        >返回</el-button
      >
      <el-button
        size="small"
        style="width: 120px;"
        type="primary"
        @click="toEdit"
        >编辑</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageHeader from "@/components/pageHeader/pageHeader.vue";
import recruitManage from "@/api/official/recruitManage";

export default {
  components: {
    pageHeader
  },
  name: "recruitJobDetail",
  computed: {
    ...mapGetters(["name", "roles"])
  },
  created() {
    this.recruitId = this.$route.params.id || "";
  },
  mounted() {
    // this.init()
  },
  data() {
    return {
      jobObj: {
        title: "",
        department: "",
        city: "",
        quantity: 1,
        education: "",
        experience: "",
        ability: "",
        delivery: "",
        description: "",
        requirement: ""
      },
      recruitId: ""
    };
  },
  methods: {
    async init() {
      const res = await recruitManage.getRecruitInfo({ id: this.recruitId });
      if (res.code == 200) {
        this.jobObj = {
          ...res.data
        };
      }
    },
    toEdit() {
      this.$router.push({
        name: "editRecruitJob",
        params: {
          id: this.recruitId
        }
      });
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
  position: relative;
  .title-box {
    width: 100%;
    height: 32px;
    box-sizing: border-box;
    padding: 4px 0;
    border-bottom: 1px solid #e0e0e6;
    .title {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 24px;
      border-bottom: 1px solid #e0e0e6;
      color: #333;
      font-size: 16px;
    }
  }
  .form-box {
    flex: 1;
    height: 100%;
    overflow: hidden;
    display: flex;
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: #f5f5f5;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
      // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #fff;
    }

    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #b4b4b4;
    }
    .form-container {
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      .common-info-grid {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        .common-info {
          display: flex;
          align-items: flex-start;
          .label {
            min-width: 120px;
            width: 120px;
            text-align: right;
            color: #666;
            font-size: 14px;
            margin-right: 8px;
          }
          .content {
            flex: 1;
            color: #333;
            font-size: 14px;
          }
        }
      }
      .common-info-flex {
        width: 100%;
        display: flex;
        align-items: flex-start;
        .common-info {
          display: flex;
          align-items: flex-start;
          .label {
            min-width: 120px;
            width: 120px;
            text-align: right;
            color: #666;
            font-size: 14px;
            margin-right: 8px;
          }
          .info {
            width: 800px;
            min-height: 170px;
            padding: 12px;
            border-radius: 3px;
            background: #f2f3f5;
          }
        }
      }
    }
  }
  .bottom-btn-box {
    width: 100%;
    height: 56px;
    border-top: 1px solid var(--border-, #e4e7ed);
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
}
</style>
