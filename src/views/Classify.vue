<template>
    <div class="classify-wrapper">
        <router-link class="search-box" tag="div" to="/search">
            <van-icon name="search" />
            <span class="search-title">桔子特价20元一斤</span>
        </router-link>
        <OneTab />
        <template v-if="showContent">
            <SideTab />
            <GoodsList />
        </template>
        <van-loading v-else color="#1989fa" size="1rem" vertical />
    </div>
</template>

<script>
import OneTab from "../components/OneTab";
import SideTab from "../components/SideTab";
import GoodsList from "../components/GoodsList";
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["showContent"]),
    },
    components: {
        OneTab,
        SideTab,
        GoodsList,
    },
};
</script>

<style lang="less" scoped>
.classify-wrapper {
    width: 100%;
    .search-box {
        width: 96%;
        height: 33px;
        background: #eee;
        margin: 10px auto 0;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    > * {
        vertical-align: middle;
        color: rgb(160, 156, 156);
        font-size: 14px;
    }
    .search-title {
        margin-left: 2px;
    }
}
</style>
