<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    protected $fillable = [
    'airline_id',
    'from_city',
    'to_city',
    'departure_time',
    'arrival_time',
    'price'
];

public function airline()
{
    return $this->belongsTo(Airline::class);
}

}
