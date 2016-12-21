# Konstru Theme and Components

This repo holds a development platform for the Konstru Web UI project. There will be both a component library and a page prototype area while the app is being developed.

## Getting Started

```bash
git clone https://github.com/ninelabs/konstru-theme
cd konstru-theme
npm install
npm start
```

Open a browser to [http://localhost:3000](http://localhost:3000)

## Development

The base theme uses Bootstrap 4.0.0-alpha-5 via an `npm` module. Overrides are in `sass/theme.scss` and spread out in `sass/theme/*`. Styles specific to the prototype and components sections can be found in their respective stylesheets in the `sass` directory.

SASS is compiled after each file change, so no need to run gulp or anything similar.
