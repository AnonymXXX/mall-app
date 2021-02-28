<template>
    <div class="side-tab-wrapper" ref="sideBar">
        <div
            v-for="(item, i) in sideList"
            :key="item"
            :class="{ active: i === index }"
            @touchend="scrollTo(i, $event)"
            @touchstart="move = false"
            @touchmove="move = true"
        >
            {{ i === 0 ? "全部" : item }}
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { moveTo } from "../util/index";
export default {
    data() {
        return {
            move: false,
            index: 0,
        };
    },
    computed: {
        ...mapState(["sideList"]),
    },
    methods: {
        ...mapMutations(["resetGoodsList"]),
        ...mapActions(["getGoodsList"]),
        scrollTo(i, e) {
            if (this.move) {
                return;
            }
            this.index = i;
            const { sideBar } = this.$refs;
            const wrapHeight = sideBar.offsetHeight;
            const wrapTop = sideBar.getBoundingClientRect().top;
            const targetHeight = e.currentTarget.offsetHeight;
            const targetTop = e.currentTarget.getBoundingClientRect().top;
            moveTo(
                sideBar.scrollTop,
                targetHeight / 2 + targetTop - wrapHeight / 2 - wrapTop,
                sideBar,
                "scrollTop"
            );
            this.resetGoodsList();
            this.getGoodsList({ type: this.sideList[i], page: 1, size: 5, sort: "all" });
        },
    },
    mounted() {
        this.resetGoodsList();
        this.getGoodsList({ type: this.sideList[0], page: 1, size: 5, sort: "all" });
    },
};
</script>

<style lang="less" scoped>
.side-tab-wrapper {
    position: fixed;
    left: 0px;
    top: 125px;
    bottom: 50px;
    width: 80px;
    background: #f8f8f8;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0px;
        background: none;
    }
    div {
        position: relative;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #333;
        &.active {
            font-weight: bold;
            color: #ee5d23;
            &::before {
                content: "";
                position: absolute;
                left: 0px;
                top: 50%;
                transform: translateY(-55%);
                width: 6px;
                height: 16px;
                background: #ee5d23;
            }
        }
    }
}
</style>
