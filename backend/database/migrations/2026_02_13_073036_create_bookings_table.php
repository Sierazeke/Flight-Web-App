<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('flight_id')
                  ->constrained()
                  ->onDelete('cascade');

            $table->string('customer_name');
            $table->string('customer_email');

            $table->integer('number_of_passengers')->default(1);

            $table->enum('status', ['confirmed', 'cancelled'])
                  ->default('confirmed');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
