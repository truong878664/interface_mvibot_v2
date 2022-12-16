@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading map-heading">Map</div>
    <div class="w-full flex flex-wrap px-4 ">
        <x-button tag="a" title="Choose map active" class=""
            attribute="href={{ route('dashboard.map.choose-map-active') }}"></x-button>
        <x-button tag="a" title="Create Layer" class="" attribute="href={{ route('dashboard.map.create-layer') }}">
        </x-button>
    </div>
@endsection
