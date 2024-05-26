# NextJS & SQLite

## Getting Started

```
git clone https://github.com/liara-cloud/nextjs-getting-started.git
```

```
cd nextjs-getting-started
```

```
git checkout sqlite
```

- Create a [NextJS app](https://console.liara.ir/app/create) on Liara
- Create new disk named database and mount it to the app using below `liara.json` code:

```json
{
    "disks": [
        {
            "name": "database", 
            "mountTo": db
        }
    ]
}
```

```
liara deploy --platform next
```