<?php
// routes/web
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // for page / inertia
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Inertia Pages
    Route::get('/users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [\App\Http\Controllers\Admin\UserController::class, 'create'])->name('users.create');
    Route::get('/users/{user}/edit', [\App\Http\Controllers\Admin\UserController::class, 'edit'])->name('users.edit');

    // API Resource
    Route::apiResource('users', \App\Http\Controllers\Admin\UserController::class)->except(['index', 'create', 'edit']);

    Route::get('users/roles', [\App\Http\Controllers\Admin\UserController::class, 'roles']);
    Route::get('/roles', [\App\Http\Controllers\Admin\RoleController::class, 'index'])->name('roles.index');
    Route::get('/masjids', [\App\Http\Controllers\Admin\MasjidController::class, 'index'])->name('masjids.index');
    Route::get('/prayer-times', [\App\Http\Controllers\Admin\PrayerTimeController::class, 'index'])->name('prayer-times.index');
    Route::get('/events', [\App\Http\Controllers\Admin\EventController::class, 'index'])->name('events.index');
    Route::get('/sermons', [\App\Http\Controllers\Admin\SermonController::class, 'index'])->name('sermons.index');
    Route::get('/donations', [\App\Http\Controllers\Admin\DonationController::class, 'index'])->name('donations.index');
    Route::get('/financial-reports', [\App\Http\Controllers\Admin\FinancialReportController::class, 'index'])->name('financial-reports.index');
    Route::get('/obituaries', [\App\Http\Controllers\Admin\ObituaryController::class, 'index'])->name('obituaries.index');

    // api
    Route::get('api/users', [\App\Http\Controllers\Admin\UserController::class, 'apiIndex']);

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
