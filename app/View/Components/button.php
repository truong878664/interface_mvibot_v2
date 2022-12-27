<?php

namespace App\View\Components;

use Illuminate\View\Component;

class button extends Component
{
    public $tag;
    public $attribute;
    public $class;
    public $title;


    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($tag, $attribute, $class, $title)
    {
        $this->tag = $tag;
        $this->attribute = $attribute;
        $this->class = $class;
        $this->title = $title;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.button');
    }
}