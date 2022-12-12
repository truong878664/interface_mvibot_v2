@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading missions-heading">Mission</div>

    <div class=" missions-content">
        @include('frontend.blocks.mission.navbarmissions')

        <div id="create-mission" class="missions-wrapper-create-missions nav-content content-missions">
            @include('frontend.blocks.mission.createMissions.createStep')
        </div>
    </div>
    @include('frontend.blocks.message')
    <script>
        document.title = 'Create Mission | Mvibot'
    </script>
    <script type="module" src="/js/missions.js"></script>
    <script type="module" src="/js/missions/createStepMission.js"></script>
    </div>
@endsection
