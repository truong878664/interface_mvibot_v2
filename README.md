# <strong>Mvibot interface v2 - config ubuntu 22.04</strong>

## <strong>Install git</strong>

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
sudo apt install git
```

## <strong>Install PHP</strong>

```tsx
sudo apt update
```

```tsx
sudo apt install --no-install-reco mmends php8.1
```

You will be prompted to confirm installation by typing Y and then ENTER.

## <strong>Install composer</strong>

```tsx
cd ~
curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
```

```tsx
HASH = `curl -sS https://composer.github.io/installer.sig`;
```

```tsx
php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
```

```tsx

sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
```

To test your installation, run:

```tsx
composer;
```

## <strong>Install mySql</strong>

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

---

## <strong>Download source code</strong>

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

## <strong>Environment Files</strong>

You must rename file <strong>.env.example</strong> to just <strong>.env</strong>

## <strong>Create Database</strong>

You must create your database on your server and on your .env file update the following lines:

```tsx
DB_CONNECTION = mysql;
DB_HOST = localhost;
DB_PORT = 3306;
DB_DATABASE = mvibot_database;
DB_USERNAME = root;
DB_PASSWORD = "your password sql";
```

Change these lines to reflect your new database settings.

## <strong>Composer</strong>

Laravel project dependencies are managed through the PHP Composer tool. The first step is to install the depencencies by navigating into your project in terminal and typing this command:

```tsx
cd interface_mvibot_v2
```

```tsx
composer install
```

## <strong>Artisan Commands</strong>

The first thing we are going to do is set the key that Laravel will use when doing encryption.

```tsx
php artisan key:generate
```

## <strong>Clear cache</strong>

```tsx
php artisan config:clear
php artisan cache:clear
```

## <strong>Create table database</strong>

```tsx
php artisan migrate
```

## <strong>Create User admin</strong>

```tsx
php artisan db:seed
```

## <strong>Run Project</strong>

```tsx
php artisan serve
```

## <strong>Open link</strong>

open link: http://127.0.0.1:8000/ open the link in your browser
