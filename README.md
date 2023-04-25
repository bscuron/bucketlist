# Bucketlist

Demo: [https://cis-linux2.temple.edu/bucketlist](https://cis-linux2.temple.edu/bucketlist)

<p align="center">
  <img width="30%" src="./assets/AppIconbucketList.png" alt="alt text">
</p>

## Welcome to Bucketlist!

Check off and complete your wish list with friends, and keep all your memory without regret.

Bucketlist provides the ability to create an interactive list of activities you may want to accomplish. With this list, you can connect with old and new friends to complete these activities and live a more fulfilled life. Many times, we want to do things but never do them. Bucketlist is intended to get people out and to accomplish their goals. With the help of social connection and common interests, users can connect and live the life they want to live instead of daydreaming but never doing.

Through social connection and event tracking and planning we can all reach our goals. Not only will your upcoming events be available on your bucket list, you can also view your friends upcoming events too! We hope you can check off your list and try fun activities you might not have thought about!

## Install

### Step 1: Install dependencies

- [Node.js](https://nodejs.org/en/download)
- [npm](https://nodejs.org/en/download) (Installed with Node.js)

### Step 2: Clone the repository

```sh
git clone https://github.com/bscuron/bucketlist.git
```

### Step 3: Install node modules

```sh
cd bucketlist && npm install
```

### Step 4: Run the project locally

```sh
npm run start
```

This will start the locally hosted development server, and you can access the project in your web browser at `http://localhost:19006`.

### Step 5: Run the project on server

```sh
npm run serve
```

This will start the production server, and the project will be served on port 19006.

## Uninstall

### Step 1: Stop the server

If the application is currently running on a server, make sure to stop it before uninstalling.

### Step 2: Delete the project folder

You can simply delete the project folder where you cloned the repository. If you are using a Unix-like operating system, you can use the following command to delete the project folder:

```
rm -rf bucketlist
```

This will delete the entire `bucketlist` folder and its contents, including the `package.json` file and all installed dependencies.

### Step 3: Uninstall global dependencies (optional)

If you have installed any dependencies globally using npm, you can uninstall them if they are no longer needed. For example, if you have installed `typescript` or `typedoc` globally, you can uninstall them using the following commands:

```sh
npm uninstall -g typescript
npm uninstall -g typedoc
```
