<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shipment extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    /**
     * Get the supplier that owns the Shipment
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'id');
    }

    /**
     * Get all of the rawGoods for the Shipment
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function rawGoods(): HasMany
    {
        return $this->hasMany(RawGood::class, 'shipment_id', 'id');
    }

    protected function casts(): array
    {
        return [
            'shipment_date' => 'datetime:Y/m/d',
        ];
    }
}
