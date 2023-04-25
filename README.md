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

```
# Update package lists
sudo apt-get update

# Install Node.js and npm
sudo apt-get install nodejs npm

# Install serve globally (if not already installed)

```sh
npm install -g serve
```

### Step 2: Clone the repository

```
# Clone the repository
git clone https://github.com/bscuron/bucketlist.git
```

### Step 3: Install dependencies

```
# Change directory to the project folder
cd bucketlist

# Install project dependencies

```sh
npm install
```

### Step 4: Run the project

```
# Start the development server

```sh
npm run start
```


This will start the ReactJS development server, and you can access the project in your web browser at `http://localhost:3000` or any other port mentioned in the `serve` command.



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
