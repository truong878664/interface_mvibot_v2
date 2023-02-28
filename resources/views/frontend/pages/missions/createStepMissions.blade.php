@extends('frontend.layouts.mainLayout')
@section('content')
    <div class=" missions-content w-[calc(100%_-_8px)] h-[calc(100%_-_8px)] m-2">
        @include('frontend.blocks.mission.createMissions.createStep')
    </div>

    <script type="module" src="/js/missions.js"></script>
    <script type="module" src="/js/missions/createStepMission.js"></script>
    <script type="module" src="/js/missions/function/gpio.js"></script>
    <script type="module" src="/js/missions/function/footprint.js"></script>
    <script type="module" src="/js/missions/handleTypeMission.js"></script>
    <script type="module" src="/js/missions/wakeUpStop/gpioWakeUpStop.js"></script>
    <script type="module" src="/js/missions/function/point.js"></script>
    <script type="module" src="/js/missions/function/var.js"></script>
    <script type="module" src="/js/missions/function/sound.js"></script>
    <script type="module" src="/js/missions/fullScreenStep.js"></script>
@endsection
