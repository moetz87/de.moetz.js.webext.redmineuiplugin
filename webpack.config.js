var config = {
    context: __dirname,
    target: 'web'
};

var settingsConfig = Object.assign({}, config, {
    entry: "./settings/main.ts",
    output: {
        path: __dirname + "/settings/",
        filename: "index.js"
    },
});

var uiModifierConfig = Object.assign({}, config,{
    entry: "./ui-modifier/main.ts",
    output: {
        path: __dirname + "/ui-modifier/",
        filename: "index.js"
    },
});

module.exports = [
    settingsConfig, uiModifierConfig
];