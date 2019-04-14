# Redmine UI Plugin

A WebExtension for adjusting the look of the [Redmine](https://www.redmine.org/) User Interface. This Extension is specifically designed to work with the internal [n-design GmbH](https://n-design.de/)'s Redmine installation.

## Build

### Prerequisites

Linux-based system with the following tools installed:

* `node` (v11.x)
* `npm` (v6.x)
* `zip`

### Buildsteps

1. Install dependencies: `npm install`
1. Build javascript from typescript with webpack: `npm run build`
1. Build distribution zip-files: `npm run dist`

Resulting artifacts:

* WebExtension-zip with scripts and `manifest.json`: `dist/de.moetz.js.webext.redmineuiplugin-[version].zip`
* Source-zip for upload to Mozilla: `dist/de.moetz.js.webext.redmineuiplugin-[version]-src.zip`