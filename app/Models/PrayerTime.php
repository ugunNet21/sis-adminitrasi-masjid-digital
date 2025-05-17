<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PrayerTime extends Model
{
    protected $keyType    = 'string';
    protected $primaryKey = 'id';
    public $incrementing  = false;

    protected $fillable = [
        'id',
        'masjid_id',
        'date',
        'subuh',
        'dzuhur',
        'ashar',
        'maghrib',
        'isya',
    ];

    protected $casts = [
        'date'       => 'date',
        'subuh'      => 'datetime:H:i',
        'dzuhur'     => 'datetime:H:i',
        'ashar'      => 'datetime:H:i',
        'maghrib'    => 'datetime:H:i',
        'isya'       => 'datetime:H:i',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function masjid(): BelongsTo
    {
        return $this->belongsTo(Masjid::class, 'masjid_id', 'id');
    }
}
