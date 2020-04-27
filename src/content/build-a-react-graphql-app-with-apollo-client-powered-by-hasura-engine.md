---
layout: post
title: 'Build a React GraphQl app with Apollo Client powered by Hasura Engine'
author: Imran Khan
tags: ['ReactJs']
image: img/hasura.png
date: '2019-01-01T15:11:55.000Z'
draft: false
---
## Table of Contents

```toc
```

Hey Amigos! In this tutorial we are going to build a Reactjs todo app which
will use postgres as a database and graphql as a query language.

We'll be using Auth0 to authenticate users into our app.

Here's the complete code for this project, [GitHub Repo](https://github.com/strongSoda/hasura-react-todo). Also here's [The complete working app demo.](https://hasuratodowithapollo.herokuapp.com/)

To follow along you need to have some experience with the React.js library. If you feel rusty here's a great [refresher](https://reactjs.org/docs/hello-world.html).

The tools we will be using might be alien to you so I'll give you a brief overview of them.

## Tech OverView

### Reactjs

A JavaScript library for building user interfaces. [Read More](https://reactjs.org/)

### Postgres

The World's Most Advanced Open Source Relational Database. PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance. [Read More](https://www.postgresql.org/about/)

### GraphQl

A query language for your API. GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools. [Learn GraphQl](https://graphql.org/learn/)

### Hasura GrapQl Engine

The Hasura GraphQL Engine is an extremely lightweight, high performance product that gives you instant realtime GraphQL APIs on a Postgres database. This can be used to quickly build new applications on Postgres or fast-track the move to GraphQL for existing applications on Postgres.

It comes with a UI (an API explorer, a phpMyAdmin of sorts for Postgres) that lets you create and view tables on your database and make GraphQL queries using the embedded GraphiQL interface.

[Read more about Hasura](https://hasura.io/)

### Apollo GraphQL Platform

The Apollo GraphQL platform is an implementation of GraphQL that helps you manage data from the cloud to your UI. It’s incrementally adoptable and can be layered over your existing services, including REST APIs and databases. Apollo includes two open-source libraries for the client and server, in addition to developer tooling that provides everything you need to run a graph API in production with confidence.
[Read More](https://www.apollographql.com/docs/?no-cache=1)

### Heroku

Heroku is a cloud platform that lets companies build, deliver, monitor and scale apps — we're the fastest way to go from idea to URL, bypassing all those infrastructure headaches. Heroku is the quickest way for a company to become an apps company. Heroku is a service that enables companies to spend their time developing and deploying apps that immediately start producing value. [Learn more about Heroku](https://www.heroku.com/what)

### Auth0

People think that you can’t save money and reduce costs with something essential like identity. But those who use Auth0 experience a positive impact to their bottom line. [Read More.](https://auth0.com/)

## Let's Get Started

The first step is to host our Hasura GraphQl Engine. We'll host our postgres database on heroku with Hasura graphql engine which gives us Instant Realtime GraphQL on Postgres. This allows us to quickly build a variety of new applications on Postgres. There are a number of ways of doing so, but in this tutorial we are going for the one click deployment.

<a href="https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku" data-href="https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku" class="markup--anchor markup--li-anchor" rel="noopener" target="_blank">One Click Hasura Deploy to Heroku</a>

![deploy heroku](https://docs.hasura.io/1.0/_images/heroku-app1.png)

> _Note_: You need to have an account on heroku to be able to deploy an app on it. [Sign Up on Heroku for free.](https://www.heroku.com/)

> _Note_: If you want to setup Hasura GraphQl Engine locally, [here's a great resource to help you](https://docs.hasura.io/1.0/graphql/manual/getting-started/index.html).

Now, we can use the Hasura GraphQL engine to:

1. access a Postgres database
2. use the Hasura console (an admin UI) that connects to the Hasura GraphQL engine to help us build our schema and run GraphQL queries

![hasura flowchart](https://docs.hasura.io/1.0/_images/running-hasura1.png)

### Setup table and permissions

Now open up your hasura engine which you just deployed on heroku.

![open app](https://i.imgur.com/NALFSBR.png)

Now, navigate to the Data section and click on create table. Name your table `todos` . Alright, so now that the table is created, it's time to define some fields:

- `todo_id` : Integer (auto increment)

- `todo_text` : Text

- `todo_mark` : Boolean

- `todo_user` : Text

_**todo_id**_ will be the auto-incrememnting integer to store the ids of the todos. _**todo_text**_ will hold the text we enter in todos. _**todo_mark**_ which is a boolean will flag whether a todo is completed or not. _**todo_user**_ will maintain the id of the logged in user.

> **Note**: Since `todo_id` is going to be unique for every todo we'll make it the primary key.

![create table](https://i.imgur.com/W6fa8lA.png)

Phew!!! Now that our table is all set up, we need to define some permissions on it regarding which user can access what data or who can do mutations in this table. To do so navigate to your table by clicking on the table name in the left panel, then go to the permissions tab.

Now follow the following steps:

- Create a new role and call it `user`

- click on the pencil icon in the `insert` column

- now chose `with custom checks`

- then type {"todo_user":{"\_eq":"X-HASURA-USER-ID"}} in the text-area to set user id as X-HASURA-USER-ID

- allow input for all the columns

- Save

- now for `select` check `with same checks as` and select all columns for access.

- similarly, for `update` check `with same checks as` but select only `todo_mark` column for update access

- lastly, for `delete` check `with same checks as`

![adding permissions](https://cdn-images-1.medium.com/max/1750/1*98HSDzrNrIFu55YjQIe9lQ.png)

Kudos! on making it so far. Now, our backend is all set up. Notice that we didn't need to write a single line of code. This is what the Hasura GraphQl Engine brings on the table. Before moving forward relax and take a few deep breaths, things are going to get real interesting mama!

Next we need to build our front-end in React.js. But, before that I'll recommend you to gain some basic understanding of writing queries in GraphQl. [Learn GraphQl](https://graphql.org/learn/)

## Building the front-end in React.js

> **Note:** Make sure to have [node.js](https://nodejs.org/en/) installed on your machine. We won't be using node, but we need npm which comes packaged in node.js to install & manage our project dependencies.

Before diving in to build our react app we need to define the component tree.

- the `App` component will be the parent component which'll wrap all other components. It is responsible for rendering the `NavBar` and the `home` component when user is logged in.

- the `home` component will wrap all other components inside the apollo provider component.

- the `Todo` component which will render all todos.

- the `AddTodo` component to add new todos, wrapped inside the `Todo` component.

- the `MarkTodo` component to update todos' status, wrapped inside the `Todo` component.

- the `DeleteTodo` component to delete todos, wrapped inside the `Todo` component.

Alright, that's a pretty neat component tree. Let's move on.

### Scaffold a React.js Project

The best & recommended way of scaffolding a react app is the `create-react-app`. That's exactly what we'll be using. Move into your terminal & `cd` inside the folder you want your app to live in. Then run

```bash

$npx create-react-app hasura-todo

```

Sit back and relax until your project's scaffolded. Once, it's done run :

```bash
$cd hasura-todo
$npm start
```

This will start a local development server & serve your freshly baked react app. Kill the server, and delete all the files in the `src` folder. We'll be starting from scratch.

### Setting up Authentication with Auth0

These days almost every application requires authenticating it's users for a number of reasons. We'll be using authentication to login users and storing their login ids as `todo_user` in our postgres database to keep of track of who does what changes.

First, SignUp on [Auth0](https://auth0.com/) . Then create a new application, let's call it `todoapp`. Give your app a domain name which will be called when authentication takes place. I have named mine `devhoot.auth0.com`.

> **Note:** Give a unique name to your domain.

In the allowed callback URLS, enter `http://localhost:3000/callback`

Finally, in the application type select Single Page Application. Copy and save your Client Id, we'll be using it in or front-end very soon.

> **Note:** If you need to learn more about Auth0 please refer [these docs.](https://auth0.com/docs)

Go to your project folder & inside of the `src` folder create another folder `Auth`. Inside of this folder create two files `Auth.js` and `auth0-variables.js`.

Now that our auth0 app is setup let's get cracking. Install `` auth0 ``` in our project:

```bash
$npm i auth0-js
```

or

```bash
$yarn add auth0-js
```

We now have auth0 module available in our project which we can import and use.

Inside of `auth0-variables.js` write the configurations for your auth0 app.

```javascript
export const AUTH_CONFIG = {
  domain: 'devhoot.auth0.com',
  clientId: 'your-client-id-which-you-copied-from-auth0-app-console',
  responseType: 'token id_token',
  scope: 'openid',
  callbackUrl: 'http://localhost:3000/callback',
};
```

Here, we are creating an `AUTH_CONFIG` object and exporting it.

> **Note:** you have to use your own unique auth0 domain name, I have used mine.

After authentication we are redirecting to our `localhost:3000` where our server is running.

Now, head over to the `Auth.js` file. Let's get some imports first :

```jsx
import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
```

Now, add the following to `Auth.js` :

```jsx
import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth {
  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid',
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('sub', authResult.idTokenPayload.sub);
    // navigate to the home route
    history.replace('/home');
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('sub');
    // navigate to the app route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
```

Alright, now come out of the `Auth` folder and inside the src create another file `history.js` and paste the following to it:

```jsx
import createHistory from 'history/createBrowserHistory';

export default createHistory();
```

We are using the `history` module which is a JavaScript library that lets you easily manage session history anywhere JavaScript runs. `history` abstracts away the differences in various environments and provides a minimal API that lets you manage the history stack, navigate, confirm navigation, and persist state between sessions.

But in order to do that we need to install it in our project:

```bash
$ npm install --save history
```

Inside the `src` folder create a folder named `Callback`. Inside `Callback` create a `Callback.js` file and type in the following code:

```javascript
import React, { Component } from 'react';
import loading from './loading.svg';

class Callback extends Component {
  render() {
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    };

    return (
      <div style={style}>
        <img src={loading} alt="loading" />
      </div>
    );
  }
}

export default Callback;
```

Next up, inside of `src` folder create and `index.js` file and fill it with:

```jsx
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();

ReactDOM.render(routes, document.getElementById('root'));
```

Create another file in `src` folder `routes.js` which'll handle our authentication routes:

```jsx
import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route path="/" render={(props) => <App auth={auth} {...props} />} />
        <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
        <Route
          path="/callback"
          render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
    </Router>
  );
};
```

Now, on the same level in the `src` folder create an `index.css` and an `App.css` file.

`index.css`

```css
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
```

`App.css`

```css
.btn-margin {
  margin: 7px 3px;
}

/* todos css */
.list-group-item {
  padding: 2.2em;
  border: 2px solid black;
}

.list-group-item h4 {
  display: inline;
  margin-left: 2.5em;
}

.list-group-item button {
  margin-bottom: 4px;
}

.logout {
  background-color: brown;
  /* position: relative;
  left: 80vw; */
}
```

We'll be using the `react-bootstrap` to style our react app. Install `react-bootstrap` in our project:

```bash
$npm i react-bootstrap
```

or

```bash
$yarn add react-bootstrap
```

Now, inside of the `src` folder create another file and call it `App.js` :

<div class="gist" style="max-width: 75vw;position: relative; left: 15vw" >
    <script src="https://gist.github.com/strongSoda/ef00b87302f0b1591e4f40acb975e3d6.js"></script>
</div>

### Query the postgres dB with graphql

Now, we are gonna write queries for each function and build their components simultaneously. Create a `Components` folder inside src. Make the following files:

- `AddTodo.js`

- `DeleteTodo.js`

- `MarkTodo.js`

- `Todo.js`

- `QueryAddTodos.js`

- `QueryMarkTodos.js`

- `QueryDeleteTodos.js`

- `QuerygetTodos.js`

We need the `graphql` module to be able to write graphql queries in our app.

```bash
$ npm i -s graphql
```

Now, let's query our postgres dB to fetch all todos and then export the result:

```jsx
// QuerygetTodos.js
import gql from 'graphql-tag';

export const getTodos = gql`
  {
    todos {
      todo_id
      todo_text
      todo_mark
      todo_user
    }
  }
`;
```

Alright, so let's mutate our postgres dB this time to delete a todo and then export the result:

```jsx
// QueryDeleteTodos.js
import gql from 'graphql-tag';

export const deleteTodo = gql`
  mutation($todo_id: Int!) {
    delete_todos(where: { todo_id: { _eq: $todo_id } }) {
      affected_rows
    }
  }
`;
```

We also need to mutate our postgres dB to add a todo and then export the result:

```jsx
// QueryAddTodos.js
import gql from 'graphql-tag';

export const addTodo = gql`
  mutation($todo_text: String!, $todo_user: String!) {
    insert_todos(objects: [{ todo_text: $todo_text, todo_user: $todo_user }]) {
      affected_rows
    }
  }
`;
```

Finally, mutate our postgres dB to update a todo's status and then export the result:

```jsx
// QueryMarkTodos.js
import gql from 'graphql-tag';

export const markTodo = gql`
  mutation($todo_id: Int!) {
    update_todos(where: { todo_id: { _eq: $todo_id } }, _set: { todo_mark: true }) {
      affected_rows
    }
  }
`;
```

### Render the components with query results

Before moving forward we need to get apollo client in our project:

```bash
$ npm install apollo-boost react-apollo graphql --save
```

So now all our query results are ready, let's render them in our components:

`AddTodo.js`

<div class="gist" style="max-width: 75vw;position: relative; left: 15vw" >
    <script src="https://gist.github.com/strongSoda/fcbed97a4ea770cf591419965a260e17.js"></script>
</div>

> **Note:** Do not forget to install fontawesome icons and other libraries which are imported here.

`MarkTodo.js`

<div class="gist" style="max-width: 75vw;position: relative; left: 15vw" >
    <script src="https://gist.github.com/strongSoda/98bb0514cc184ce4c16a14cbb3c49e23.js"></script>
</div>

`DeleteTodo.js`

<div class="gist" style="max-width: 75vw;position: relative; left: 15vw" >
    <script src="https://gist.github.com/strongSoda/ead09a72b2b78fff5592e1aa5638b3d4.js"></script>
</div>

Finally, let's render `Todo.js`

<div class="gist" style="max-width: 75vw;position: relative; left: 15vw" >
    <script src="https://gist.github.com/strongSoda/8c23c939755ad609dc11d85def5fd890.js"></script>
</div>

> **Note:** Do not forget to install fontawesome icons and other libraries which are imported here.

### Configuring Apollo Client

We have to wrap all our todo components inside of the `home` component which will have the apollo client and apollo provider configured to make requests to out Hasura API.

Inside the `src` folder create a `Home` folder & inside of it create `Home.js`.

`Home.js`

```jsx
import React, { Component } from 'react';
import Todo from '.././Components/Todo';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const ACCESS_TOKEN = localStorage.getItem('access_token');
export const client = new ApolloClient({
  uri: 'https://hasura-react-todo-apollo.herokuapp.com/v1alpha1/graphql',
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <ApolloProvider client={client}>
        <div className="container">
          {isAuthenticated() && (
            <div>
              <Todo />
            </div>
          )}
        </div>
      </ApolloProvider>
    );
  }
}

export default Home;
```

> **Note:** In the uri use your own hasura api endpoint.

> **Note:** To learn more on how to configure Apollo client and use Apollo platform [refer these docs](https://www.apollographql.com/docs/?no-cache=1).

Everything is finally setup, just one more thing.

## Authentication Access control

Hasura gives you granular access controls for every field in your GraphQL schema (i.e. every table or view in your Postgres schema). These access control rules can use dynamic variables that come in with every request.

![hasura schema](https://docs.hasura.io/1.0/_images/hasura-perms1.png)

**While developing**, we send variables directly as request headers.

But, while in production mode our application is deployed it can’t send these authorization variables directly!

Our app can send authorization tokens, cookies, etc. We can handle these either by setting up a webhook or by using JWT. In this tutorial I am gonna show you how to do it with webhook.

> **Note**: If you want to have a notice board like app where all users with admin role can access and mutate the todos or content, you can stop right here. But if you want to make a personalised dashboard for each user and enforce privacy, go ahead and configure the webhook.

### Configure & Deploy WebHook

First, we'll deploy our webhook. [Read this to know how to do so](https://github.com/hasura/sample-auth-webhook#deploy-with-glitch). I have deployed mine on glitch.

Then, in the `.env` file of your deployed webhook, add the following:

```.env
AUTH_ZERO_DOMAIN='devhoot.auth0.com'
```

> **Note**: I've used my auth0 domain. You shall use yours.

### Setup config vars

Now, that our webhook is all setup open it up by clicking show in the top left of the glitch dashboard of your webhook. You'll see the url of your webhook in the browser, copy it.

Now go to the hasura engine project dashboard on heroku and navigate to settings. Here add a new field of `HASURA_GRAPHQL_AUTH_HOOK` and in it's value type `url-of-your-webhook-that-you-copied/auth0/webhook` then click add.

There's one more thing to note here, that using a webhook on hasura engine for access control requires, an `access-key` to be setup. So in the config vars add another field `HASURA_GRAPHQL_ACCESS_KEY` and give it any value which you can remember, say `mysecretkey` then hit add. Okay now you're all setup.

![hasura config vars](https://i.imgur.com/W33Fk0c.png)

> **Note** : To learn more about Access control using webhooks & JWTs please [refer this doc](https://docs.hasura.io/1.0/graphql/manual/auth/basics.html).

So now what'll happen is our app will send all requests along with headers to the deployed webhook on glitch which will then interpret those and pass on to our Hasura Engine on Heroku which will then take care of every action.

Thats it! Fire up your server and see your app live on `localhost:3000` .

In case of any query or errata do let me know in the comments sections below.

> **Note:** This todo app works good on Chrome & Edge but there's a chance that it might not work on mozilla firefox, due to a known issue in auth0. To stay updated on whether the issue is resolved or not [go here](https://github.com/auth0/auth0.js/issues/655).
