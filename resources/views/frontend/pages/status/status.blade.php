@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading status-heading flex">
        <div class="w-1/2 text-center text-2xl font-bold">Robot</div>
        <div class="w-1/2 text-center text-2xl font-bold">Gpio Module</div>
    </div>
    <div class="wrapper-status-content w-[calc(100%_-_10px)] h-[calc(100%_-_38px)] m-2 overflow-auto">

    </div>
    <script type="module" src="/js/status/status.js"></script>
@endsection
