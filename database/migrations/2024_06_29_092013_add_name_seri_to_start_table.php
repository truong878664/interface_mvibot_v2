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
        Schema::table('start', function (Blueprint $table) {
            $table->string("name_seri");            
            $table->mediumText("position_with_toollift")->nullable()->change();
            $table->mediumText("position_no_toollift")->nullable()->change();
            $table->mediumText("mission_go_to_toollift")->nullable()->change();
            $table->mediumText("missions_send_robot")->nullable()->change();
 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('start', function (Blueprint $table) {
            $table->dropColumn("name_seri");
        });
    }
};
