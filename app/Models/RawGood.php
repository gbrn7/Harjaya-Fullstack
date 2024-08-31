<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RawGood extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get the shipment that owns the RawGood
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function shipment(): BelongsTo
    {
        return $this->belongsTo(Shipment::class, 'shipment_id', 'id');
    }

    /**
     * Get the rawGoodsType that owns the RawGood
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function rawGoodsType(): BelongsTo
    {
        return $this->belongsTo(Raw_Goods_Type::class, 'raw_goods_type_id', 'id');
    }
}
