@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading map-heading">Map</div>
    <ul class="w-full flex flex-wrap  px-4">
        <li class="w-full md:w-1/3 lg:w-1/5 xl:1/6 btn bg-opacity-70">
            <a href="{{ route('dashboard.map.choose-map-active') }}"
                class="w-[calc(100%_-_10px)] h-[140px] rounded-md p-4 mb-4 mx-[5px]  bg-cover shadow-md"
                style="background-image: url(/img/map/choose_map.png)">
                <div
                    class=" flex relative items-end w-full h-full text-[#0f6cbd] href-mission text-5xl font-bold capitalize">
                    <span class="text-shadown">
                        Manage map
                    </span>
                </div>
            </a>
        </li>

        <li class="w-full md:w-1/3 lg:w-1/5 xl:1/6 ">
            <a href="{{ route('dashboard.map.create-layer') }}" style="background-image: url(/img/map/layer.png)"
                class="  w-[calc(100%_-_10px)] h-[140px] rounded-md p-4 mb-4 mx-[5px] bg-cover bg-no-repeat btn shadow-md">
                <div
                    class=" flex relative items-end w-full h-full text-[#0f6cbd] href-mission text-5xl font-bold capitalize">
                    <span class="text-shadown">
                        Create layer
                    </span>
                </div>
            </a>
        </li>
    </ul>
@endsection
