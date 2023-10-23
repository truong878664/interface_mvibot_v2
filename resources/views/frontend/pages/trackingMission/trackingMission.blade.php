@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="missions-content w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2 overflow-auto">
        @include('frontend.pages.trackingMission.index')
        <script type="module" src="/js/missions.js"></script>
        <script type="module" src="/js/trackingMission/trackingMission.js"></script>
    </div>
@endsection
