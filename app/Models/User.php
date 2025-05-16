<?php
namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{

    use HasFactory, Notifiable, HasUuids, HasRoles;
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'email_verified_at',
        'last_login_ip',
        'last_login_time',
        'login_count',
        'key_status',
        'slug',
        'foto_profile',
        'phone',
        'avatar_url',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'last_login_time'   => 'datetime',
            'password'          => 'hashed',
            'is_active'         => 'boolean',
            'login_count'       => 'integer',
        ];
    }
    public function getIsActiveAttribute($value)
    {
        return (bool) $value;
    }
    public function getAuthIdentifierName()
    {
        return 'email';
    }
}
