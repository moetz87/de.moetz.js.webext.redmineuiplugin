var settings = [
    { src: 'settings/main.ts', dst: 'settings/index.js', target: 'web' },
    { src: 'ui-modifier/main.ts', dst: 'ui-modifier/main.js', target: 'web' }
];



/*******************************
 * PREPARE CONFIG
 *******************************/
var config = {
    context: __dirname,
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        __dirname: true,
        __filename: true
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules', `${__dirname}/shared`]
    }
};

/*******************************
 * CREATE CONFIG
 *******************************/
var webpack = require('webpack');
var path = require('path');

function mapToConfigObject(setting) {
    var object = {
        entry: `${__dirname}/${setting.src}`,
        output: {
            path: `${__dirname}/${path.dirname(setting.dst)}`,
            filename: path.basename(setting.dst)
        },
        target: setting.target,
        watchOptions: {
            poll: true
        }
    };
    return Object.assign({}, config, object);
}

module.exports = settings.map(c => mapToConfigObject(c));