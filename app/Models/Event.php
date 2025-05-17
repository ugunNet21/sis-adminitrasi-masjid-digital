<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    protected $keyType    = 'string';
    protected $primaryKey = 'id';
    public $incrementing  = false;

    protected $fillable = [
        'id',
        'masjid_id',
        'title',
        'description',
        'start_time',
        'end_time',
        'location',
        'photo_url',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time'   => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function masjid(): BelongsTo
    {
        return $this->belongsTo(Masjid::class, 'masjid_id', 'id');
    }
}
