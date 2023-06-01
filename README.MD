# Template

The modern web stack is modeled after this project. You may modify and/or redistribute it in compliance with the MIT license because it is free software.

## Using this template

You can use this template using the command:

```
npx degit renatobmps/template_web new_project_name
```

Below, you'll find some details about some technologies utilized in this project:

### Node
This project was developed with the Node.js v18.15.0 version.

### Next.js
This is a project is running with Next.js 13.4.3. With Next.js, you can run the project locally with ```npm run dev```.

### EsLint and prettier
Eslint is a tool to enforce coding pattern and prettier is a tool to enforce code style. This tools will create a code pattern.

### Husky
Husky will improve the git commits. This tool will allows a commit only if the test and lint scripts don't returns erros. Basically, you will try to commit something and it will run ```npm run lint``` and ```npm run test``` and if it doesn't return erros, your code will be committed.

## About frontend

This frontend is using Next.js, it's mean that you can use functions as getStaticProps, for example to made a server side rendering app.

## About backend

The API is made using SOLID principles. SOLID helps you to have a scalable API because it uses Liskov substitution principle and Dependency Injection principle and this allows you to create uncoupled entities. This principles helps with automated testing too, because is possible to use a In Memory database without problem, for example.