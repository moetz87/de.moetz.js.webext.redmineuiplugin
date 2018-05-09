/*******************************
 * PREPARE CONFIG
 *******************************/

var config = {
    context: __dirname,
    target: 'web',
    node: {
        fs: 'empty'
    },
    module: {
        rules: [{
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules', `${__dirname}/shared`]
    }
};

class Setting {
    constructor(entry, output_path, output_name) {
        this.entry = entry;
        this.output_path = output_path;
        this.output_name = output_name;
    };
}

var settings = [
    new Setting('settings/main.ts', 'settings', 'index.js'),
    new Setting('ui-modifier/main.ts', 'ui-modifier', 'main.js')
];





/*******************************
 * CREATE CONFIG
 *******************************/

function mapToConfigObject(setting) {
    var object = {
        entry: `${__dirname}/${setting.entry}`,
        output: {
            path: `${__dirname}/${setting.output_path}`,
            filename: setting.output_name
        }
    };
    return Object.assign({}, config, object);
}

module.exports = settings.map(c => mapToConfigObject(c));