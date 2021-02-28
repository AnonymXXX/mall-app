<template>
    <div class="shopping-wrapper">
        <div class="shopping-header van-hairline--bottom">
            <h3>购物车</h3>
            <span @touchend.prevent="clearCar">删除</span>
        </div>
        <div class="shopping-content">
            <div class="shopping-prod" v-for="item in goodsList" :key="item._id">
                <van-checkbox-group
                    v-model="selectedItems"
                    class="item van-hairline--bottom"
                    v-if="item.id in addedProdItem"
                >
                    <van-checkbox :name="item.id" class="checkbox-item"></van-checkbox>
                    <GoodsCard
                        v-bind="item"
                        class="goods-card"
                        :typePage="'shopping'"
                        @isRemove="removeProd"
                    />
                </van-checkbox-group>
            </div>
            <div class="card-none" v-if="Object.keys(addedProdItem).length <= 0">
                <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg" />
            </div>
        </div>

        <div class="shopping-bar van-hairline--surround">
            <van-checkbox v-model="selectAll" class="select-all">
                全选
            </van-checkbox>
            <div class="total-price">
                合计：<span>￥</span><span class="num">{{ Math.floor(totalPrice) }}.</span
                ><span>{{ totalPrice.toFixed(2).substr(-2) }}</span>
            </div>
            <van-button type="primary" class="buy">去结算({{ carNum ? carNum : 0 }})</van-button>
        </div>
        <van-popup
            v-model="isShowModel"
            closeable
            position="center"
            :style="{ height: '20%', width: '80%' }"
            class="pop-wrapper"
            close-icon="close"
            @click-close-icon="cancel"
            @click-overlay="cancel"
            :round="true"
            duration="0.2"
        >
            <span class="tip-info">{{ tipInfo }}</span>
            <div class="pop-model">
                <van-button type="default" @click="cancel">取消</van-button>
                <van-button type="info" @click="confirm">确认</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { mapState } from "vuex";
import GoodsCard from "../components/GoodsCard";
import service from "../services/index";

export default {
    data() {
        return {
            goodsList: [],
            selectedItems: [],
            isShowModel: false,
            isRemove: false,
            removeProdId: null,
            isClearCar: false,
            tipInfo: "是否删除此商品",
        };
    },
    methods: {
        cancel() {
            this.isShowModel = false;
            this.isRemove = false;
            if (this.isClearCar) {
                setTimeout(() => {
                    this.tipInfo = "是否删除此商品";
                }, 300);
            }
        },
        clearCar() {
            this.isShowModel = true;
            this.tipInfo = "是否清空购物车";
            this.isClearCar = true;
        },
        confirm() {
            if (this.isClearCar) {
                this.goodsList = [];
                this.selectedItems = [];
                this.$store.dispatch("removeAddedProdItem");
                this.isClearCar = false;
            } else {
                this.isRemove = true;
            }
            this.isShowModel = false;
        },
        removeProd(id) {
            this.isShowModel = true;
            this.removeProdId = id;
        },
    },
    watch: {
        isRemove() {
            if (this.isRemove && this.removeProdId) {
                this.$store.dispatch("setAddedProdItem", { id: this.removeProdId, value: -1 });
                this.selectedItems.forEach((id, i) => {
                    if (id === this.removeProdId) {
                        this.selectedItems.splice(i, 1);
                    }
                });
                this.goodsList = this.goodsList.filter(item => item.id !== this.removeProdId);
                this.isRemove = false;
            }
        },
    },
    computed: {
        ...mapState(["addedProdItem"]),
        carNum() {
            let num = 0;
            if (Object.values(this.addedProdItem).length > 0) {
                this.selectedItems.forEach(id => {
                    if (this.addedProdItem[id]) {
                        num += this.addedProdItem[id];
                    }
                });
            }
            return num;
        },
        totalPrice() {
            let totalPrice = 0;
            this.selectedItems.forEach(id => {
                this.goodsList.forEach(prod => {
                    if (+prod.id === id && this.addedProdItem[id]) {
                        totalPrice +=
                            this.addedProdItem[id] *
                            this.goodsList.filter(prod => +prod.id === id)[0].price;
                    }
                });
            });
            return totalPrice;
        },
        selectAll: {
            get() {
                return Object.keys(this.addedProdItem).length === this.selectedItems.length;
            },
            set(val) {
                if (val) {
                    for (const key in this.addedProdItem) {
                        if (!this.selectedItems.includes(+key)) {
                            this.selectedItems.push(+key);
                        }
                    }
                    return true;
                } else {
                    this.selectedItems = [];
                    return false;
                }
            },
        },
    },
    components: {
        GoodsCard,
    },
    created() {
        let result = [];
        const ids = Object.keys(this.addedProdItem);
        if (ids.length > 0) {
            ids.forEach(async id => {
                const { list } = await service.getGoodsByIds(id);
                result.push(...list);
                this.selectedItems.push(+id);
            });
            this.goodsList = result;
        }
    },
};
</script>

<style lang="less" scoped>
.shopping-wrapper {
    width: 100%;
    .shopping-header {
        position: relative;
        height: 45px;
        line-height: 45px;
        margin-bottom: 15px;
        text-align: center;
        h3 {
            display: inline;
            font-size: 16px;
        }
        span {
            position: absolute;
            right: 15px;
            color: #6495ed;
            font-size: 14px;
        }
    }
    .shopping-content {
        width: 100%;
        position: fixed;
        top: 55px;
        bottom: 110px;
        overflow: auto;
        .card-none {
            width: 100%;
            img {
                width: 100%;
            }
        }
    }
    .shopping-prod {
        width: 100%;
        .item {
            width: 94%;
            margin: 10px auto;
            display: flex;
            .goods-card {
                margin-left: 25px;
            }
            .checkbox-item {
                padding: 3px;
            }
        }
    }

    .shopping-bar {
        box-sizing: border-box;
        width: 100%;
        padding: 0px 15px;
        position: fixed;
        display: flex;
        bottom: 50px;
        height: 60px;
        line-height: 60px;
        align-items: center;
        justify-content: space-between;
        .select-all {
            font-size: 14px;
        }
        .total-price {
            font-size: 14px;
            span {
                color: #ee0a24;
                font-size: 12px;
            }
            .num {
                font-size: 18px;
            }
        }
        .buy {
            background: #e63146;
            border: none;
            height: 40px;
            line-height: 40px;
            width: 100px;
        }
    }
    .pop-wrapper {
        display: flex;
        justify-content: center;
        .tip-info {
            margin-top: 40px;
            font-size: 16px;
        }
        .pop-model {
            position: absolute;
            bottom: 0px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            > * {
                flex: 1 1 auto;
            }
        }
    }
}
</style>
