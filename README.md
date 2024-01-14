# NextJS apps getting started

An example of deploying a simple NextJS project on [Liara](https://liara.ir).

## Deploying

[Create New NextJS App](https://console.liara.ir/apps/create) & install the [Liara CLI](https://docs.liara.ir/cli/install)

```bash
$ git clone https://github.com/liara-cloud/nextjs-getting-started # or clone your own fork

$ cd nextjs-getting-started

$ liara deploy
```
## Managing Bucket Using S3 - step by step
```
npm install
 ```
- set your bucket informations in pages/index.js
- or rename .env.example file to .env, then set your ENVs
``` npm run dev ``` 
### first look of projetc
<img src='https://files.liara.ir/liara/nextjs/upload-file-using-s3-nextjs.png'>

### features
- upload file using s3
- download file using s3
- share links of uploaded files
- remove file from bucket using s3
