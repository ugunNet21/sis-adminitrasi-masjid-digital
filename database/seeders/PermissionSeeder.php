<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    private const PERMISSIONS = [
        'view_dashboard',
        'manage_users',
        'manage_finance',
        'manage_activities',
        'manage_inventory',
        'manage_khotbah',
        'manage_jadwal',
        'view_reports',
        'generate_reports',
        'manage_configuration',
        'manage_roles',
    ];

    private const ROLE_PERMISSIONS = [
        'Super Admin' => [
            'view_dashboard',
            'manage_users',
            'manage_finance',
            'manage_activities',
            'manage_inventory',
            'manage_khotbah',
            'manage_jadwal',
            'view_reports',
            'generate_reports',
            'manage_configuration',
            'manage_roles',
        ],
        'Admin Masjid' => [
            'view_dashboard',
            'manage_users',
            'manage_finance',
            'manage_activities',
            'manage_inventory',
            'manage_khotbah',
            'manage_jadwal',
            'view_reports',
            'generate_reports',
        ],
        'Bendahara' => [
            'view_dashboard',
            'manage_finance',
            'view_reports',
            'generate_reports',
        ],
        'Sekretaris' => [
            'view_dashboard',
            'manage_activities',
            'manage_khotbah',
            'manage_jadwal',
        ],
        'Takmir' => [
            'view_dashboard',
            'manage_activities',
            'manage_inventory',
            'view_reports',
        ],
        'Imam' => [
            'view_dashboard',
            'manage_khotbah',
            'manage_jadwal',
        ],
        'Muadzin' => [
            'view_dashboard',
            'manage_jadwal',
        ],
        'Jamaah' => [
            'view_dashboard',
        ],
    ];

    /**
     * Seed the permissions table and assign permissions to roles.
     */
    public function run(): void
    {
        $this->createPermissions();
        $this->assignPermissionsToRoles();
    }

    /**
     * Create permissions if they don't exist.
     */
    private function createPermissions(): void
    {
        foreach (self::PERMISSIONS as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
    }

    /**
     * Assign permissions to each role based on predefined rules.
     */
    private function assignPermissionsToRoles(): void
    {
        foreach (self::ROLE_PERMISSIONS as $roleName => $permissions) {
            $role = Role::findByName($roleName);
            $role->givePermissionTo(
                $roleName === 'Super Admin' ? Permission::all() : $permissions
            );
        }
    }
}