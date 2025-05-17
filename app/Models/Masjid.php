<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Masjid extends Model
{
    protected $keyType    = 'string';
    protected $primaryKey = 'id';
    public $incrementing  = false;

    protected $fillable = [
        'id',
        'name',
        'address',
        'city',
        'province',
        'description',
        'photo_url',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function prayerTimes(): HasMany
    {
        return $this->hasMany(PrayerTime::class, 'masjid_id', 'id');
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class, 'masjid_id', 'id');
    }

    public function sermons(): HasMany
    {
        return $this->hasMany(Sermon::class, 'masjid_id', 'id');
    }

    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class, 'masjid_id', 'id');
    }

    public function financialReports(): HasMany
    {
        return $this->hasMany(FinancialReport::class, 'masjid_id', 'id');
    }

    public function obituaries(): HasMany
    {
        return $this->hasMany(Obituary::class, 'masjid_id', 'id');
    }
}
