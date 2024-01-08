# NextJS apps getting started

An example of deploying a simple NextJS project on [Liara](https://liara.ir).

## Deploying

[Create New NextJS App](https://console.liara.ir/apps/create) & install the [Liara CLI](https://docs.liara.ir/cli/install)

```bash
$ git clone https://github.com/liara-cloud/nextjs-getting-started # or clone your own fork

$ cd nextjs-getting-started

$ liara deploy
```

## liara.json File

In liara.json file, we can define app-name and platform of the project, for example:
```json
{
    "platform": "next",
    "app": "nextjs-app1"
}
```

