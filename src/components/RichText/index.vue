<template>
  <div class="rich-text-container" :style="{ width: width + 'px' }">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 100%; overflow-y: hidden"
      v-model="contentHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import upload from "@/api/upload.js";
export default {
  components: {
    Editor,
    Toolbar
  },
  props: {
    width: {
      type: String,
      default: "800"
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    let that = this;
    return {
      contentHtml: "",
      mode: "default",
      editor: null,
      toolbarConfig: {
        insertKeys: {
          index: 1,
          keys: []
        },
        excludeKeys: [
          "fullScreen",
          "codeBlock",
          "code",
          "todo",
          "emotion",
          "insertImage",
          "insertVideo",
          "uploadVideo",
          "sub",
          "sup",
          "insertTable"
        ]
      },
      editorConfig: {
        placeholder: "请输入内容...",
        MENU_CONF: {
          uploadImage: {
            // 自定义上传
            async customUpload(file, insertFn) {
              console.log("file", file);
              const flag = that.beforeImgUpload(file);
              if (flag) {
                try {
                  let formData = new FormData();
                  formData.append("image", file);
                  const res = await upload.uploadImg(formData);
                  if (res.code == 200) {
                    that.$message.success("上传图片成功");
                    insertFn(res.data.fileName, "", "");
                  } else {
                    that.$message.error("上传图片失败");
                  }
                } catch (_) {
                  that.$message.error("上传图片失败");
                }
              }
            }
          }
        }
      }
    };
  },
  watch: {
    value: {
      handler(val) {
        this.contentHtml = val;
      }
    }
  },
  methods: {
    handleCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    handleChange(editor) {
      const html = editor.getHtml();
      this.$emit("input", html);
    },
    beforeImgUpload(file) {
      const fileType = ["image/jpg", "image/png", "image/jpeg"];
      const isJpgOrPng = fileType.includes(file.type);
      if (!isJpgOrPng) {
        message.error("只能上传jpeg、png、jpg、gif格式的图片!");
      }
      const isLt5M = file.size / 1024 / 1024 < 3;
      if (!isLt5M) {
        message.error("上传照片大小最大为3M!");
      }
      return isJpgOrPng && isLt5M;
    }
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.rich-text-container {
  height: 100%;
  overflow: hidden;
  // display: flex;
  // box-sizing: border-box;
  // padding: 12px;
  // border-radius: 4px;
  // background: #f0f2f5;
}
</style>
