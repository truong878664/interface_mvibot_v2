@extends('frontend.layouts.mainLayout')
@section('content')
    {{-- <div class="heading relative">Mission</div> --}}

    <div class=" missions-content w-[calc(100%_-_8px)] h-[calc(100%_-_8px)] m-2">
        {{-- <div id="create-mission" class="missions-wrapper-create-missions nav-content content-missions"> --}}
        @include('frontend.blocks.mission.createMissions.createStep')
        {{-- </div> --}}
    </div>
    @include('frontend.blocks.message')

    <script type="module" src="/js/missions.js"></script>
    <script type="module" src="/js/missions/createStepMission.js"></script>
    <script type="module" src="/js/missions/function/gpio.js"></script>
    <script type="module" src="/js/missions/function/gpioModule.js"></script>
    <script type="module" src="/js/missions/function/footprint.js"></script>
    <script type="module" src="/js/missions/handleTypeMission.js"></script>
    {{-- <script type="module" src="/js/missions/wakeUpStop/wakeUpStop.js"></script> --}}
    <script type="module" src="/js/missions/wakeUpStop/gpioWakeupStop.js"></script>
    <script type="module" src="/js/missions/function/point.js"></script>
    <script type="module" src="/js/missions/function/var.js"></script>
@endsection
