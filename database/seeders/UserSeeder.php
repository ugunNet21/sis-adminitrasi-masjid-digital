<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    private const USERS = [
        [
            'name'     => 'Super Admin Masjid',
            'username' => 'superadmin',
            'email'    => 'superadmin@masjid.com',
            'password' => 'password',
            'role'     => 'Super Admin',
        ],
        [
            'name'     => 'Admin Masjid',
            'username' => 'admin',
            'email'    => 'admin@masjid.com',
            'password' => 'password',
            'role'     => 'Admin Masjid',
        ],
        [
            'name'     => 'Bendahara Masjid',
            'username' => 'bendahara',
            'email'    => 'bendahara@masjid.com',
            'password' => 'password',
            'role'     => 'Bendahara',
        ],
        [
            'name'     => 'Sekretaris Masjid',
            'username' => 'sekretaris',
            'email'    => 'sekretaris@masjid.com',
            'password' => 'password',
            'role'     => 'Sekretaris',
        ],
        [
            'name'     => 'Takmir Masjid',
            'username' => 'takmir',
            'email'    => 'takmir@masjid.com',
            'password' => 'password',
            'role'     => 'Takmir',
        ],
        [
            'name'     => 'Imam Masjid',
            'username' => 'imam',
            'email'    => 'imam@masjid.com',
            'password' => 'password',
            'role'     => 'Imam',
        ],
        [
            'name'     => 'Muadzin',
            'username' => 'muadzin',
            'email'    => 'muadzin@masjid.com',
            'password' => 'password',
            'role'     => 'Muadzin',
        ],
        [
            'name'     => 'Jamaah',
            'username' => 'jamaah',
            'email'    => 'jamaah@masjid.com',
            'password' => 'password',
            'role'     => 'Jamaah',
        ],
    ];

    /**
     * Seed the users table and assign roles.
     */
    public function run(): void
    {
        foreach (self::USERS as $userData) {
            $this->createUser($userData);
        }
    }

    /**
     * Create a user and assign their role if they don't already exist.
     */
    private function createUser(array $userData): void
    {
        // Check if user already exists by email or username
        $existingUser = User::where('email', $userData['email'])
            ->orWhere('username', $userData['username'])
            ->first();

        if ($existingUser) {
            // Optionally update the existing user's role if needed
            $existingUser->syncRoles([$userData['role']]);
            return;
        }

        $user = User::create([
            'name'              => $userData['name'],
            'username'          => $userData['username'],
            'email'             => $userData['email'],
            'email_verified_at' => now(),
            'password'          => Hash::make($userData['password']),
            'last_login_ip'     => null,
            'last_login_time'   => null,
            'login_count'       => 0,
            'key_status'        => null,
            'slug'              => Str::slug($userData['username']),
            'foto_profile'      => null,
            'phone'             => null,
            'avatar_url'        => null,
            'is_active'         => true,
        ]);

        $user->assignRole($userData['role']);
    }
}