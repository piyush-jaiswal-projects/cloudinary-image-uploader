# Cloudinary Image Uploader - Version 1.0
This webapp helps you to easily upload images to cloud(cloudinary) and generates the URL to share your images easily.
We are continuously working to upgrade this web app and will soon come up with newer versions with more features and better user experience.

We welcome open source contributions to this repo. So feel free to raise an issue or generate PR if you find any bug.

## You can use it either locally or as webapp deployed on vercel

1. [WebApp](https://picupcloud.vercel.app/)
This is the simplest way if you just want to upload images and get URL. Simply enter preset and cloud name of your FREE [cloudinary](https://cloudinary.com/) account. Choose image file, and click upload to generate URL.

3. Local Setup
If you want to use it locally, then simple fork and then clone this repo. Run command `npm install`.
Create .env file in root directory and add following to it:
### REACT_APP_UPLOAD_PRESET=enter your preset name
### REACT_APP_CLOUD_NAME=enter your cloud name
And then run command `npm start` to start using this web app locally.

## How to generate Preset Name and Cloud Name in Cloudinary?
- To get the required details, signup on cloudinaryfor FREE
- Click on Dashboard present on right side of console, and you will find Cloud Name under "Product Environment Credentials"
- To get preset, click on "setings icon" at bottom left. And then go to "Upload" section present on left side bar.
- Scroll down to upload preset section. Click "Add upload Preset". Enter preset name and click "Save"
          

This project was bootstrapped with [Create React App].

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

### `npm run build`

Builds the app for production to the `build` folder.\


## Developed by PIYUSH JAISWAL
