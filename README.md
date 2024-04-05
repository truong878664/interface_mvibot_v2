# <strong>Mvibot interface v2 - config ubuntu 20.04</strong>

# <strong>Install git</strong>

Check version Git

```bash
git --version
```

If you receive output similar to the following, then Git is already installed.

```bash
Output
git version 2.25.1
```

---

install Git

```bash
sudo apt update
```

```bash
sudo apt install git
```

# <strong>Install PHP</strong>

https://computingforgeeks.com/how-to-install-php-on-ubuntu-linux-system/

```bash
sudo apt -y upgrade
```

```bash
sudo apt update
```

```bash
sudo apt install lsb-release ca-certificates apt-transport-https software-properties-common -y
```

```bash
sudo add-apt-repository ppa:ondrej/php
```

```bash
sudo apt install php8.1
```

```bash
sudo apt install php8.1-mysql
```

```bash
sudo apt install php8.1-mbstring
```

```bash
sudo apt install php8.1-common
```

```bash
sudo apt install php8.1-xml
```

```bash
sudo apt install php8.1-curl
```

You will be prompted to confirm installation by typing Y and then ENTER.

# <strong>Install composer</strong>

Download the PHP Composer installer script by utilizing the following “curl” command:

```bash
cd ~
curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
```

Verify the hash of the downloaded PHP composer script with the signatures present at the official page:

```bash
HASH = `curl -sS https://composer.github.io/installer.sig`;
```

Then, validate if the PHP Composer installer can be safely executed or not:

```bash
php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
```

After verifying the installer, install PHP Composer on Ubuntu 22.04 by utilizing the following command:

```bash
sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
```

To test your installation, run:

```bash
composer;
```

```bash
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

```bash
sudo apt update
```

```bash
sudo apt install mysql-server
```

-   Configuring MySQL

Run the security script with sudo:

```bash
sudo mysql_secure_installation
```

Enter your new password
<br>
Enter <strong>Y</strong> to continue the script:

MySQL creates a root user account which you can use to manage your database

-   Creating a Dedicated MySQL User and Granting Privileges

```bash
sudo mysql -u root -p
```

Enter your password...

A prompt displays like the one below once you log in.

```bash
mysql>
```

To create a database with the name tutorial_database, type the following command.

```bash
CREATE DATABASE IF NOT EXISTS mvibot_database;
```

Create new user

```bash
CREATE USER 'mvibot'@'localhost' IDENTIFIED BY 'Mvibot@v1';
```

```bash
GRANT ALL PRIVILEGES ON *.* TO 'mvibot'@'localhost' WITH GRANT OPTION;
```

```bash
FLUSH PRIVILEGES;
```

```bash
exit;
```

# <strong> Add C++ -> MySql </strong>

```bash
apt-get install libmysqlcppconn-dev
```

```bash
sudo apt-get install libmysqlcppconn-dev
```

---

# <strong>Download source code</strong>

Download the files above and place on your server.
create folder

# Config apache2

-   Download source code

```bash
cd /var/www/html/
sudo git clone https://github.com/truong878664/interface_mvibot_v2.git
```

-   Tạo file `.htaccess` tại public của dự án.

```bash
sudo touch interface_mvibot_v2/public/.htaccess;
```

```bash
# .htaccess
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.php$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule . /index.php [L]
</IfModule>
```

-   Tạo 1 máy chủ ảo cho dự án

```bash
sudo nano /etc/apache2/sites-available/interface_mvibot_v2.conf
```

```bash
# interface_mvibot_v2.conf
<VirtualHost *:80>
   ServerAdmin mvibot@10.0.3.40
   ServerName 10.0.3.40
   ServerAlias 10.0.3.40
   DocumentRoot /var/www/html/interface_mvibot_v2/public

   <Directory /var/www/html/interface_mvibot_v2>
         Options Indexes FollowSymLinks
         AllowOverride All
         Require all granted
   </Directory>

   ErrorLog ${APACHE_LOG_DIR}/error.log
   CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

-   Cấp quyền cho project

```bash
  sudo chgrp -R www-data /var/www/html/interface_mvibot_v2/
  sudo chmod -R 775 /var/www/html/interface_mvibot_v2/storage
```

-   Vô hiệu hóa conf cũ của apache2

```bash
   sudo a2dissite 000-default.conf

   #hoặc project đang chạy trên apache2
   sudo a2dissite interface_mvibot_v2.conf
```

-   kích hoạt máy chủ ảo và module **`rewrite`**

```bash
   sudo a2ensite interface_mvibot_v2.conf
   sudo a2enmod rewrite
```

-   Restart lại Apache2

```bash
sudo systemctl restart apache2
```

-   Chạy dự án xem được chưa nếu gặp lỗi phiên bản php thì chạy thêm

```bash
sudo apt-get install libapache2-mod-php8.2
#tùy thuộc vào từng phiên bản php để chạy
```

# <strong>Environment Files</strong>

You must rename file <strong>.env.example</strong> to just <strong>.env</strong> -->

```bash
cd /var/www/html/interface_mvibot_v2/;
```

```bash
sudo mv .env.example .env;
```

# <strong>Composer</strong>

Laravel project dependencies are managed through the PHP Composer tool. The first step is to install the depencencies by navigating into your project in terminal and typing this command:

```bash
sudo composer update
```

```bash
sudo composer install
```

# <strong>Artisan Commands</strong>

The first thing we are going to do is set the key that Laravel will use when doing encryption.

```bash
sudo php artisan key:generate
```

# <strong>Clear cache</strong>

```bash
sudo php artisan config:clear
sudo php artisan cache:clear
```

# <strong>Create table database</strong>

```bash
sudo php artisan migrate
```

# <strong>Create User admin</strong>

```bash
sudo php artisan db:seed
```

# <strong>Run Project</strong>

```bash
sudo php artisan serve
```

# <strong>Open link</strong>

```bash
ifconfig
```

Open link: http://127.0.0.1 or your pc and open the link in your browser.

User: admin <br>
Password: admin

#

```bash
cd /home/mvibot/Truong/project/interface_mvibot_v2
php artisan serve
```

```bash
roslaunch rosbridge_server rosbridge_websocket.launch
```

```bash
rosrun tf2_web_republisher tf2_web_republisher
```

```bash
rosrun map_server map_server maps/map22.yaml
```

---

run one file migrate: php artisan migrate --path=/database/migrations/2023_08_22_184035_create_start_table.php
