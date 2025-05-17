<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sermon extends Model
{
    protected $keyType = 'string';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'masjid_id',
        'title',
        'speaker',
        'date',
        'video_url',
        'audio_url',
        'notes',
    ];

    protected $casts = [
        'date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function masjid(): BelongsTo
    {
        return $this->belongsTo(Masjid::class, 'masjid_id', 'id');
    }
}
