@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-full h-full p-1 overflow-hidden">
        <div class="w-full h-full overflow-scroll grid grid-cols-1 gap-2 xl:grid-cols-2" id="feature-wrapper-button">
            @include('frontend.pages.startRobot.start')
            @include('frontend.pages.startRobot.module')
            @include('frontend.pages.startRobot.toollift')
        </div>
    </div>
    <script type="module" src="/js/start/index.js"></script>
@endsection
