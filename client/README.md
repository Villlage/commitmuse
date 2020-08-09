# 🔥🔥🔥 Commit-muse client 🔥🔥🔥
<h2>Set up Instructions:</h2>

- `Starting project`<br/>
after cloning repository run `yarn` or `npm i`, next you can run `yarn start` to start the app

- `Building project`<br/>
for building client's React app must be used `pyhton scripts/build.py` command, it will create 3 separate folders with built files for `dev` `staging` and `production` environments

<h2>Folders and file structure</h2>

- `app` - contains folders: `components`, `modules`, `screens`
  - desc: we need this folder to store all the components, modules and screens(aka pages) of our app 
  - component - is a one single brick of our ui, `very small ui` parts like Button or Select
  - module - is `big ui` part of a project, made with small components, ex: LoginStep or some PopUp
  - screen - is a whole `single page` of our app made with `modules` and `components`
  
- `assets` - contains folders: `fonts`, `icons`
  - rules: svg is preferable format for icons and Icon component can be used to store all the icons of the system 
  - desc: we need this folder to store all the needed assets of our app, like icons, fonts etc
  
- `config` -
  - desc: we need this folder to store configuration files and environment file with environment  vars 
  
- `constants` - 
  - desc: we need this folder to store all the constant variables of the project like `system_colors` or `mockData`

- `helpers` - 
  - desc: we need this folder to store any help functions
   
- `jest` - contains folders: `app-tests`
  - desc: we need this folder to store all the tests of our app, for now we have `units` soon we need to add other types and make sure coverage to be 100%

- `redux` - contains folders: `containers`, `reducers`
  - desc: we need this folder to store all `redux` related files: `containers`, `reducers`, `actions`
  - rules: No need to create file containing `ACTION name` no need to create mess
  
- `routes` - 
  - desc: we need this folder to store all the routes of our app
  
- `services` - 
  - desc: we need this folder to store all the services of our app, <br/>
  basically services are classes with mostly async methods to work with our back-end endpoints

<h2>Tests</h2>
- desc: 
- command to run tests: yarn jest -- -u<br/>
When we run tests, jest generates a nice coverage report for us. To have a look at it, navigate to rootDir/coverage/lcov-report/index.html.

- also you can use command: yarn test

<h2>Code styles and preferable way of coding: </h2>

- no semicolons: **Bad** - `let a = 1;` | **Good** - `let a = 1`<br/>
- use single quote in vars: **Bad** - `let name = "John";` | **Good** - `let name = 'John'`<br/>
- use double quote in html attr: **Bad** - `id='main'` | **Good** - `id="main"`<br/>
- `tab width` must be equal to 2<br/>
- `trailing comma` in files<br/>
- `max line width` is `120` <br/>
- check for `null` and `undefined` at the start of the function so it will stop at the start of running<br/>
- use `prettier` for code formatting <br/>
- must use `const` if variable will not change<br/>
- must use `let` if variable will change<br/>
- `var` is restricted <br/>
- must use `===` instead of `==`<br/>
    - why: The `===` operator ensures that not only the values are equal, but the two items being compared are of the same type too; Whereas the `==` operator only checks that the values of the two items are equal<br/>
- use `strategy patern` instead of creating mess with `if/else if` or `switch/case` just make one object with all possible conditions as properties and use it where needed<br/>
- must use `KISS` and `DRY` principles:<br/>
    - `KISS` - `keep it stupid simple`: code must be as simple as possible, no need to over complicate simple things. Keep it clean, readable, reusable and understandable for other devs. Don't write `war and peace`, just a Haiku is enough. <br/>
    - `DRY` - `don't repeat yourself`: don't copy paste your code from one place to another, export and reuse it instead. If you see that one thing is used multiple times just export it and reuse.<br/>
- in the end just code like it is your best project ever which you will be very proud of to show anyone<br/>
