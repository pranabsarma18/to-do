# To-Do App

A modular, responsive To-Do List web application built with **JavaScript**, **Webpack**, **date-fns**, and **Local Storage**.

This project was built as part of The Odin Project JavaScript curriculum, with a focus on practicing DOM manipulation, JavaScript modules, object-based data modeling, event handling, npm, Webpack, persistence, and Git/GitHub deployment.

## Live Demo

**GitHub Pages:**  
https://pranabsarma18.github.io/to-do/

> If the live URL changes, update this link to match the GitHub Pages URL configured for the repository.

## Repository

**GitHub:**  
https://github.com/pranabsarma18/to-do

---

## Features

### Project Management

- Create multiple projects.
- Select a project from the sidebar.
- Highlight the currently selected project.
- Store projects in browser Local Storage.
- Automatically create a `Default` project when needed.
- Associate each to-do item with a project.

### To-Do Management

Each to-do item supports:

- Title
- Description
- Due date
- Priority
- Notes
- Completion status
- Associated project

Users can:

- Create to-dos.
- Edit existing to-dos.
- Delete to-dos.
- Mark to-dos as complete/incomplete.
- Expand and collapse additional details.
- View overdue to-dos.
- Filter displayed to-dos by project.

### Completion UI

Completed to-dos receive a visual completed state.

The application:

- Reduces the opacity of completed cards.
- Applies a strikethrough to the relevant to-do information.
- Keeps interactive controls usable.
- Allows a completed item to be marked incomplete again.

### Due Dates and Overdue Detection

The project uses [`date-fns`](https://date-fns.org/) for date-related operations.

It uses date-fns functionality to:

- Compare dates.
- Normalize dates using the start of a day.
- Calculate the number of days between dates.
- Identify overdue tasks.

### Persistence

Projects and to-dos are stored in the browser's Local Storage.

The application persists:

- Projects
- To-dos
- Current project selection
- Completion status
- To-do/project relationships

Refreshing the page does not remove the stored application data.

### Responsive Layout

The application includes a small mobile-focused responsive layout.

On smaller screens:

- The sidebar moves above the main content.
- The header adapts to its content.
- The application remains usable on narrow screens.

The responsiveness is intentionally kept simple rather than attempting to cover every possible device size.

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES Modules)

### JavaScript Libraries

- [date-fns](https://date-fns.org/) — date manipulation and comparison

### Build Tools

- [Webpack](https://webpack.js.org/)
- webpack-cli
- webpack-dev-server
- html-webpack-plugin
- html-loader
- css-loader
- style-loader

### Storage

- Browser Local Storage

### Version Control

- Git
- GitHub

### Deployment

- GitHub Pages
- `gh-pages` branch deployment following the approach used in The Odin Project curriculum

---

## Project Structure

```text
to-do/
│
├── src/
│   ├── index.html
│   ├── index.js
│   ├── style.css
│   ├── dom.js
│   ├── project.js
│   └── todo.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── webpack.config.js
└── README.md
```

### `src/index.html`

Contains the basic HTML structure of the application.

Webpack uses this file as the template for the generated HTML document.

### `src/index.js`

Acts as the main application entry point.

It coordinates:

- Application initialization
- Current project state
- Form submission
- Project creation
- To-do creation
- Local Storage initialization
- Communication between the data and DOM modules

### `src/project.js`

Responsible for project-related data and operations.

It contains functionality for:

- Creating projects
- Storing projects
- Loading projects
- Updating project-related persistence

### `src/todo.js`

Responsible for to-do data and persistence.

It contains functionality for:

- Creating to-dos
- Storing to-dos
- Loading to-dos
- Updating to-dos
- Deleting to-dos
- Changing completion status

### `src/dom.js`

Responsible for rendering and interacting with the DOM.

It handles:

- Rendering projects
- Rendering project options
- Rendering to-do cards
- Editing to-dos
- Deleting to-dos
- Showing/hiding to-do details
- Connecting UI events with application logic

### `src/style.css`

Contains the application's styling, including:

- Layout
- Sidebar
- Header
- To-do cards
- Buttons
- Forms
- Dialogs
- Priority styling
- Completion styling
- Basic mobile responsiveness

### `webpack.config.js`

Configures Webpack.

It defines:

- The application entry point
- The output directory
- HTML generation
- CSS processing
- HTML processing
- Image assets
- Development mode
- Source maps
- Development server configuration

---

## Application Architecture

The application is divided into several modules instead of putting all JavaScript into one file.

```text
                    ┌──────────────┐
                    │   index.js   │
                    │ App control  │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
       ┌────────────┐ ┌───────────┐ ┌───────────┐
       │  project.js│ │  todo.js  │ │   dom.js  │
       │  Projects  │ │  To-dos   │ │   UI/DOM   │
       └────────────┘ └───────────┘ └───────────┘
              │            │
              ▼            ▼
       ┌─────────────────────────────┐
       │       Local Storage         │
       └─────────────────────────────┘
```

### Data Relationship

A to-do stores its associated project.

Conceptually:

```text
Project
├── id
└── project

Todo
├── id
├── title
├── description
├── dueDate
├── priority
├── notes
├── checklist
└── project
      └── project.id
```

Project IDs are used to associate and filter to-dos by project.

---

## Data Persistence

The application uses two primary Local Storage entries:

```text
projects
todos
```

It also stores the currently selected project:

```text
Current Project
```

Data is converted to JSON before being stored.

For example:

```js
localStorage.setItem(
    "projects",
    JSON.stringify(projectArr)
);
```

When loading:

```js
const storedProjects = JSON.parse(
    localStorage.getItem("projects")
);
```

Because Local Storage stores strings, application data is serialized with `JSON.stringify()` and reconstructed with `JSON.parse()`.

### Important Note About Methods

Objects loaded from Local Storage are reconstructed as plain JavaScript objects.

Therefore, methods defined on objects are not preserved through JSON serialization.

For this reason, operations such as changing completion status are handled by standalone functions that update the object and then explicitly persist the updated object.

---

## Installation

### Prerequisites

Make sure you have:

- Node.js
- npm
- Git

You can verify them with:

```bash
node --version
npm --version
git --version
```

### Clone the Repository

```bash
git clone https://github.com/pranabsarma18/to-do.git
```

Move into the project:

```bash
cd to-do
```

### Install Dependencies

```bash
npm install
```

This installs the dependencies listed in `package.json`.

---

## Development

Start the Webpack development server:

```bash
npm run dev
```

Webpack Dev Server will start the application locally.

The application is configured to run on:

```text
http://localhost:8080/
```

The development server provides a convenient environment for working on the application without manually rebuilding after every change.

---

## Production Build

The project includes a build command:

```bash
npm run build
```

Webpack generates the bundled application inside:

```text
dist/
```

The generated directory contains the files required to serve the bundled application.

> The current Webpack configuration uses `mode: "development"`. The deployment works with this configuration, although a future improvement could configure separate development and production modes.

---

## Webpack Configuration

The project uses Webpack to bundle the application.

The main entry point is:

```text
src/index.js
```

Webpack processes JavaScript imports and bundles the application's modules into:

```text
dist/main.js
```

`HtmlWebpackPlugin` generates the final HTML file:

```text
dist/index.html
```

CSS is processed using:

```text
style-loader
css-loader
```

The configuration also supports image assets such as:

```text
png
svg
jpg
jpeg
gif
```

---

## Git and GitHub

The project uses Git for version control.

The repository intentionally does not track:

```text
node_modules/
dist/
```

These are listed in `.gitignore`.

### Why is `node_modules` ignored?

Dependencies are described by:

```text
package.json
package-lock.json
```

Another developer can recreate `node_modules` by running:

```bash
npm install
```

### Why is `dist` ignored?

Webpack can regenerate the build output:

```bash
npm run build
```

Therefore, the generated build directory does not need to be part of the main source-code branch.

---

## GitHub Pages Deployment

The application can be deployed using a separate `gh-pages` branch.

The general deployment workflow is:

```text
main
 │
 │ merge
 ▼
gh-pages
 │
 │ build
 ▼
dist/
 │
 │ push dist contents
 ▼
GitHub Pages
```

A typical deployment sequence is:

```bash
git checkout gh-pages
git merge main --no-edit

npm run build

git add dist -f
git commit -m "Deployment commit"

git subtree push --prefix dist origin gh-pages

git checkout main
```

GitHub Pages should be configured to use the `gh-pages` branch as its deployment source.

This follows the deployment approach described in The Odin Project curriculum, where the contents of `dist` are pushed to a dedicated `gh-pages` branch. 

---

## Current Limitations

This project intentionally keeps the implementation relatively simple.

Some possible future improvements include:

- Better separation between application state and DOM logic
- Reducing coupling between modules
- Improving the current-project state management
- Adding more comprehensive form validation
- Adding more responsive breakpoints
- Improving accessibility
- Adding keyboard-friendly interactions
- Adding automated tests
- Adding linting and formatting
- Using separate Webpack development and production configurations
- Adding a dedicated production build configuration
- Improving error handling for corrupted Local Storage data
- Adding project deletion
- Adding project renaming
- Adding task sorting and filtering
- Adding task search
- Adding recurring tasks
- Adding drag-and-drop ordering

These are potential future improvements rather than requirements for the current version.

---

## Learning Objectives

This project provided practice with:

- JavaScript modules
- ES module imports and exports
- Factory functions
- Objects and object relationships
- DOM manipulation
- Event listeners
- Event delegation concepts
- HTML forms
- Dialog elements
- Form validation
- CSS Grid
- Flexbox
- Responsive CSS
- Local Storage
- JSON serialization
- npm
- External JavaScript packages
- date-fns
- Webpack
- Webpack loaders
- Webpack plugins
- Webpack Dev Server
- Source maps
- Git
- GitHub
- GitHub Pages deployment

---

## Example Workflow

A typical development workflow is:

```text
1. Start development server
       ↓
   npm run dev
       ↓
2. Modify source code
       ↓
3. Test application locally
       ↓
4. Build application
       ↓
   npm run build
       ↓
5. Commit source changes
       ↓
   git add .
   git commit
       ↓
6. Push source branch
       ↓
   git push
       ↓
7. Deploy updated dist/
       ↓
   gh-pages
       ↓
8. GitHub Pages serves the application
```

---

## Credits

This project was developed as part of the **JavaScript curriculum from The Odin Project**.

The project specifically builds upon concepts covered in:

- JavaScript
- Organizing JavaScript Code
- npm
- Webpack
- JavaScript projects
- Git and GitHub

The project deployment approach follows the GitHub Pages deployment guidance provided by The Odin Project.

---

## License

This project does not currently specify a separate open-source license.
