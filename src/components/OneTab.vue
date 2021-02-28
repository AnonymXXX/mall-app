<template>
    <div class="one-tab-wrapper" ref="oneTab">
        <div
            class="item"
            :class="{ active: i === index }"
            v-for="(item, i) in menuList"
            :key="item.title"
            @touchend="scrollTo(i, $event)"
            @touchstart="move = false"
            @touchmove="move = true"
        >
            <div class="img-box ">
                <img :src="item.imgURL" />
            </div>
            <span class="title">{{ item.title }}</span>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { moveTo } from "../util/index";
export default {
    data() {
        return {
            move: false,
            index: 0,
            menuList: [
                {
                    title: "时令水果",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg",
                },
                {
                    title: "酒水冲调",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg",
                },
                {
                    title: "安心乳品",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg",
                },
                {
                    title: "休闲零食",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg",
                },
                {
                    title: "肉蛋食材",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg",
                },
                {
                    title: "新鲜蔬菜",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg",
                },
                {
                    title: "熟食餐饮",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg",
                },
                {
                    title: "海鲜水产",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg",
                },
                {
                    title: "粮油调味",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg",
                },
                {
                    title: "某手美食",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg",
                },
                {
                    title: "纸杯清洁",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg",
                },
                {
                    title: "个人护理",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg",
                },
                {
                    title: "美妆护肤",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg",
                },
                {
                    title: "家居收纳",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg",
                },
                {
                    title: "家用电器",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg",
                },
                {
                    title: "3C数码",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg",
                },
                {
                    title: "母婴用品",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg",
                },
                {
                    title: "鲜花绿植",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg",
                },
                {
                    title: "宠物用品",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg",
                },
                {
                    title: "图书玩具",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg",
                },
                {
                    title: "手表配饰",
                    imgURL: "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg",
                },
            ],
        };
    },
    methods: {
        ...mapActions(["getSideList"]),
        scrollTo(i, e) {
            if (this.move) {
                return;
            }
            this.index = i;
            const { oneTab } = this.$refs;
            const wrapperWidth = oneTab.offsetWidth;
            const itemOffsetLeft = e.currentTarget.getBoundingClientRect().left;
            const itemWidth = e.currentTarget.offsetWidth;
            moveTo(
                oneTab.scrollLeft,
                itemWidth / 2 + itemOffsetLeft - wrapperWidth / 2,
                oneTab,
                "scrollLeft"
            );
            this.getSideList(this.menuList[i].title);
        },
    },
    mounted() {
        this.getSideList(this.menuList[0].title);
    },
};
</script>

<style lang="less" scoped>
.one-tab-wrapper {
    width: 100%;
    display: flex;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0px;
        background: none;
    }
    .item {
        box-sizing: border-box;
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 70px;
        margin: 8px 5px 0px 5px;
        border: 2px solid transparent;
        .img-box {
            width: 70px;
            height: 70px;
            text-align: center;
            overflow: hidden;
            box-sizing: border-box;
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin: 5px 0;
            }
        }

        .title {
            color: #333;
            padding: 2px;
        }
    }
    .active {
        box-sizing: border-box;
        border-color: #ee5d23;
        border-radius: 20px;
        .title {
            background: #ee5d23;
            border-radius: 10px;
            color: #fff;
            font-weight: bold;
        }
    }
}
</style>
