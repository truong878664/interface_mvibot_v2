@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="flex justify-evenly absolute top-0 z-10 left-0 h-5 items-center bg-transparent backdrop-blur-sm w-full">
        <div class="">Robot</div>
        <div class="">Gpio Module</div>
    </div>
    <div class="wrapper-status-content w-full h-full overflow-auto"></div>
    <script type="module" src="/js/status/status.js"></script>
@endsection
