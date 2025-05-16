# About
<p>Simasda (Sistem Informasi Masjid Digital & Administrasi)</p>

<p>Admin</p>

![alt text](/public/admin/assets/images/image.png)


<p>Beranda</p>

![alt text](/public/admin/assets/images/image-fe.png)

# How To Install

- `laravel new nama-aplikasi`
- `pilih react`
- `npm install`
- `composer install`

# Running

- `npm run dev`
- `php artisan serve` 

# prequisit

- `php 8`
- `node js`
- `mysql / sqlite`
- `psql`
- `mamp/xampp`
- `di ubuntu sesuaikan`

# Struktur

```bash
.
├── app
│   ├── Http
│   ├── Models
│   └── Providers
├── artisan
├── bootstrap
│   ├── app.php
│   ├── cache
│   └── providers.php
├── components.json
├── composer.json
├── composer.lock
├── config
│   ├── app.php
│   ├── auth.php
│   ├── cache.php
│   ├── database.php
│   ├── filesystems.php
│   ├── inertia.php
│   ├── logging.php
│   ├── mail.php
│   ├── queue.php
│   ├── services.php
│   └── session.php
├── database
│   ├── database.sqlite
│   ├── factories
│   ├── .gitignore
│   ├── migrations
│   └── seeders
├── .editorconfig
├── .env
├── .env.example
├── eslint.config.js
├── .git
│   ├── branches
│   ├── COMMIT_EDITMSG
│   ├── config
│   ├── description
│   ├── HEAD
│   ├── hooks
│   ├── index
│   ├── info
│   ├── logs
│   ├── objects
│   └── refs
├── .gitattributes
├── .github
│   └── workflows
├── .gitignore
├── package.json
├── package-lock.json
├── phpunit.xml
├── .prettierignore
├── .prettierrc
├── public
│   ├── apple-touch-icon.png
│   ├── build
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── .htaccess
│   ├── index.php
│   ├── logo.svg
│   └── robots.txt
├── resources
│   ├── css
│   ├── js
│   └── views
├── routes
│   ├── auth.php
│   ├── console.php
│   ├── settings.php
│   └── web.php
├── storage
│   ├── app
│   ├── framework
│   └── logs
├── struktur-simasda.txt
├── tests
│   ├── Feature
│   ├── Pest.php
│   ├── TestCase.php
│   └── Unit
├── tsconfig.json
└── vite.config.ts

35 directories, 51 files

```

## Install Lib

```bash

npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome

```

```bash
composer require spatie/laravel-permission
```

- `php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"`
- `php artisan migrate`

```php
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles, HasUuids; // jika menggunakan uuid
}

```