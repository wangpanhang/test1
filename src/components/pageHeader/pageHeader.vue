<template>
    <div class="page-header">
        <div class="page-header-title">{{title}}</div>
        <div class="page-header-tips" v-if="tips">{{tips}}</div>
    </div>
</template>
<script>
export default {
    name: 'pageHeader',
    props: {
        title: {
            type: String,
            default: ''
        },
        tips: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.page-header {
    // height: 80px;
    background-color: #fff;
    display: flex;
    align-items: center;
    &-title {
        font-size: 18px;
        color: #333;
        font-weight: bold;
    }
    &-tips {
        margin-left: 16px;
        color: #9EA4AA;
        font-size: 14px;
    }
}
</style>