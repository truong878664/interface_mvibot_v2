@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading missions-heading">Mission</div>

    <div class="contents missions-content">
        @include('frontend.blocks.mission.navbarmissions')
        <div id="create-mission" class="missions-wrapper-create-missions nav-content content-missions">
            @include('frontend.blocks.mission.createMissions.index')
        </div>
        <script type="module" src="/js/missions.js"></script>
        <script type="module" src="/js/missions/createMissions.js"></script>
    </div>

    <script>
        document.title = 'Create Mission | Mvibot'
    </script>
@endsection
