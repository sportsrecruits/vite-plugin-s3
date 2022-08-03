This plugin will upload all built assets to s3.

This package was heavily inspired by [this existing package](https://www.npmjs.com/package/webpack-s3-plugin)
and also [Laravel vapor's asset deployment](https://docs.vapor.build/1.0/projects/deployments.html#assets).

### Install Instructions

```bash
$ npm i vite-plugin-s3

$ yarn add vite-plugin-s3
```

##### Import `vite-plugin-s3` in your vite config file and add it as a vite plugin.

```javascript
import viteS3 from 'vite-plugin-s3';

export default defineConfig({
    plugins: [viteS3({
        s3Options: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'us-east-1'
        },
        s3UploadOptions: {
            Bucket: 'dist-cdn',
        },
    })]
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
    useHashAsRoot: true,
    hashFile: 's3-assets-manifest.json',
})
```

### Options

| Option            | Type       | Default                   | Description                                                                                                            | 
|-------------------|------------|---------------------------|------------------------------------------------------------------------------------------------------------------------|
| `uploadEnabled`   | `Boolean`  | `true`                    | This setting can be used to disable or enable the uploading of assets                                                  |
| `exclude`         | `String`   |                           | A Regex Pattern to match for excluded content                                                                          |
| `include`         | `String`   |                           | A Regex Pattern to match for `included` content. Behaves the same as `exclude`                                         |
| `s3Options`       | `Object`   |                           | Upload options for [s3Config](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property) |
| `s3UploadOptions` | `Object`   |                           | Upload options for [putObject](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property)      |
| `basePath`        | `String`   |                           | The root namespace of uploaded files on S3                                                                             |
| `useHashAsRoot`   | `Boolean`  | `true`                    | When enabled the uploaded assets will be located at s3://[basePath]/[output of hasher()]                               |
| `hashFile`        | `String`   | `s3-assets-manifest.json` | This json file will contain the calculated output of hasher()                                                          |
| `hasher`          | `Function` |                           | Customize the behavior of how the hash gets calculated (defaults to an md5 of manifest.json)                           |
| `onFinished`      | `Function` |                           | This callback will be invoked after gall operations are complete                                                       |


### Example Usage

```bash
$ UPLOAD_ENABLED=true AWS_ACCESS_KEY_ID=******* AWS_SECRET_ACCESS_KEY=******** yarn prod
```

![image](https://user-images.githubusercontent.com/16297677/182513452-7bb33844-db5b-463b-bc62-2f2bcf26ff69.png)

