<template>
  <div class="honor-qualification-container">
    <div class="page-header">
      <pageHeader title="编辑岗位" />
      <div class="line"></div>
    </div>
    <div class="form-box">
      <div class="form-container">
        <el-form
          :model="jobObj"
          :rules="rules"
          label-width="240px"
          ref="formRef"
        >
          <el-form-item label="岗位名称:" prop="title">
            <el-input
              style="width: 360px;border-radius: 3px;"
              v-model="jobObj.title"
              size="medium"
              placeholder="请输入岗位名称"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="所属部门:">
            <el-input
              style="width: 360px;border-radius: 3px;"
              v-model="jobObj.department"
              size="medium"
              placeholder="请输入岗位所在部门"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="工作地点:">
            <el-input
              style="width: 360px;border-radius: 3px;"
              v-model="jobObj.city"
              size="medium"
              placeholder="请输入岗位所在工作城市"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="招聘人数:" prop="quantity">
            <el-input
              style="width: 200px;border-radius: 3px;"
              v-model="jobObj.quantity"
              size="medium"
              placeholder="请输入招聘人数"
            >
              <span slot="suffix" style="color: #333;margin-right: 8px;"
                >人</span
              >
            </el-input>
          </el-form-item>
          <el-form-item label="学历要求:">
            <el-select
              size="medium"
              v-model="jobObj.education"
              placeholder="请选择学历要求"
            >
              <el-option
                v-for="item of educationList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="经验要求:">
            <el-select
              size="medium"
              v-model="jobObj.experience"
              placeholder="请选择经验要求"
            >
              <el-option
                v-for="item of experienceList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业要求:">
            <el-input
              style="width: 360px;border-radius: 3px;"
              v-model="jobObj.ability"
              size="medium"
              placeholder="请输入专业要求，若无要求可不填"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="投递邮箱:" prop="delivery">
            <el-input
              style="width: 360px;border-radius: 3px;"
              v-model="jobObj.delivery"
              size="medium"
              placeholder="请输入投递邮箱账号"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="职位描述:" prop="description">
            <el-input
              style="width: 800px;border-radius: 3px;"
              v-model="jobObj.description"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 7 }"
              placeholder="请输入您的职位描述，多项条例请注意换行"
              @change="editDescriptionText"
            ></el-input>
          </el-form-item>
          <el-form-item label="职位要求:" prop="requirement">
            <el-input
              style="width: 800px;border-radius: 3px;"
              v-model="jobObj.requirement"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 7 }"
              placeholder="请输入您的职位要求，多项条例请注意换行"
              @change="editRequirementText"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bottom-btn-box">
      <el-button size="small" style="width: 120px;" @click="$router.go(-1)"
        >取消</el-button
      >
      <el-button
        size="small"
        style="width: 120px;"
        type="primary"
        @click="saveJob"
        >保存并发布</el-button
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
  name: "editRecruitJob",
  computed: {
    ...mapGetters(["name", "roles"])
  },
  created() {
    this.recruitId = this.$route.params.id || "";
  },
  mounted() {
    this.init();
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
      rules: {
        title: [
          { required: true, message: "请输入岗位名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        quantity: [
          { required: true, message: "请输入招聘人数", trigger: "blur" }
        ],
        delivery: [
          { required: true, message: "请输入投递邮箱账号", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ],
        description: [
          {
            required: true,
            message: "请输入您的职位描述，多项条例请注意换行",
            trigger: "blur"
          }
        ],
        requirement: [
          {
            required: true,
            message: "请输入您的职位要求，多项条例请注意换行",
            trigger: "blur"
          }
        ]
      },
      educationList: [
        {
          value: "无要求",
          label: "无要求"
        },
        {
          value: "高中",
          label: "高中"
        },
        {
          value: "中专",
          label: "中专"
        },
        {
          value: "大专",
          label: "大专"
        },
        {
          value: "本科",
          label: "本科"
        },
        {
          value: "研究生",
          label: "研究生"
        },
        {
          value: "博士",
          label: "博士"
        }
      ],
      experienceList: [
        {
          value: "无要求",
          label: "无要求"
        },
        {
          value: "1~3年",
          label: "1-3年"
        },
        {
          value: "3年以上",
          label: "3年以上"
        },
        {
          value: "5年以上",
          label: "5年以上"
        },
        {
          value: "7年以上",
          label: "7年以上"
        },
        {
          value: "10年以上",
          label: "10年以上"
        }
      ],
      descriptionStr: "",
      requirementStr: "",
      submitStatus: false,
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
    saveJob() {
      if (this.submitStatus) {
        this.message.warning("请勿频繁操作");
        return;
      }
      this.submitStatus = true;
      try {
        this.$refs.formRef.validate(async valid => {
          if (valid) {
            const params = {
              ...this.jobObj,
              description: this.descriptionStr,
              requirement: this.requirementStr
            };
            const res = await recruitManage.addRecruit(params);
            if (res.code == 200) {
              this.$message.success("新增职位成功");
              this.$router.go(-1);
            } else {
              this.$message.error("新增职位失败");
            }
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.submitStatus = false;
      }
    },
    editDescriptionText() {
      if (this.jobObj.description === "") return;
      const text = this.jobObj.description
        .replace(/\n|\r\n/g, "<br>")
        .replace(/ /g, " ");
      this.descriptionStr = text;
    },
    editRequirementText() {
      if (this.jobObj.requirement === "") return;
      const text = this.jobObj.requirement
        .replace(/\n|\r\n/g, "<br>")
        .replace(/ /g, " ");
      this.requirementStr = text;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.honor-qualification-container {
  flex: 1;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px 20px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 16px;
  position: relative;
  .page-header {
    .line {
      margin-top: 8px;
      max-width: 1200px;
      height: 1px;
      background-color: #e0e0e0;
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
      /deep/ .el-textarea__inner {
        white-space: pre-wrap;
        resize: none;
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
