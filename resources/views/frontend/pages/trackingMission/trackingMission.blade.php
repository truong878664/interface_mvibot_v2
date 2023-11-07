@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="missions-content w-full h-full overflow-auto p-1">
        @include('frontend.pages.trackingMission.index')
        <script type="module" src="/js/missions.js"></script>
        <script type="module" src="/js/trackingMission/trackingMission.js"></script>
    </div>
@endsection
