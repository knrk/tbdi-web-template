
TBDI WWW Template based on Wordpressify http://www.wordpressify.co/ project.

# 0. Prerequisites
Before you start wordpress theme development you need to run following commands.

## 0.1 Dependecies
```
$ nvm use 10.8.0
$ npm i
```
Use latest Node and NPM using Node Version Manager. Then install all dependencies.

## 0.2 Customize template name
Open **gulpfile.js** and edit themeName variable value.

# 1. Dev Server
In order to create auto-updated site, you have to run following command.
```
$ npm run dev
```

# 2. Gutenberg Blocks
We are using custom Gutenberg blocks. For development you have to go to the **build/wordpress/wp-content/plugins/tbdi-blocks** folder and run following command. This should start watcher and it must be successful.
```
$ npm start
```

# Changelog
**v0.2.0**
- Add Gutenberg blocks for easier page building
- Remove RAW HTML plugin

**v0.1.0**
- Initial version.

# License
MIT
