<head>
    <link rel="stylesheet" href="/css/missions.css">
</head>

@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading missions-heading">Mission</div>
    <div class="contents missions-content">
        <ul class="nav-tab">
            <li class="navtab-item active create-point">Create point</li>
            <li class="navtab-item create-missions">Create missions</li>
            <li class="navtab-item tracking-mission">Tracking mission</li>
        </ul>
        <div class="missions-map" id="map"></div>
    </div>
@endsection
