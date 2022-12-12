@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading missions-heading">Mission</div>
    <div class="">

        <div class=" missions-content">
            @include('frontend.blocks.mission.navbarmissions')


            <div id="create-point" class="missions-wrapper-create-point nav-content">
                @include('frontend.blocks.mission.createPoint.index')
            </div>

            <script type="module" src="/js/missions.js"></script>
            <script type="module" src="/js/missions/createPoint.js"></script>
        </div>
    </div>
    <script>
        document.title = 'Create Point | Mvibot'
    </script>
@endsection
