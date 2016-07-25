SystemJS.config({
  baseURL: "/",
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/",
    "toggle-meister/": "src/"
  },
  sofe: {
    "manifestUrl": "https://cdn.canopytax.com/sofe-manifest.json"
  }
});
