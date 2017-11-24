# put-version

With this tool you can archieve to turn this:
```
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <script src="script.js"></script>
</body>
</html>
```
to this:
```
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css?version=1.4.0">
</head>

<body>
    <script src="script.js?version=1.4.0"></script>
</body>
</html>
```

## Why?
Browsers cache scripts and stylesheets. When you change the path like this you force the browser to receive the latest versions.

## Install
Install it easily with NPM:
```
npm i put-version -D
```

## Usage
```
put-version [filePath]
```

Example: `put-version ./index.html`

Then you should register it your `package.json` so it will always get executed when you create a new build:
```
{
  "name": "your-app",
  "version": "1.0.0",
  "scripts": {
    "build": "put-version ./index.html"
  },
  ...
}
```