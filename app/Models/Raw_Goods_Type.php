<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Raw_Goods_Type extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "raw_goods_types";
    protected $guarded = [];

    /**
     * Get all of the raw_goods for the raw_goods_type
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function raw_goods(): HasMany
    {
        return $this->hasMany(RawGood::class, 'id', 'raw_goods_type_id');
    }
}
