<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Obituary extends Model
{
    protected $keyType    = 'string';
    protected $primaryKey = 'id';
    public $incrementing  = false;

    protected $fillable = [
        'id',
        'masjid_id',
        'name',
        'date_of_death',
        'burial_location',
        'family_contact',
        'notes',
    ];

    protected $casts = [
        'date_of_death' => 'date',
        'created_at'    => 'datetime',
        'updated_at'    => 'datetime',
    ];

    public function masjid(): BelongsTo
    {
        return $this->belongsTo(Masjid::class, 'masjid_id', 'id');
    }
}
