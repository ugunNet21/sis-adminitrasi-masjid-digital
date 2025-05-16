<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    private const ROLES = [
        'Super Admin',
        'Admin Masjid',
        'Bendahara',
        'Sekretaris',
        'Takmir',
        'Imam',
        'Muadzin',
        'Jamaah',
    ];

    /**
     * Seed the roles table.
     */
    public function run(): void
    {
        foreach (self::ROLES as $role) {
            Role::firstOrCreate(['name' => $role]);
        }
    }
}