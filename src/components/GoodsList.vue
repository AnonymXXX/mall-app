<template>
    <div class="goods-wrapper">
        <div class="goods-header">
            <ul class="filter-nav">
                <li :class="{ active: type === 'all' }" @touchend="changeType('all')">综合</li>
                <li :class="{ active: type === 'sale' }" @touchend="changeType('sale')">
                    销量
                </li>
                <li
                    :class="{
                        'price-up': type === 'price-up',
                        'price-down': type === 'price-down',
                    }"
                    @touchend="changeType('price')"
                    class="price"
                >
                    价格
                </li>
            </ul>
        </div>
        <div class="goods-content">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                    class="goods-list-item"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :immediate-check="false"
                >
                    <GoodsCard v-for="(item, i) in goodsList" v-bind="item" :key="id + i" />
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
import GoodsCard from "./GoodsCard";
import { mapActions, mapMutations, mapState } from "vuex";
import { generateId } from "../util";
export default {
    created() {
        const addItems = JSON.parse(localStorage.getItem("addedItems")) || {};
        this.$store.commit("setCounterMap", addItems);
    },
    components: {
        GoodsCard,
    },
    computed: {
        ...mapState(["goodsList"]),
    },
    data() {
        return {
            type: "all",
            loading: false,
            finished: false,
            isLoading: false,
            page: 1,
            id: generateId(),
        };
    },
    methods: {
        ...mapMutations(["resetGoodsList"]),
        ...mapActions(["getGoodsList"]),
        onRefresh() {
            this.loading = false;
            this.finished = false;
            this.isLoading = true;
            this.page = 1;
            this.resetGoodsList();
            this.getGoodsList({ page: 1, sort: this.type });
            this.isLoading = false;
        },
        async onLoad() {
            this.page += 1;
            this.loading = true;
            const result = await this.getGoodsList({ page: this.page, sort: this.type });
            if (result) {
                this.loading = false;
            } else {
                this.finished = true;
            }
        },
        changeType(type) {
            if (type === "all") {
                this.type = type;
            } else if (type === "sale") {
                this.type = type;
            } else if (this.type === "price-up") {
                this.type = "price-down";
            } else {
                this.type = "price-up";
            }
            this.onRefresh();
        },
    },
};
</script>

<style lang="less" scoped>
.goods-wrapper {
    position: fixed;
    right: 0px;
    width: 78%;
    .goods-content {
        position: fixed;
        width: 300px;
        top: 150px;
        bottom: 50px;
        overflow: auto;
        .goods-list-item {
            width: 300px;
        }
    }
    .filter-nav {
        display: flex;
        justify-content: flex-end;
        position: relative;
        color: #000;
        li {
            width: 50px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            padding-right: 5px;
        }
        .active,
        .price-up,
        .price-down {
            color: #ee5d23;
            font-weight: bold;
        }

        .price::after {
            position: absolute;
            top: 10px;
            right: 5px;
            content: "";
            border: 4px solid transparent;
            border-top-color: #a09c9c;
        }

        .price::before {
            position: absolute;
            top: 1px;
            right: 5px;
            content: "";
            border: 4px solid transparent;
            border-bottom-color: #a09c9c;
        }

        .price-down::after {
            border-top-color: #ee5d23;
        }

        .price-up::before {
            border-bottom-color: #ee5d23;
        }
    }
}
.van-pull-refresh {
    overflow: unset !important;
}
</style>
