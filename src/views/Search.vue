<template>
    <div class="search-wrapper">
        <div class="search-header">
            <van-icon
                name="arrow-left"
                @touchend.prevent="$router.push('/home/classify')"
                class="arrow-left"
            />
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                @input="onInput"
                @search="onSearch"
                @focus="onFocus"
            />
            <van-button
                plain
                v-if=" showList !== true"
                type="info"
                class="search-btn"
                @click="onSearch"
                >搜索</van-button
            >
            <van-icon
                v-else
                class="search-car"
                @click="$router.push('/home/shopping')"
                name="shopping-cart-o"
                :badge="carNum ? carNum : 0"
            />
        </div>

        <div class="search-content">
            <SearchHistory
                :showList="showList"
                :isSearch="isSearch"
                :goodsList="goodsList"
                :isHasSearchResult="isHasSearchResult"
                :value="value"
                :likeList="likeList"
                :searchList="searchList"
                :isLoading="isLoading"
                @changeProps="changeProps"
                @saveSearchList="saveSearchList"
            />
        </div>
    </div>
</template>

<script>
import service from "../services/index";
import SearchHistory from "../components/SearchHistory";
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["addedProdItem"]),
        carNum() {
            if (Object.values(this.addedProdItem).length > 0) {
                return Object.values(this.addedProdItem).reduce((a, b) =>
                    a + b > 99 ? "99+" : a + b
                );
            }
        },
    },
    components: {
        SearchHistory,
    },
    data() {
        return {
            timer: null,
            value: "",
            page: 1,
            size: 5,
            searchList: [],
            isSearch: false,
            showList: false,
            likeList: [],
            goodsList: [],
            isHasSearchResult: false,
            isLoading: false,
        };
    },
    methods: {
        changeProps(val) {
            const keys = Object.keys(val);
            keys.forEach(key => {
                this[key] = val[key];
            });
        },

        onSearch() {
            const val = this.value.trim();
            if (!val) {
                return;
            }
            this.isSearch = true;
            this.isLoading = true;
            setTimeout(async () => {
                this.showList = true;
                this.isLoading = true;
                this.goodsList = [];
                const { result } = await service.likeSearch(val);
                result.forEach(async prodName => {
                    const { list } = await service.search(prodName, this.page, this.size);
                    this.goodsList.push(...list);
                });
                if (result.length !== 0) {
                    this.isHasSearchResult = true;
                } else {
                    this.isHasSearchResult = false;
                }
                this.isLoading = false;
                this.saveSearchList(val);
            }, 310);
        },
        onInput() {
            if (!this.value.trim()) {
                this.isSearch = false;
            }

            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }

            this.timer = setTimeout(async () => {
                if (this.value.trim()) {
                    const { result } = await service.likeSearch(this.value);
                    if (result.length !== 0) {
                        this.isSearch = true;
                        this.showList = false;
                    }
                    this.likeList = result;
                    clearTimeout(this.timer);
                    this.timer = null;
                }
            }, 300);
        },
        onFocus() {
            this.searchList = JSON.parse(localStorage.getItem("search-list")) || {};
            this.isSearch = false;
            this.showList = false;
        },
        saveSearchList(value) {
            const time = Date.now();
            this.$store.dispatch("saveSearchHistory", { time, value });
        },
    },
    created() {
        this.searchList = JSON.parse(localStorage.getItem("search-list")) || {};
    },
};
</script>

<style lang="less" scoped>
.search-wrapper {
    width: 100%;
    .search-header {
        display: flex;
        align-items: center;
        .arrow-left {
            font-size: 22px;
            margin-left: 12px;
        }
        .van-search {
            width: 82%;
        }
        .search-btn {
            margin-right: 10px;
            width: 66px;
            height: 33px;
        }
        .search-car {
            font-size: 24px;
            margin: 0px 20px 0px 5px;
        }
    }

    .search-content {
        width: 100%;
    }
}
</style>
