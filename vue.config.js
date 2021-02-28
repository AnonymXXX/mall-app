const px2rem = require("postcss-px2rem");

module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    px2rem({
                        remUnit: 37.5,
                    }),
                ],
            },
        },
    },
    configureWebpack: {
        devtool: "source-map",
    },
    // 用于GitHub上托管页面（GitHub上的仓库名为mall-app）
    assetsDir: "mall-app/",
};
