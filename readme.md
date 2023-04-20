### Upgrading to 1.0.0
There are breaking changes in the latest release of 1.0.0

You must use the named import now for the plugin instead of the default export.

```javascript
import { viteS3 } from 'vite-plugin-s3';
```

___
This plugin will upload all built assets to s3.

This package was heavily inspired by [webpack-s3-plugin](https://www.npmjs.com/package/webpack-s3-plugin)
and also [Laravel vapor's asset deployment](https://docs.vapor.build/1.0/projects/deployments.html#assets).

### Install Instructions

```bash
$ npm i vite-plugin-s3

$ yarn add vite-plugin-s3
```

##### Import `vite-plugin-s3` in your vite config file and add it as a vite plugin.

```javascript
import { viteS3 } from 'vite-plugin-s3';

export default defineConfig({
    plugins: [
        viteS3({
            s3Options: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: 'us-east-1'
            },
            s3UploadOptions: {
                Bucket: 'dist-cdn',
            },
        }),
    ]
});
```

##### Config Example

```javascript
viteS3({
    exclude: /.*\.img/,
    include: /.*\.js$/,
    uploadEnabled: !!process.env.UPLOAD_ENABLED,
    s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1'
    },
    s3UploadOptions: {
        Bucket: 'dist-cdn',
    },
    basePath: 'production',
})
```

### Options

| Option            | Type       | Default                           | Description                                                                                                                                                                                 | 
|-------------------|------------|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `uploadEnabled`   | `Boolean`  | `true`                            | This setting can be used to disable or enable the uploading of assets                                                                                                                       |
| `exclude`         | `String`   |                                   | A Regex Pattern to match for excluded content                                                                                                                                               |
| `include`         | `String`   |                                   | A Regex Pattern to match for `included` content. Behaves the same as `exclude`                                                                                                              |
| `s3Options`       | `Object`   |                                   | Upload options for [s3Config](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property)                                                                      |
| `s3UploadOptions` | `Object`   |                                   | Upload options for [putObject](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property)                                                                           |
| `basePath`        | `String`   |                                   | The root namespace of uploaded files on S3                                                                                                                                                  |
| `hasher`          | `Function` |                                   | Customize the behavior of how the manifest file gets hashed                                                                                                                                 |
| `onFinished`      | `Function` |                                   | This callback will be invoked after all operations are complete.  The parameters passed are the instance of the s3 client used for uploading, the plugin config, and the manifest file hash |
| `enforce`         | `String`   | `post`                            | Customize the `enforce` parameter of the vite plugin                                                                                                                                        |
| `uploadDir`       | `String`   | `config.root/config.build.outDir` | The folder containing the assets you want to upload                                                                                                                                         |


### Example Usage

```bash
$ UPLOAD_ENABLED=true AWS_ACCESS_KEY_ID=******* AWS_SECRET_ACCESS_KEY=******** yarn prod
```

![image](https://user-images.githubusercontent.com/16297677/182513452-7bb33844-db5b-463b-bc62-2f2bcf26ff69.png)

