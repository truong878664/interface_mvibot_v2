<?php

namespace App\View\Components;

use Illuminate\View\Component;

class dashboardItem extends Component
{
    public $route;
    public $icon;
    public $title;
    public $describe;
    public $color;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(
        $route,
        $icon,
        $title,
        $describe,
        $color
    ) {
        $this->route = $route;
        $this->icon = $icon;
        $this->title = $title;
        $this->describe = $describe;
        $this->color = $color;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.dashboard-item');
    }
}