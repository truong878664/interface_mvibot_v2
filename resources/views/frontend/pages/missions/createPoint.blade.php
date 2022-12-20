@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading missions-heading">Mission</div>
    <div class=" missions-content">
        @include('frontend.blocks.mission.navbarmissions')
        <div id="create-point" class="nav-content">
            @include('frontend.blocks.mission.createPoint.index')
        </div>
    </div>
    <script type="module" src="/js/missions.js"></script>
    <script type="module" src="/js/missions/createPoint.js"></script>
    <script>
        document.title = 'Create Point | Mvibot'
    </script>
@endsection
