<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
    'flight_id',
    'customer_name',
    'customer_email',
    'number_of_passengers',
    'status'
];

public function flight()
{
    return $this->belongsTo(Flight::class);
}

}
