<?php

namespace App\View\Components;

use Illuminate\View\Component;

class StatusItem extends Component
{

    public $nameRobot;
    public $statusStatusRobot;
    public $batteryPercent;
    public $batteryTemperValue;
    public $batteryA;
    public $batteryVoltValue;
    public $dataSccessory;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(
        $nameRobot,
        $statusStatusRobot,
        $batteryPercent,
        $batteryTemperValue,
        $batteryA,
        $batteryVoltValue,
        $dataSccessory,
    ) {
        $this->nameRobot = $nameRobot;
        $this->statusStatusRobot = $statusStatusRobot;
        $this->batteryPercent = $batteryPercent;
        $this->batteryTemperValue = $batteryTemperValue;
        $this->batteryA = $batteryA;
        $this->batteryVoltValue = $batteryVoltValue;
        $this->dataSccessory = $dataSccessory;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.status-item');
    }
}