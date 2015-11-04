# kandy-redux
Module for providing a Redux interface to use Kandy.


## How to use:

 - You will have to reference your local KandyJS repo as a dependency until Kandy is on NPM.
  - `cd /path/to/Kandy.js/`
  - `npm link`
  - `cd /back/to/kandy-redux/`
  - `npm link kandy-js`
 - To use kandy-redux in your project, you should reference it in your project using npm link since you'll likely be developing kandy-redux in parallel.
  - `npm link`
  - `cd /path/to/yourProject/`
  - `npm link kandy-redux`

## How to Develop

 - Link your Kandy.js repo as stated in "How to use"
 - `npm install`

## Contributing

It's important to pull and push changes regularly so that we don't fall out of sync. As of this writing, two projects will be using this package and will have to add features to it. That means we need to make sure to pay attention to what the other team is doing.

When you have added a feature to kandy-redux, you should create an appropriately named branch for it and push it to Github. You should then create a Pull Request for that branch. Please do not push directly to `develop`.
