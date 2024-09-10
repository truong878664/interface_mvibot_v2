<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sounds', function (Blueprint $table) {
            $table->string('href')->after('id');
            $table->string('name')->after('id');
            $table->enum('type', ['system', 'custom'])->default('custom')->after('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sounds', function (Blueprint $table) {
            $table->dropColumn('href');
            $table->dropColumn('name');
            $table->dropColumn('type');
        });
    }
};
