const fs = require("fs");
const path = require("path");
const s3 = require("s3-node");
const ProgressBar = require("progress");
const crypto = require("crypto");

const defaultConfig = {
    uploadEnabled: true,
    exclude: '',
    include: '',
    basePath: '',
    hasher: (buildDir) => crypto.createHash('md5').update(fs.readFileSync(`${buildDir}/manifest.json`)).digest("hex"),
    onFinished: (config) => {}, 
};

function getFilesForUpload(dirPath, include, exclude) {
    getFiles(dirPath);
    
    return getFiles(dirPath).filter(file => filterFile(file, include, exclude));
}

function verifyConfig(config) {
    if (!config.s3Options.accessKeyId || !config.s3Options.secretAccessKey || !config.s3Options.region) {
        throw new Error('Missing parameters in s3 options');
    }

    if (!config.s3UploadOptions.Bucket) {
        throw new Error('Missing bucket name');
    }
}

function uploadFiles(files, config) {
    console.log("\n");

    let promises = [];
    let client = s3.createClient(config.s3Options);
    let bar = new ProgressBar('\x1b[32mUploading Assets to S3 \x1b[0m\x1b[33m[:bar] :current/:total\x1b[0m', { total: files.length, width: 100, });
    let manifestHash = config.hasher(config.buildDir);
    
    files.forEach((file) => {
        promises.push(new Promise((resolve, reject) => {
            let fileName = `${config.basePath}${file.replace(config.rootDir, '')}`;

            let params = {
                localFile: file,
                s3Params: {
                    ...config.s3UploadOptions,
                    ...{Key: fileName.replace(/^\/|\/$/g, '')},
                },
            };

            let uploader = client.uploadFile(params);

            uploader.on('error', (e) => {
                console.error(e.stack);
                reject();
            });

            uploader.on('end', function() {
                bar.tick();
                resolve();
            });
        }));
    });

    return Promise.all(promises).then(() => {
        config.onFinished(client, config, manifestHash);
        
        console.log("\n");
    });
}

function getFiles(dirPath, arrayOfFiles) {
    let files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    })

    return arrayOfFiles;
}

function filterFile(file, include, exclude) {
    let result = true;
    
    if (include) {
        result = new RegExp(include).test(file);
    }

    if (exclude && result) {
        result = !(new RegExp(exclude)).test(file);
    }
    
    return result;
}



module.exports = {
    defaultConfig,
    getFilesForUpload,
    verifyConfig,
    uploadFiles,
}