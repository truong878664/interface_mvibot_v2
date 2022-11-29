@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading missions-heading">Mission</div>
    <div class="contents missions-content">
        @include('frontend.blocks.navbarmissions')
        <div id="create-mission" class="missions-wrapper-create-missions nav-content content-missions">
            @include('frontend.blocks.trackingMission.index')
        </div>
        <script type="module" src="/js/missions.js"></script>
        <script type="module" src="/js/missions/trackingMission.js"></script>
    </div>
    <script>
        document.title = 'Tracking mission | Mvibot'
    </script>
@endsection
