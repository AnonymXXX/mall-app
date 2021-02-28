<template>
    <div class="search-wrapper">
        <div class="search-history" v-if="isSearch !== true">
            <dl class="clear-fix">
                <dt>历史记录</dt>
                <dd v-for="item in searchList" :key="item.time" @touchend="delay(item.value, 'searchType')">
                    {{ item.value }}
                </dd>
            </dl>
            <span
                class="tip-history"
                v-if="searchList.length === undefined || searchList.length <= 0"
                >还没有历史记录，快去搜索吧</span
            >
            <span class="clear-search-history" @touchend="clearHistory" v-if="searchList.length > 0"
                >清除历史记录</span
            >
        </div>
        <ul v-else-if="showList !== true && isLoading === false">
            <li
                class="van-hairline--bottom"
                v-for="item in likeList"
                :key="item"
                @touchend="delay(item, 'searchType')"
            >
                <span
                    v-for="it in item"
                    :key="it"
                    :class="{ 'target-color': value.includes(it) }"
                    >{{ it }}</span
                >
            </li>
        </ul>
        <div class="search-list" v-else>
            <template v-if="isHasSearchResult === true && isLoading === false">
                <GoodsCard v-for="item in goodsList" v-bind="item" :key="item.id + id" />
            </template>
            <span v-else-if="isHasSearchResult === false && isLoading !== true">没有了</span>
        </div>
        <van-loading color="#1989fa" size="1rem" vertical v-if="isLoading" />
    </div>
</template>

<script>
import GoodsCard from "./GoodsCard";
import service from "../services/index";
import { generateId } from "../util";

export default {
    data() {
        return {
            page: 1,
            size: 5,
            id: generateId(),
        };
    },
    props: [
        "showList",
        "isSearch",
        "goodsList",
        "isHasSearchResult",
        "value",
        "searchList",
        "likeList",
        "isLoading",
    ],
    methods: {
        delay(type, func) {
            console.log(type);
            this.$emit("changeProps", { isLoading: true });
            setTimeout(() => {
                this[func](type);
                this.$emit("changeProps", { isLoading: false });
            }, 300);
        },
        async searchType(type) {
            this.$emit("changeProps", { showList: true, isSearch: true });
            this.$emit("changeProps", { value: type });
            const { list } = await service.search(type, this.page, this.size);
            this.$emit("changeProps", { goodsList: list });
            if (list.length !== 0) {
                this.$emit("changeProps", { isHasSearchResult: true });
            }
            this.$emit("saveSearchList", type);
        },

        clearHistory() {
            this.$emit("changeProps", { searchList: [] });
            localStorage.removeItem("search-list");
        },
    },
    components: {
        GoodsCard,
    },
};
</script>

<style lang="less" scoped>
.search-wrapper {
    .search-history {
        margin: 30px 30px 0;
        position: relative;
        dl {
            dt {
                font-size: 14px;
                font-weight: bold;
            }
            dd {
                float: left;
                background: #eee;
                padding: 15px;
                border-radius: 10px;
                margin: 15px 8px 0;
            }
        }

        .tip-history {
            display: block;
            margin-top: 20px;
            margin-left: 10px;
            color: #666;
        }

        .clear-search-history {
            position: absolute;
            right: 0px;
            top: 0px;
            color: #6495ed;
        }
    }
    ul {
        margin-left: 50px;
        li {
            width: 86%;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            .target-color {
                color: #ee5d23;
            }
        }
    }
    .search-list {
        margin: 0px 40px;
        span {
            display: block;
            width: 100%;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #999;
            text-align: center;
        }
    }
}

.clear-fix::after {
    content: "";
    clear: both;
    display: block;
}
</style>
