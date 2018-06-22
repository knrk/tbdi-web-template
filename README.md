
Empty Wordpress Theme with a build system designed to automate development workflow. Based on Wordpressify http://www.wordpressify.co/

This default theme also contains some of the enable/disable options such as 
- disable generator meta tag
- disable recent comments
- disable rss/rsd feed links
- disable Windows Live Writer manifest
- disable auto coverting text into paragraphs
- enable add page slug name into body class
- enable relative path for inserting image media


# 0. Prerequisites
Before you start wordpress theme development you need to run following commands.

## 0.1 Dependecies
```
$ npm i
```
To install all development dependencies.

## 0.2 Customize template name
Open **gulpfile.js** and edit themeName variable value.

## 0.3 Wordpress setup
```
$ npm run install:wordpress
```
To download and install up to date Wordpress instance.

# 1. Building Default Theme
The default theme comes as a theme sample to show how combine everything together. If you want to remove the default theme type the command:
```
$ npm run fresh-start
```
This will **immediately** remove the default styles and leave a minimal viable theme with basic PHP WordPress loops and other useful features.

# 2. Dev Server
In order to create auto-updated site, you have to run following command.
```
$ npm run dev
```

# 3. Deployment
Production ready version is created into `build` directory. You need to run this command
```
$ npm run prod
```


# Changelog
**v0.1.0**
- Initial version.

# License
MIT
