# Todo

## Problem Description

Create a fullstack app, some like a blog page, where is possible to public access to read **all posts** and people can **create an account**, **login** and **create another posts**.

## List of versions

Testing the follow system:

Tag > branch > commit

- Create a branch (feat_starting_project)
- Start package.json, set version to 0.0.1 and commit
- Add a gitignore, update version to 0.0.2 and commit again
- ...
- When ends to start, merge [master <- feat_starting_project]
- Update version to 0.1.0 and commit
- ...
- When ends all versions merges, update version to 1.0.0 and commit
- Create a new tag version and launch project

- [ ] 1.0.0 - Ready to first use
  - [X] 0.1.0 - Start
    - [X] 0.0.1 - Start with node
    - [X] 0.0.2 - Run gitignore node
    - [X] 0.0.3 - Add MIT license
    - [X] 0.0.4 - Add README
    - [X] 0.0.5 - Start a changelog
    - [X] 0.0.6 - Add typescript
  - [X] 0.2.0 - Start frontend
    - [X] 0.1.1 - Add Next.js
    - [X] 0.1.2 - Add scripts Next.js
    - [X] 0.1.3 - Create first page
  - [X] 0.3.0 - Improve environment
    - [X] 0.2.1 - Add eslint and Prettier
    - [X] 0.2.2 - Create scripts to test, lint and format
    - [X] 0.2.3 - Add husky and config
    - [X] 0.2.4 - Improve package.json data and add remote repository data
  - [X] 0.4.0 - Start API with SOLID
    - [X] 0.3.1 - Create server directory
    - [X] 0.3.2 - Create entities directory and create first entity (Post)
    - [X] 0.3.3 - Create use cases directory and create some use cases (create a post and list posts)
    - [X] 0.3.4 - Create repository directory and create the first contract
    - [X] 0.3.5 - Create inMemory directory to prepare to tests and create first contract implementation
    - [X] 0.3.6 - Call repository methods inside use cases
    - [X] 0.3.7 - Create API calls and call use cases to be allow uses API integration with in memory data
    - [X] 0.3.8 - Add Prisma, configure module Post and create DTO implementation
    - [X] 0.3.9 - Add zod and change API calls
  - [X] 0.5.0 - Improve general
    - [X] 0.4.1 - Fix versions system
    - [X] 0.4.2 - Inform more about the object of this template project to help community
    - [X] 0.4.3 - Add typescript aliases
    - [X] 0.4.4 - Add vitest and start testing all files
  - [ ] 0.6.0 - Login
    - [X] 0.5.1 - Create User entity
    - [X] 0.5.2 - Create use case (create and login)
    - [X] 0.5.3 - Create repository contract to User
    - [X] 0.5.4 - Create in memory repository and prisma repository
    - [X] 0.5.5 - Create prisma user repository
    - [X] 0.5.6 - Create API integration
    - [X] 0.5.7 - Use cookies to create login session
    - [X] 0.5.8 - Create login and register pages and redirects (if logging, redirect to posts, else redirect to login)
    - [ ] 0.5.9 - Remove username field to post create
      - [X] 0.5.8.1 - Fix front-end pages flow
      - [ ] 0.5.8.2 - Create a hook to login verification
      - [ ] 0.5.8.3 - Fix relation User and Post
  - [ ] 0.7.0 - Improve frontend
    - [ ] 0.6.1 - Fix page flow and create pages
        - **/** list of posts
        - **/post/:id** post
        - **/new:** create a post
        - **/login** login
        - **/register** create user
    - [ ] 0.6.2 - Add Storybook and create UI directory
    - [ ] 0.6.3 - Add Styled Components, React Icons, Next Font, Material UI and Semantic UI
    - [ ] 0.6.4 - Create components with total quality, adding UI libs if necessary