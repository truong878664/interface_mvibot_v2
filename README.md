```tsx
cd /home/mvibot/Truong/project/interface_mvibot_v2
php artisan serve
```

```tsx
roslaunch rosbridge_server rosbridge_websocket.launch
```

```tsx
rosrun tf2_web_republisher tf2_web_republisher
```

```tsx
cd maps
rosrun map_server map_server map30.yaml
```

---

# <strong>Mvibot interface v2 - config ubuntu 22.04</strong>

# <strong>Install git</strong>

Check version Git

```tsx
git --version
```

If you receive output similar to the following, then Git is already installed.

```tsx
Output
git version 2.25.1
```

---

install Git

```tsx
sudo apt update
```

```tsx
sudo apt install git
```

# <strong>Install PHP</strong>

https://computingforgeeks.com/how-to-install-php-on-ubuntu-linux-system/

```tsx
sudo apt -y upgrade
```

```tsx
sudo apt update
```

```tsx
sudo apt install lsb-release ca-certificates apt-transport-https software-properties-common -y
```

```tsx
sudo apt install php8.1
```

```tsx
sudo apt install php8.1-mysql
```

```tsx
sudo apt install php8.1-mbstring
```

```tsx
sudo apt install php8.1-common
```

```tsx
sudo apt install php8.1-xml
```

You will be prompted to confirm installation by typing Y and then ENTER.

# <strong>Install composer</strong>

Download the PHP Composer installer script by utilizing the following “curl” command:

```tsx
cd ~
curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
```

Verify the hash of the downloaded PHP composer script with the signatures present at the official page:

```tsx
HASH = `curl -sS https://composer.github.io/installer.sig`;
```

Then, validate if the PHP Composer installer can be safely executed or not:

```tsx
php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
```

After verifying the installer, install PHP Composer on Ubuntu 22.04 by utilizing the following command:

```tsx
sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
```

To test your installation, run:

```tsx
composer;
```

```tsx
   ______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                    /_/
Composer version 2.4.1 2022-08-20 11:44:50
```

# <strong>Install mySql</strong>

Reference link: https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-22-04

-   Installing MySQL

```tsx
sudo apt update
```

```tsx
sudo apt install mysql-server
```

```tsx
sudo apt install mysql-server
```

-   Configuring MySQL

Run the security script with sudo:

```tsx
sudo mysql_secure_installation
```

Enter your new password
<br>
Enter <strong>Y</strong> to continue the script:

MySQL creates a root user account which you can use to manage your database

-   Creating a Dedicated MySQL User and Granting Privileges

```tsx
sudo mysql
```

```tsx
mysql -u root -p
```

Enter your password...

A prompt displays like the one below once you log in.

```tsx
mysql>
```

To create a database with the name tutorial_database, type the following command.

```tsx
mysql> CREATE DATABASE IF NOT EXISTS mvibot_database;
```

```tsx
mysql > exit;
```

Create new user

```tsx
sudo mysql
```

```tsx
mysql > mysql -u root -p
```

```tsx
mysql > GRANT ALL PRIVILEGES ON *.* TO 'name_new_user'@'localhost' WITH GRANT OPTION;
```

```tsx
mysql > FLUSH PRIVILEGES;
```

# <strong> Add C++ -> MySql </strong>

```tsx
apt-get install libmysqlcppconn-dev
```

```tsx
sudo apt-get install libmysqlcppconn-dev
```

---

# <strong>Download source code</strong>

Download the files above and place on your server.
create folder

```tsx
mkdir mvibotApp
```

```tsx
cd mvibotApp
```

```tsx
git clone https://github.com/truong878664/interface_mvibot_v2.git
```

# <strong>Environment Files</strong>

<!-- Into the directory /mvibotApp/interface_mvibot_v2

press Ctrl + H

You must rename file <strong>.env.example</strong> to just <strong>.env</strong> -->

```tsx
cd / mvibotApp / interface_mvibot_v2;
```

```tsx
mv.env.example.env;
```

```tsx
gedit.env;
```

Update lines 11 to 16 as follows:

```tsx
DB_CONNECTION = mysql;
DB_HOST = localhost;
DB_PORT = 3306;
DB_DATABASE = mvibot_database;
DB_USERNAME = root;
DB_PASSWORD = "your password sql";
```

Change these lines to reflect your new database settings.

# <strong>Composer</strong>

Laravel project dependencies are managed through the PHP Composer tool. The first step is to install the depencencies by navigating into your project in terminal and typing this command:

```tsx
cd / mvibotApp / interface_mvibot_v2;
```

```tsx
composer update
```

```tsx
composer install
```

# <strong>Artisan Commands</strong>

The first thing we are going to do is set the key that Laravel will use when doing encryption.

```tsx
php artisan key:generate
```

# <strong>Clear cache</strong>

```tsx
php artisan config:clear
php artisan cache:clear
```

# <strong>Create table database</strong>

```tsx
php artisan migrate
```

# <strong>Create User admin</strong>

```tsx
php artisan db:seed
```

# <strong>Run Project</strong>

```tsx
php artisan serve
```

# <strong>Open link</strong>

open link: http://127.0.0.1:8000/ open the link in your browser

User: admin <br>
Password: admin
