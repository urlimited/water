<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourierReportTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('couriers_cash_report', function (Blueprint $table) {
            $table->id();
            $table->integer('courier_id');
            $table->integer('cash_on_hand');
            $table->integer('reported_at');
            $table->string('status', 12);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('couriers_cash_report');
    }
}
