const {getFilesForUpload, verifyConfig, uploadFiles, defaultConfig} = require('./helpers');

module.exports = function viteS3(config) {
    config = {...defaultConfig, ...config};

    return {
        name: 'viteS3',
        enforce: 'post',
        apply(c, { command }) {
            return command === 'build' && config.uploadEnabled;
        },
        configResolved: (c) => {
            config.rootDir = c.root;
            config.buildDir = `${c.root}/${c.build.outDir}`;
        },
        closeBundle: () => {
            verifyConfig(config);
            
            return uploadFiles(getFilesForUpload(config.buildDir, config.include, config.exclude), config);
        }
    }
}
