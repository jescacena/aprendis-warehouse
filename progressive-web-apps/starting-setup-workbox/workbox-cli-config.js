module.exports = {
  "globDirectory": "public/",
  "globPatterns": [
    "**/*.{ico,html,json,css,js}",
    "src/images/*.{jpg,png}"

  ],
  "swSrc":"public/sw-base.js",
  "swDest": "./public/sw-workbox.js",
  "globIgnores": [
    "../workbox-cli-config.js",
    "help/**"
  ]
};
