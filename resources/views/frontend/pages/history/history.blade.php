@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-[calc(100%_-_10px)] m-2  h-[calc(100%_-_10px)] flex flex-col">
        <div class="flex mx-4 items-center">
            @include('frontend.blocks.selectRobot', ['type' => 'robot', 'id' => 'robot-history'])
        </div>
    </div>
    <script type="module" src="/js/gpio/gpio.js"></script>
@endsection
