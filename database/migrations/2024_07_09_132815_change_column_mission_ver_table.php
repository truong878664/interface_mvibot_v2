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
        Schema::table('missions_ver', function (Blueprint $table) {
            $table->boolean('locked')->default(false)->after('type');
            $table->boolean('deleted')->default(false)->after('type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('missions_ver', function (Blueprint $table) {
            $table->dropColumn('locked');
            $table->dropColumn('deleted');
        });
    }
};
