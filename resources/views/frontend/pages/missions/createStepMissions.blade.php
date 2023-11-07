@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="missions-content w-full h-full p-1">
        @include('frontend.blocks.mission.createMissions.createStep')
    </div>

    <script type="module" src="/js/missions.js"></script>
    <script type="module" src="/js/missions/createStepMission.js"></script>
    <script type="module" src="/js/missions/handleTypeMission.js"></script>
    {{-- <script type="module" src="/js/missions/function/gpio/gpio.js"></script>
    <script type="module" src="/js/missions/function/footprint.js"></script>
    <script type="module" src="/js/missions/function/point.js"></script>
    <script type="module" src="/js/missions/function/var.js"></script>
    <script type="module" src="/js/missions/function/sound.js"></script>
    <script type="module" src="/js/missions/function/footprint/footprint.js"></script>
    <script type="module" src="/js/missions/function/marker/marker.js"></script>
    <script type="module" src="/js/missions/function/sleep/sleep.js"></script>
    <script type="module" src="/js/missions/function/position/position.js"></script> --}}
@endsection
