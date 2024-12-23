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

        Schema::table("require_produce", function (Blueprint $table) {
            $table->enum("confirm", ["unconfirmed", "confirmed", "confirmedIsWrong"])->default("unconfirmed");
            $table->string("noteConfirm")->after("confirm");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("require_produce", function (Blueprint $table) {
            $table->dropColumn("confirm");
            $table->dropColumn("noteConfirm");
        });
        Schema::table("require_produce", function (Blueprint $table) {
            $table->boolean("confirm")->default(false);
        });
    }
};