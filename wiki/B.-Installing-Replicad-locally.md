When you want to use Replicad you can go to the website https://studio.replicad.xyz/workbench. Here you can edit and run your script. However, it depends on having an internet connection and on the external server running. If you prefer to run the application locally you have two options, namely installing the program directly as a web-application or installing it from the source on the github page. 

=== B.1 Running Replicad Studio as a webapplication

Running the Replicad studio as a web application is extremely easy. For this to work you need to use the Chrome web browser that is available at https://www.google.com/chrome/.  Open the website https://studio.replicad.xyz/workbench in Chrome browser and look for the icon in your browser to install the application as a socalled Progressive Web Application (PWA). 

image::/images/install_webapp.png[]

When you click this icon, a small application is installed on your computer. For MacOs the location is in your home directory in the folder `Applications\Chrome Apps\`. If you want to manage the apps, go to the address `chrome://apps`. Here you see all applications that are installed in the Chrome browser. You can create a shortcut to the app and indicate whether the app should run inside the browser or in a separate window. The last option is enabled by default. If you want to remove the application you can use the same address. 

image::/images/manage_pwa.png[]

Google describes a Progressive Web App as follows: 

> A Progressive Web App (PWA) is an app built for the web that provides an experience similar to a mobile app. PWAs are fast and offer many of the features available on mobile devices. For example, they can work offline and send notifications. 

There is also a warning that not all applications might be fully functional without an internet connection. In case of Replicad it seems to work. 

[NOTE]
====
In the version of September 2023 there are some issues noticeable when working for a longer period without internet connection. The editor window of the workbench no longer functions (on Windows OS) and the visualizer no longer reacts automatically upon changes of the source file. Restarting the visualizer is a workaround. 
====

=== B.2 Install local server

Replicad is an open source project that you can download completely from the github website https://github.com/sgenoud/replicad. The application is written in javascript, so it cannot be compiled to an executable directly. Instead you have to take the files and run it as if it were a website. One approach to achieve this is as follows: 

1. Go to the website https://nodejs.org/en and download the version of `nodejs` that is valid for your operating system. 
2. Install the nodejs platform on your computer. When the installation is complete you will see a dialog that both `nodejs` and `npm` are installed on your computer. `nodejs` is an open-source, cross-platform JavaScript runtime environment. `npm` is a package manager for `nodejs` javascript packages. The company is now owned by Github which in turn is owned by Microsoft. 
3. Download the source code of Replicad from the github page. You can do this either using `git` (when you use the terminal window and have `git` installed you can issue the command `git clone git@github.com:sgenoud/replicad.git`) or by downloading the git repository in a large zip-file.  
+
image::/images/download_repository.png[]
+
4. Unpack the zip file somewhere in your home directory, creating a new folder. Within this folder, go to a folder that contains the code for the `studio`. Copy the folder called `studio` somewhere else in your home directory. 
5. Open a terminal windows and issue the following commands: 

``` sh
cd studio
npm install
npm start
```

The first command only works if you have placed the folder with the source code directly in your home directory. Else you have to issue the `cd` command with the complete path to the folder location. The next command, `npm install` starts the building and installing process for the application. It uses the file `package.json` in the folder where the command is issued to determine which actions should be performed. Installing the application can take quite some while. Just wait patiently until the process is completed. Then issue the next command `npm start`. This command starts the webserver with the application that you just created. You can open a browser window with the address http://localhost:5555/ . (If you want to go to the workbench directly, enter the address `http://localhost:5555/workbench`). You can also use the shortcut from the terminal window by pressing the `o`-key. 

You have to keep your terminal window open. 

image::/images/npm_start.png[]

When you want to stop the application you can issue ```ctrl```-```c``` in the terminal window or use the shortcut ```q```-key. At first it might seem that you browser window is still working, but as soon as you refresh the page you will receive the message that the website is no longer responding. 

[CAUTION]
====
There is a large difference in required file size between the two methods to run replicad locally. When you use the Progressive Web Application in Google Chrome, a small app of about 1.8 Mbyte is added to your file system. When you download the code of Replicad, the complete source code fits in an archive (zip-format) of 6.9 Mbyte. When you extract the directory `studio` this has a size of almost 30 Mbyte. After building the application using `Nodejs` and `npm` the directory has a size of 471 Mbyte!
====

