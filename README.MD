# TuneIn Lite - Danny Glover

This is a lightweight, single-page app built from TuneIn's API, which can be
found
[here](https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json).
With this app, a user can view and sort a list of radio stations, and play a
station by pressing the station tile. Once a station is playing, more
information about the current station is displayed to the user.

A hosted version can be found [here](https://ti-lite.vercel.app/).

## Technology Choices

### Vite

Vite was chosen as the build tool for this project due to its fast development
environment, out-of-the-box support for modern features, and optimized build
process. Vite's server starts instantly, and its hot module replacement makes
for a smooth development experience. When it's time to build for production,
Vite uses Rollup to efficiently create optimized smaller bundles.

If you'd like to learn more you can visit the Vite documentation
[here](https://vitejs.dev/guide/why.html).

### React Testing Library

React Testing Library was chosen for unit testing because it encourages writing
tests that use your components as the end users would. It provides a high level
of confidence that your components are working properly while remaining
relatively simple to use.

Learn more
[here](https://testing-library.com/docs/react-testing-library/intro/).

### Redux / React-Redux

Redux was used in this project to manage application state. Using redux allows
state to be shared across react components that aren't closely related or
nested, providing a global state accessible throughout the application.

Learn more [here](https://react-redux.js.org/).

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on
your machine.

> Note: This app was built using Node 18 (LTS at time of writing). Please use
> Node 18+ when building.

**Installation:**

`npm install `

**To Run Test Suite:**

`npm test `

**To Start Server:**

`npm run dev `

Vite Terminal Shortcuts

- press r to restart the server
- press u to show server url
- press o to open in browser
- press c to clear console
- press q to quit

**To Visit App:**

Press 'O' in your terminal or visit `http://localhost:5173/`

> Note: The port may be different on your machine, please reference the terminal
> output.
