# Mvibot interface v2

### Download

Download the files above and place on your server.

### Environment Files

You must rename this file to just .env

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
