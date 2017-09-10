This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Instructions
### Setup the server
You will need to deploy the server locally for the app to work. You can find it here: https://github.com/udacity/reactnd-project-readable-starter

(Installation instructions are included in the README.md of that repository)

### Start the client for development
The server url is hard coded in the file callApiMiddleware.js

For installing the app's packages, it is preferable to use yarn:
```
yarn
yarn start
```

You can also use npm:
```
npm install
npm run start
```

## Tech used
### Material
-   [Create React App](https://github.com/facebookincubator/create-react-app)
-   React
-   Redux
-   React router
    [Ant Design for React](https://ant.design): an UI library
-   [Tachyons](http://tachyons.io/): Create fast loading, highly readable, and 100% responsive interfaces with as little css as possible. 
-   [axios](https://github.com/mzabriskie/axios) (Promise based HTTP client for the browser and node.js)

### Tools
-   vscode (I included some configurations with the project and also recommended extensions)
-   prettier
-   eslint
-   flow (Well, it is my first time with flow and I used it only a little bit, maybe when I have more time I will use it more)

### Note to reviewer

I tried to use mapDispatchToProps as you recommended, then saw that it was adding a lot of noise in my files like:

```
CommentForm.propTypes = {
  author: PropTypes.string, // eslint-disable-line
  body: PropTypes.string, // eslint-disable-line
  comment: PropTypes.object.isRequired,
  error: PropTypes.string, // eslint-disable-line
  postId: PropTypes.string.isRequired,

  changeField: PropTypes.func.isRequired,
  destroyForm: PropTypes.func.isRequired,
  initializeForm: PropTypes.func.isRequired,
  toggleCommentForm: PropTypes.func.isRequired,
  newComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
}

export default connect(({form}) => ({...form}), {
  changeField,
  destroyForm,
  initializeForm,
  toggleCommentForm,
  newComment,
  editComment,
})(CommentForm)
```
So I kept it the way I was doing it.

It is all I have to say, happy reading.
