<template>
    <div class="home-carousel-container">
        <pageHeader title="首页轮播图" tips="轮播图最多支持添加十张"/>
        <div class="carousel-tips-container">
            <div class="carousel-tips-content">轮播图说明</div>
            <div class="carousel-tips">最多可添加10张轮播图，最大支持同时开启5张轮播图显示；</div>
        </div>
        <div class="carousel-btn-box">
             <div class="common-btn add-btn">新增轮播图</div>
             <div class="common-btn edit-btn">播放设置</div>
        </div>
        <div class="table-container">
            <el-table :data="tableData"
                style="width: 100%;position:absolute;table-layout: auto;" 
                :border="false"
                :header-cell-style="{backgroundColor: '#F2F3F5'}">
                <el-table-column
                    prop="index"
                    label="序号"
                    width="56px">
                </el-table-column>
                <el-table-column
                    prop="carousel"
                    label="轮播图"
                    min-width="176px"
                    >
                </el-table-column>
                <el-table-column
                    prop="link"
                    label="跳转链接"
                    min-width="344px">
                </el-table-column>
                <el-table-column
                    prop="gmtCreate"
                    label="上传时间"
                     min-width="176px"
                    >
                </el-table-column>
                <el-table-column
                    prop="creator"
                    label="操作人"
                    min-width="136px">
                </el-table-column>
                <el-table-column
                    prop="gmtModified"
                    label="最后编辑时间"
                     min-width="176px"
                    >
                </el-table-column>
                <el-table-column
                    prop="editor"
                    label="最后编辑人"
                    min-width="136px">
                </el-table-column>
                <el-table-column
                    prop="isShow"
                    label="是否显示"
                    min-width="96px">
                </el-table-column>
                <el-table-column
                    prop="action"
                    label="操作"
                    min-width="136px"
                    fixed="right">
                </el-table-column>
            </el-table>
        </div>
        
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import pageHeader from '@/components/pageHeader/pageHeader.vue';
  
  export default {
    components: {
        pageHeader
    },
    name: 'homeCarousel',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
    data() {
        return {
            tableData: []
        }
    }
  }
  </script>
  
  <style rel="stylesheet/scss" lang="scss" scoped>
  .home-carousel-container {
    // width: 100%;
    // height: 100%;
    flex: 1;
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 16px;
    .carousel-tips-container {
        width: 100%;
        box-sizing: border-box;
        padding: 12px;
        border-radius: 4px;
        border: 1px solid #C7DFFB;
        background: #EDF5FE;
        .carousel-tips-content {
            font-size: 16px;
            color: #333;
            font-weight: bold;
            margin-bottom: 4px;
        }
        .carousel-tips {
            font-size: 14px;
            color: #666;
        }
    }
    .carousel-btn-box {
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
            background-color: #2080F0;

            color: #fff;
        }
        .edit-btn {
            border: 1px solid #2080F0;
            color: #2080F0;
        }
    }
    .table-container {
        flex: 1;
        display: flex;
        position: relative;
        overflow: hidden;
    }
  }
  </style>
  