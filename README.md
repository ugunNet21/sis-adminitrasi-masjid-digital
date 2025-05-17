# Simasda (Sistem Informasi Masjid Digital & Administrasi)

Simasda is a web-based application built with Laravel and React, designed to streamline digital mosque management and administrative tasks. This project provides a robust solution for managing mosque-related information and operations efficiently.

## Screenshots

### Admin Dashboard
![Admin Dashboard](/public/admin/assets/images/image.png)

### Beranda (Homepage)
![Beranda](/public/admin/assets/images/image-fe.png)

## Prerequisites

Before setting up the project, ensure you have the following installed:
- PHP >= 8.2
- Node.js >= 16.x
- MySQL, SQLite, or PostgreSQL
- Composer
- MAMP/XAMPP (for Windows/macOS) or equivalent for Ubuntu/Linux
- Git

For Ubuntu users, ensure your environment is configured with the appropriate PHP extensions and database services.

## Installation

Follow these steps to set up the project locally:

1. **Create a new Laravel project**:
   ```bash
   laravel new simasda
   ```
   When prompted, select **React** as the frontend stack.

2. **Navigate to the project directory**:
   ```bash
   cd simasda
   ```

3. **Install PHP dependencies**:
   ```bash
   composer install
   ```

4. **Install JavaScript dependencies**:
   ```bash
   npm install
   ```

5. **Install additional libraries**:
   - Font Awesome for icons:
     ```bash
     npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome
     ```
   - Spatie Laravel Permission for role-based access control:
     ```bash
     composer require spatie/laravel-permission
     ```
     Publish the Spatie configuration:
     ```bash
     php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
     ```
     Run migrations to set up permission tables:
     ```bash
     php artisan migrate
     ```
   - Icon
     ```bash
     npm install @iconify/react @iconify-icons/mdi
     ```
     ```bash
     npm install react-icons
     ```
   - Fix Some Icon
     ```bash
     npm install lucide-react
     ```

6. **Configure the environment**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Generate an application key:
     ```bash
     php artisan key:generate
     ```
   - Configure your database connection in the `.env` file (e.g., MySQL, SQLite, or PostgreSQL).

## Running the Application

1. **Start the Vite development server**:
   ```bash
   npm run dev
   ```

2. **Start the Laravel server**:
   ```bash
   php artisan serve
   ```

The application will be available at `http://localhost:8000`.

## Project Structure

Below is an overview of the project's directory structure:

```bash
.
├── app
│   ├── Http            # Controllers, Middleware, Requests
│   ├── Models          # Eloquent Models
│   └── Providers       # Service Providers
├── bootstrap           # Application Bootstrapping
├── config              # Configuration Files
├── database
│   ├── factories       # Model Factories
│   ├── migrations      # Database Migrations
│   └── seeders         # Database Seeders
├── public              # Public Assets (images, favicon, etc.)
├── resources
│   ├── css             # CSS Files
│   ├── js              # JavaScript/TypeScript Files
│   └── views           # Blade Templates
├── routes
│   ├── auth.php        # Authentication Routes
│   ├── console.php     # Artisan Console Routes
│   ├── settings.php    # Settings Routes
│   └── web.php         # Web Routes
├── storage             # File Storage (logs, uploads)
├── tests               # Unit and Feature Tests
├── .env                # Environment Configuration
├── composer.json       # PHP Dependencies
├── package.json        # JavaScript Dependencies
├── tsconfig.json       # TypeScript Configuration
├── vite.config.ts      # Vite Configuration
└── artisan             # Laravel Artisan CLI
```

### Key Configuration Files
- **composer.json**: Defines PHP dependencies, including `laravel/framework`, `inertiajs/inertia-laravel`, `spatie/laravel-permission`, and `tightenco/ziggy`.
- **tsconfig.json**: Configures TypeScript for React JSX, with module resolution set to `bundler` and paths for `@/*` and `ziggy-js`.
- **.env**: Environment-specific settings (database, app key, etc.).

## Role-Based Access Control

The project uses `spatie/laravel-permission` for role-based access control. To enable this in the `User` model, add the `HasRoles` trait:

```php
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasRoles; // Add this trait
    // If using UUIDs, include: use HasUuids;
}
```

After running migrations, you can assign roles and permissions to users as needed.

## Development Scripts

The `composer.json` includes useful scripts:
- **Run development servers**:
  ```bash
  composer run dev
  ```
  This starts the Laravel server, queue listener, logs, and Vite concurrently.
- **Run tests**:
  ```bash
  composer run test
  ```
- **Run with SSR (Server-Side Rendering)**:
  ```bash
  composer run dev:ssr
  ```

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.