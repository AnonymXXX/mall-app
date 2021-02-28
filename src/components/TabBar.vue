<template>
    <div class="tab-bar-wrapper">
        <van-tabbar route fixed>
            <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
            <van-tabbar-item icon="apps-o" to="/home/classify">分类</van-tabbar-item>
            <van-tabbar-item :badge="carNum ? carNum : 0" icon="cart-o" to="/home/shopping"
                >购物车</van-tabbar-item
            >
            <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
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
};
</script>
