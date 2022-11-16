@extends('frontend.layouts.mainLayout')
@section('content')
    <link rel="stylesheet" href="/css/missions.css">
    <div class="heading missions-heading">Mission</div>
    <div class="contents">

        <div class="connect-ros-btn connection-failed">
            <i class="fa-solid fa-tower-broadcast"></i>
        </div>
        <div class="contents missions-content">
            @include('frontend.blocks.navbarmissions')
            <div id="create-mission" class="missions-wrapper-create-missions nav-content content-missions">
                @include('frontend.blocks.createMissions.index')
            </div>
            <script type="module" src="/js/main.js"></script>
            <script type="module" src="/js/missions.js"></script>
            <script type="module" src="/js/missions/createMissions.js"></script>
        </div>
    </div>
    <script>
        document.title = 'Create Mission | Mvibot'
    </script>
@endsection
