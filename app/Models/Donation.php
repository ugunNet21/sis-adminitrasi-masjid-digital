<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Donation extends Model
{
    protected $keyType    = 'string';
    protected $primaryKey = 'id';
    public $incrementing  = false;

    protected $fillable = [
        'id',
        'user_id',
        'masjid_id',
        'amount',
        'type',
        'payment_method',
        'status',
        'proof_url',
    ];

    protected $casts = [
        'amount'     => 'decimal:2',
        'type'       => 'string',
        'status'     => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function masjid(): BelongsTo
    {
        return $this->belongsTo(Masjid::class, 'masjid_id', 'id');
    }
}
