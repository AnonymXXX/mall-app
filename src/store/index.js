import Vue from "vue";
import Vuex from "vuex";
import service from "../services/index";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        sideList: [],
        showContent: true,
        goodsList: [],
        size: 5,
        type: null,
        addedProdItem: {},
        isSearch: false,
        searchList: [],
        prodId: null,
    },
    mutations: {
        setIsSearch(state, val) {
            state.isSearch = val;
        },
        setSideList(state, list) {
            state.sideList = list;
        },
        setShowContent(state, value) {
            state.showContent = value;
        },
        setGoodsList(state, list) {
            state.goodsList = [...state.goodsList, ...list];
        },
        setGoodsType(state, type) {
            state.type = type;
        },
        resetGoodsList(state) {
            state.goodsList = [];
        },
        setCounterMap(state, item) {
            state.addedProdItem = item;
        },
        setSearchList(state, item) {
            state.searchList = [item, ...state.searchList];
        },
    },
    actions: {
        async getSideList({ commit }, type) {
            commit("setShowContent", false);
            const data = await service.getSideList(type);
            commit("setSideList", data);
            commit("setShowContent", true);
        },
        async getGoodsList({ commit, state }, options) {
            const { page, sort } = options;
            const type = options.type || state.type;
            commit("setGoodsType", type);
            const { list, total } = await service.getGoodsList(type, page, state.size, sort);
            commit("setGoodsList", list);
            if (total > state.goodsList.length) {
                return true;
            }
            return false;
        },
        setAddedProdItem({ state }, { id, value }) {
            if (state.addedProdItem[id]) {
                if (value === -1 && state.addedProdItem[id] === 1) {
                    Vue.delete(state.addedProdItem, id);
                } else {
                    Vue.set(state.addedProdItem, id, state.addedProdItem[id] + value);
                }
            } else {
                Vue.set(state.addedProdItem, id, 1);
            }
            localStorage.setItem("addedItems", JSON.stringify(state.addedProdItem));
        },
        saveSearchHistory({ commit, state }, { time, value }) {
            state.searchList.filter((item, i) => {
                if (item.value === value) {
                    state.searchList.splice(i, 1);
                }
            });
            commit("setSearchList", { time, value });
            localStorage.setItem("search-list", JSON.stringify(state.searchList));
        },
        removeAddedProdItem({ state }) {
            state.addedProdItem = {};
            localStorage.removeItem("addedItems");
        },
    },
    modules: {},
});
