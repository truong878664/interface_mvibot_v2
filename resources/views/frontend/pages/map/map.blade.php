@extends('frontend.layouts.mainLayout')
@section('content')
    <ul
        class="w-full grid grid-cols-1 gap-7 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-4 mt-10 text-5xl font-bold text-main">
        <a href="{{ route('dashboard.map.choose-map-active') }}">
            <li class="w-full h-[140px] rounded-md p-4 mb-4 bg-cover bg-no-repeat btn flex justify-end items-end shadow-md hover:shadow-lg"
                style="background-image: url(/img/map/choose_map.png)">
                Manage map
            </li>
        </a>
        <a href="{{ route('dashboard.map.create-layer') }}">
            <li class="w-full h-[140px] rounded-md p-4 mb-4 bg-cover bg-no-repeat btn flex justify-end items-end shadow-md hover:shadow-lg"
                style="background-image: url(/img/map/layer.png)">
                Create layer
            </li>
        </a>
        <a href="{{ route('dashboard.map.create-layer') }}">
            <li class="w-full h-[140px] rounded-md p-4 mb-4 bg-cover bg-no-repeat btn flex justify-end items-end shadow-md hover:shadow-lg"
                style="background-image: url(/img/map/layer.png)">
                Create layer v2
            </li>
        </a>
    </ul>
@endsection
