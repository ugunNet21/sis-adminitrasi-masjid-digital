<?php
namespace App\Http\Controllers\Admin;

// app/Http/Controllers/Admin/UserController.php

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    // Get all users
    public function index(Request $request)
    {
        $search = $request->input('search');

        $users = User::with('roles')
            ->when($search, fn($query) =>
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('username', 'like', "%{$search}%");
                })
            )
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('users/index', [
            'users'   => $users,
            'filters' => $request->only(['search']),
        ]);
    }

    // get users with api
    public function apiIndex()
    {
        $users = User::with('roles')->paginate(10);
        return response()->json($users);
    }
    public function create()
    {
        return Inertia::render('users/create', [
            'roles' => Role::all(),
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('users/edit', [
            'user'  => $user->load('roles'),
            'roles' => Role::all(),
        ]);
    }

    // Create new user
    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'required|string|max:255',
            'username'  => 'required|string|max:255|unique:users',
            'email'     => 'required|string|email|max:255|unique:users',
            'password'  => ['required', 'confirmed', Rules\Password::defaults()],
            'phone'     => 'nullable|string|max:20',
            'roles'     => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        $user = User::create([
            'name'      => $request->name,
            'username'  => $request->username,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
            'phone'     => $request->phone,
            'is_active' => $request->is_active ?? true,
        ]);

        if ($request->has('roles')) {
            $roles = Role::whereIn('id', $request->roles)->pluck('name');
            $user->syncRoles($roles);
        }

        return Inertia::location('/users');

    }

    // Get single user
    public function show(User $user)
    {
        return response()->json($user->load('roles'));
    }

    // Update user
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name'      => 'sometimes|string|max:255',
            'username'  => 'sometimes|string|max:255|unique:users,username,' . $user->id,
            'email'     => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'password'  => ['sometimes', 'confirmed', Rules\Password::defaults()],
            'phone'     => 'nullable|string|max:20',
            'roles'     => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        $data = $request->only(['name', 'username', 'email', 'phone', 'is_active']);

        if ($request->has('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        if ($request->has('roles')) {
            $roles = Role::whereIn('id', $request->roles)->pluck('name');
            $user->syncRoles($roles);
        }

        return Inertia::location('/users');
    }

    // Delete user
    public function destroy(User $user)
    {
        $user->delete();
        return Inertia::location('/users');

    }

    // Get user roles
    public function roles()
    {
        $roles = Role::all();
        return response()->json($roles);
    }
}
