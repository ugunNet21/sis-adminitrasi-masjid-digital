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
        Schema::create('sermons', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('masjid_id');
            $table->string('title', 255);
            $table->string('speaker', 100);
            $table->dateTime('date');
            $table->string('video_url', 255)->nullable();
            $table->string('audio_url', 255)->nullable();
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
        Schema::dropIfExists('sermons');
    }
};
