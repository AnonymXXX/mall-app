<template>
    <div class="content-wrapper">
        <div class="item">
            <div class="img-box">
                <a href="#">
                    <img :src="images[0]" title="照片无法显示" style="color: #333;" />
                </a>
            </div>
            <div class="content">
                <span class="title overflow-hidden">{{ title }}</span>
                <span class="desc overflow-hidden">{{ desc }}</span>
                <div class="tags">
                    <span v-for="i in tags" :key="i">{{ i }}</span>
                </div>
                <div class="card-bottom">
                    <span class="price">￥{{ price }}</span>
                    <div class="counter">
                        <i
                            class="minus"
                            v-if="addedProdItem[id] > 0"
                            @touchend.prevent="changeNum(id, -1)"
                        ></i>
                        <span class="num" v-if="addedProdItem[id] > 0">{{
                            addedProdItem[id]
                        }}</span>
                        <i class="add" @touchend="changeNum(id, 1)"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["addedProdItem"]),
    },
    methods: {
        changeNum(id, num) {
            if (this.typePage === "shopping") {
                if (this.addedProdItem[id] === 1 && num === -1) {
                    this.$emit("isRemove", id);
                    return;
                }
                this.$store.dispatch("setAddedProdItem", { id, value: num });
            } else {
                this.$store.dispatch("setAddedProdItem", { id, value: num });
            }
        },
    },
    props: ["price", "images", "desc", "tags", "title", "id", "typePage"],
};
</script>

<style lang="less" scoped>
.content-wrapper {
    position: relative;
    width: 100%;
    .item {
        display: flex;
        margin-bottom: 10px;
        .img-box {
            flex: 0 0 auto;
            width: 100px;
            height: 100px;
            border: 1px solid #eee;
            line-height: 100px;
            img {
                width: 100%;
            }
        }
        .content {
            flex: 0 0 auto;
            margin: 0px 15px;
            position: relative;
            width: 170px;
            display: flex;
            flex-direction: column;
            .title {
                margin-top: 5px;
                color: #333;
                font-size: 14px;
            }
            > * {
                flex: 0 0 auto;
                margin-top: 10px;
            }
            .desc {
                color: #aaa;
                font-size: 12px;
            }
            .tags {
                display: flex;
                font-size: 12px;
                span {
                    padding: 2px;
                    margin-right: 5px;
                    border: 1px solid #aaa;
                    border-radius: 4px;
                }
            }

            .card-bottom {
                height: 20px;
                line-height: 20px;
                .price {
                    color: #f40;
                    font-weight: bold;
                }
                .counter {
                    position: relative;
                    float: right;
                    display: flex;
                    height: 20px;
                    line-height: 20px;
                    > * {
                        margin-right: 3px;
                    }
                    .add {
                        position: relative;
                        top: 2px;
                        right: -3px;
                        width: 16px;
                        height: 16px;
                        background: url(../assets/icon/add.png) no-repeat center center / 100% 100%;
                    }

                    .minus {
                        width: 19px;
                        height: 19px;
                        background: url(../assets/icon/minus.png) no-repeat left top / 100% 100%;
                    }
                    span {
                        color: #333;
                    }
                }
            }
        }
    }
}
.overflow-hidden {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
