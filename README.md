# Mvibot interface v2

### Install git ubuntu

check version git

```tsx
git --version
```

If you receive output similar to the following, then Git is already installed.

```tsx
Output
git version 2.25.1
```

---

```tsx
sudo apt update
sudo apt install git
```

### Install PHP

```tsx
sudo apt update
```

```tsx
sudo apt install php-cli unzip
```

You will be prompted to confirm installation by typing Y and then ENTER.

### Install composer

```tsx
cd ~
curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php

HASH=`curl -sS https://composer.github.io/installer.sig`

php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer

```

To test your installation, run:

```tsx
composer;
```

### Install mySql

sudo apt update

sudo apt install mysql-server

sudo apt install mysql-server

### Download source code

Download the files above and place on your server.
create folder

```tsx
mkdir mvibotApp

cd mvibotApp

git clone https://github.com/truong878664/interface_mvibot_v2
```

### Environment Files

You must rename file .env.example to just .env

### Composer

Laravel project dependencies are managed through the PHP Composer tool. The first step is to install the depencencies by navigating into your project in terminal and typing this command:

```tsx
composer install
```

### Create Database

You must create your database on your server and on your .env file update the following lines:

```tsx
DB_CONNECTION = mysql;
DB_HOST = localhost;
DB_PORT = 3306;
DB_DATABASE = name_database;
DB_USERNAME = username_database;
DB_PASSWORD = password_database;
```

Change these lines to reflect your new database settings.

### Create User admin

```tsx
php artisan db:seed
```

### Artisan Commands

The first thing we are going to do is set the key that Laravel will use when doing encryption.

```tsx
php artisan key:generate
```

### Clear cache

```tsx
php artisan config:clear
php artisan cache:clear
```

### Create table database

```tsx
php artisan migrate
```

### Run Project

```tsx
php artisan serve
```
