<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('obituaries', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('masjid_id');
            $table->string('name', 100);
            $table->date('date_of_death');
            $table->string('burial_location', 255)->nullable();
            $table->string('family_contact', 100)->nullable();
            $table->text('notes')->nullable();
            $table->foreign('masjid_id')->references('id')->on('masjids')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('obituaries');
    }
};
