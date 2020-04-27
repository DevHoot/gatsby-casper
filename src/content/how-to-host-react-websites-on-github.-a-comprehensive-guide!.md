---
layout: post
title: 'How to host react websites on GitHub. A comprehensive guide'
author: Imran Khan
tags: ['ReactJs']
image: img/reactGhub.jpeg
date: '2018-12-13T15:11:55.000Z'
draft: false
---
## Table of Contents

```toc
```

Now, there are a lot of tutorials out there which teach you how to do exactly that. But there are some quirks involved which you might not be able to solve if you are new to gh-pages and or GitHub and or React.js and or to the enitre web development thing! When the first time I wished to try gh-pages for my react sites, I followed a few tutorials & guides but had to give up after a few failed attempts . It's not that the tutorials were wrong, it's just that they didn't address & explain the hidden quirks very well.

After a while I somehow figured it out and felt the need to jot it down in order to save hassle for others. In this tutorial first we are going to create a React.js site with **create-react-app**, then we are going to configure gh-pages to host it GitHub and then finally deploy it on GitHub.

Alright! so let's get started.

> Note: You need to have [node.js](https://nodejs.org/en/), npm, [git](https://git-scm.com/) installed on your machine.

# Scaffold a react.js website

Go to the root directory where you want to create the site. Then cd into that folder in your CLI and type the following command:

```bash
$ npx create-react-app github-hosted-react-site
```

When your react site is done scaffolding, cd into your project folder:

```bash
$ cd github-hosted-react-site
```

Now to preview your React.js Site fire up the local server:

```bash
$ npm start
```

In your browser at [http://localhost:3000/](http://localhost:3000/) you'll see a template react site. For brevity we are not modifying this and will be deploying this template site.

# Make a production build

> Note: before doing anything in the CLI make sure you kill any running server. Usually done with CTRL+C

To deploy our site on GitHub we just have to compile all the React code and place it in the root of a directory somewhere, all you need to do is run the following line:

```bash
$ npm run build
```

Now we have a production build ready to be deployed.

# Configure gh-pages

> Note: before doing anything in the CLI make sure you kill any running server. Usually done with CTRL+C

Now install gh-pages & save it as a dependency in our project:

```bash
$ npm i -s gh-pages
```

Now add a **homepage** field to the **package.json** file that has the URL we want our app to be live on. With the homepage field we can control where the final site should be hosted on our repo.

```json
 "homepage": "https:/your-username.github.io/github-hosted-react-site/"
```

Now initialize the project folder as a git repository with:

```bash
$ git init
```

Having accomplished it, now add a remote of the repository whose gh-pages URL you are aiming for.

```bash

$ git remote add origin https:/github.com/your-username/github-hosted-react-site

```

This is necessary as for **gh-pages** to identify which repo to use as a **target**, that repo shall be added as a **remote** in your local one. The **homepage** field is just for the **URL purpose**.

> _Note_: The url which you added as a remote is the url of the master branch of your repository.

Now, move into the **package.json** file and add the following scripts above all other:

```json

"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -b master -d build"
}

```

_Note_ : Here focus on the deploy command. This says to gh-pages with the -b flag that our master branch will be used to deploy with the -d flag, the build folder which has our compiled, production ready code. The **"-b master"** is necessary as gh-pages by default deploys to the gh-pages branch. Even if you don't have one in your repository it will create one for you and then use it for the deployment process. Now you'll wonder what's wrong in deploying to the **gh-pages** branch. So remember which url we added as a remote for our local repo? It was the master branch's url. All the branches on GitHub have different URLs. Similarly, the default gh-pages url has a different url than the master branch. In our case it's [https://github.com/your-username/github-hosted-react-site/tree/gh-pages](#) . So if you don't include the **-b master** thing in the deploy field you'll see a 404 once you deploy as the gh-pages is deploying on the gh-pages branch while the site url is of the master branch. So it's like aiming at one thing & shooting at other.

> However, in case you want to host your site on the gh-pages branch, just remove the **-b master** part from the deploy field. Also, do not forget to add the url of your gh-pages as a git remote in your local repo. The homepage field remains unchanged.

# Phew, Now Let's Deploy.

Create a build with:

```bash
$ npm run build
```

Then deploy with:

```bash
$ npm run deploy
```

And we are done! Now your site will be available at [https://your-username.github.io/github-hosted-react-site/](#).

In case this doesn't work for you do let me know in the comments what problem you are facing. I'll try to help if I can.

> You need to be very careful when using routing in your react site. There are a few things to take care of like whether the router you are using, uses the history-api or not. Maybe we'll cover it on some other day.
