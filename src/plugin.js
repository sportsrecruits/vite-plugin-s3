const {getFilesForUpload, verifyConfig, uploadFiles, defaultConfig} = require('./helpers');

module.exports = {
    viteS3: function(config) {
        config = { ...defaultConfig, ...config };

        return {
            name: 'viteS3',
            enforce: config.enforce ? config.enforce : 'post',
            apply(c, { command }) {
                return command === 'build' && config.uploadEnabled;
            },
            configResolved: (c) => {
                config.rootDir = c.root;
                config.buildDir = config.uploadDir ? config.uploadDir : `${c.root}/${c.build.outDir}`;
            },
            closeBundle: () => {
                verifyConfig(config);

                return uploadFiles(getFilesForUpload(config.buildDir, config.include, config.exclude), config);
            }
        }
    },
    getFilesForUpload: getFilesForUpload,
}

