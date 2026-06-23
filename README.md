# Pablo Rocha Landing Page

Minimal personal landing page for Pablo Rocha, built as a static website with HTML, SCSS compiled to CSS, and vanilla JavaScript modules.

## File Structure

```text
.
|-- index.html
|-- package.json
|-- package-lock.json
|-- README.md
|-- .gitignore
|-- dist/
|   `-- css/
|       `-- styles.css
`-- src/
    |-- js/
    |   |-- dom.js
    |   |-- main.js
    |   |-- profile-data.js
    |   `-- render.js
    |-- scss/
    |   |-- _base.scss
    |   |-- _components.scss
    |   |-- _layout.scss
    |   |-- _utilities.scss
    |   |-- _variables.scss
    |   `-- styles.scss
    `-- tools/
        `-- check-file-size.js
```

## Requirements

- Node.js
- npm

## Install Dependencies

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open the localhost URL shown in the terminal, usually:

```text
http://localhost:3000
```

GitHub Pages serves the static files directly. The browser loads compiled CSS from `dist/css/styles.css` and JavaScript from `src/js/main.js`.

## SCSS

Compile SCSS:

```bash
npm run sass
```

Watch SCSS:

```bash
npm run sass:watch
```

`dist/css/styles.css` is generated from `src/scss/styles.scss` and should not be edited manually.

## Validation

Run file-size linting:

```bash
npm run lint
```

Run the full validation flow:

```bash
npm run validate
```

The file-size lint keeps JavaScript, SCSS, and `index.html` small enough to stay easy to maintain.

## Notes

This project has no frontend framework, no bundler, and no JavaScript build step. Do not deploy or commit `node_modules`.
