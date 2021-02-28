import axios from "axios";
import BASE_URL, { URLS } from "./URLS";

const appkey = "anonym_1608299893038";

const instance = axios.create({
    baseURL: BASE_URL,
    params: {
        appkey,
    },
});

instance.interceptors.response.use(value => value.data);

const getSideList = type => {
    return instance.get(URLS.getSide, {
        params: {
            type,
        },
    });
};

const getGoodsList = (type, page = 1, size = 7, sort) => {
    return instance.get(URLS.getGoodsList, {
        params: {
            type,
            page,
            size,
            sort,
        },
    });
};

const likeSearch = likeValue => {
    return instance.get(URLS.likeSearch, {
        params: {
            likeValue,
        },
    });
};

const search = (type, page, size) => {
    return instance.get(URLS.search, {
        params: {
            type,
            page,
            size,
        },
    });
};

const getGoodsByIds = ids => {
    return instance.get(URLS.getGoodsByIds, {
        params: {
            value: ids,
        },
    });
};

export default { getSideList, getGoodsList, likeSearch, search, getGoodsByIds };
