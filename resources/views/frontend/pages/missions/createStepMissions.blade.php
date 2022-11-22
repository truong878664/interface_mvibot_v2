@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading missions-heading">Mission</div>

    <style>
        textarea {
            padding: 10px;
        }
    </style>

    <div class="contents missions-content">
        @include('frontend.blocks.navbarmissions')

        <div id="create-mission" class="missions-wrapper-create-missions nav-content content-missions">
            @include('frontend.blocks.createMissions.createStep')

        </div>
    </div>

    @if (Session::has('msg'))
        <div class="message-success">
            <div class="check-icon"><i class="fa-solid fa-circle-check"></i></div>
            <p class="message-title">{{ Session::get('msg') }}</p>
        </div>
    @endif
    <script>
        document.title = 'Create Mission | Mvibot'
    </script>
    <script type="module" src="/js/missions.js"></script>
    <script type="module" src="/js/missions/createStepMission.js"></script>
    </div>
@endsection
