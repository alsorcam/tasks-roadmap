# Tasks Roadmap

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.3 and shows notes organized by categories on a timeline.

## Project structure

The application is composed of folders that have common functionality or purpose:

- **Components:** Contains all the necessary components to create the timeline view for the task roadmap.
- **Error:** Services, interceptors, and handlers needed for a basic error handling that covers HTTP requests and client errors.
- **Services:** Contains the services that fetch data from external sources.
- **Types:** Contains files that export the needed interfaces to type variables.
- **Utils:** Utility classes and/or methods that are useful for data transformation.

## Running scripts

### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
To be able to load anything, the `apiUrl` in the `environment.ts` file should be updated to fetch the needed data.

### Mock server

Run `npm run mock-server` to run the mock server that will return the data provided in the `mock/db.json` file. The mock server will be running in the :3000 port (`http://localhost:3000`).
Run `npm run start:mock` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
