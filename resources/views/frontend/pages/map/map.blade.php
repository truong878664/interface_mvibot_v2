@extends('frontend.layouts.mainLayout') @section('content')
    <ul
        class="mt-10 grid w-full grid-cols-1 gap-7 px-4 text-3xl font-bold text-main md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <a href="{{ route('dashboard.map.choose-map-active') }}">
            <li class="btn mb-4 flex h-[140px] w-full items-end justify-end rounded-md bg-cover bg-no-repeat p-4 shadow-md hover:shadow-lg"
                style="background-image: url(/img/map/choose_map.png)">
                Manage map
            </li>
        </a>
        <a href="{{ route('dashboard.map.create-layer') }}">
            <li class="btn mb-4 flex h-[140px] w-full items-end justify-end rounded-md bg-cover bg-no-repeat p-4 shadow-md hover:shadow-lg"
                style="background-image: url(/img/map/layer.png)">
                Create layer
            </li>
        </a>
        <a href="{{ route('dashboard.map.create-layer-v2') }}">
            <li class="btn mb-4 flex h-[140px] w-full items-end justify-end rounded-md bg-cover bg-no-repeat p-4 shadow-md hover:shadow-lg"
                style="background-image: url(/img/map/layer.png)">
                Create layer v2
            </li>
        </a>
    </ul>
@endsection
