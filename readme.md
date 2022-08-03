This plugin will upload all built assets to s3


### Install Instructions

```bash
$ npm i vite-plugin-s3

$ yarn add vite-plugin-s3
```

##### Import `vite-plugin-s3` in your vite config file
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

##### Config parameters
```javascript
viteS3({
    exclude: /.*\.img/,
    include: /.*\.js$/,
    useHashAsRoot: true,
    hashFile: 's3-assets-manifest.json',
    uploadEnabled: !!process.env.UPLOAD_ENABLED,
    s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1'
    },
    s3UploadOptions: {
        Bucket: 'dist-cdn',
    },
})
```
