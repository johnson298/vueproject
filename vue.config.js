module.exports = {
  publicPath: "/",
  css: {
    sourceMap: process.env.NODE_ENV !== "production"
  }
  // chainWebpack: config => {
  //   config.plugin("optimize-css").tap(([options]) => {
  //     options.cssnanoOptions.preset[1].svgo = false;
  //     return [options];
  //   });
  // }
};
