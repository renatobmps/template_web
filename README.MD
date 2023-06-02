# Template

Are you seeking for a contemporary stack template so you can stop wasting time setting up your projects? Maybe it can assist you, then. This project serves as the blueprint for the current web stack. It is free software, therefore you are free to alter and/or distribute it in accordance with the MIT license.

With the help of this template, you can create a full-stack project that uses Next.js and all the other tools required to create a SOLID API REST with automated tests, front-end documentation, and more.

## Using this template

The following command can be used to use this template::

```
npx degit renatobmps/template_web new_project_name
```

You can read more about some of the technologies used in this project below:

### Node
The Node.js version used to create this project was 18.15.0.

### Next.js
Next.js 13.4.3 is being used in this project. With Next.js, you can run the project locally with ```npm run dev``` command.

### EsLint and prettier
Eslint is a tool to enforce coding pattern and prettier is a tool to enforce code style. This tools will create a code pattern.

### Husky
Husky will improve the git commits. This tool will allows a commit only if the test and lint scripts don't returns erros. Basically, you will try to commit something and it will run ```npm run lint``` and ```npm run test``` and if it doesn't return erros, your code will be committed.

## About frontend

This frontend is using Next.js, it's mean that you can use functions as getStaticProps, for example to made a server side rendering app.

## About backend

The API is made using SOLID principles. SOLID helps you to have a scalable API because it uses Liskov substitution principle and Dependency Injection principle and this allows you to create uncoupled entities. This principles helps with automated testing too, because is possible to use a In Memory database without problem, for example.