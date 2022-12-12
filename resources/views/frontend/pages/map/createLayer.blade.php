@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-full h-full flex flex-col">
        <div class="heading map-heading">Map</div>
        <div class="mx-4 mb-4 h-full flex flex-col">
            <a class="inline-block px-3 rounded hover:bg-[#ccc] w-[30px] mb-2" href="{{ route('dashboard.map.map') }}">
                <i class="fa-solid fa-chevron-left"></i>
            </a>
            <div class="flex-1 flex ">
                <div class="w-5/6" id="map"></div>
                <form class="flex flex-wrap mt-3 justify-end content-start w-1/6 px-5">
                    <label for="" class="text-[1.4rem] w-full flex items-center mb-4">
                        <span class="pr-2 min-w-[76px] ">Name layer</span>
                        <input type="text" class="px-4 w-[100px] flex-1">
                    </label>

                    <label for="" class="text-[1.4rem] w-full flex items-center mb-4">
                        <span class="pr-2 min-w-[76px]">Type layer</span>
                        <select name="" id="" class="px-4 w-[100px] flex-1 outline-none border-[1px]">
                            <option value="lowspeed_zone">lowspeed_zone</option>
                            <option value="dead_zone">dead_zone</option>
                        </select>
                    </label>

                    <label for="" class="text-[1.4rem] w-full flex items-center mb-4">
                        <span class="pr-2 min-w-[76px]">Height</span>
                        <input type="number" class="px-4 w-[100px] flex-1" value="1">
                    </label>

                    <label for="" class="text-[1.4rem] w-full flex items-center mb-4">
                        <span class="pr-2 min-w-[76px]">Width</span>
                        <input type="number" class="px-4 w-[100px] flex-1" value="1">
                    </label>

                    <label for="" class="text-[1.4rem] w-full flex items-center mb-4">
                        <span class="pr-2 min-w-[76px]">X</span>
                        <input type="number" class="px-4 w-[100px] flex-1" value="0" name="xo" id="xo">
                    </label>

                    <label for="" class="text-[1.4rem] w-full flex items-center mb-4">
                        <span class="pr-2 min-w-[76px]">Y</span>
                        <input type="number" class="px-4 w-[100px] flex-1" value="0" name="yo" id="yo">
                    </label>

                    <label for="" class="text-[1.4rem] w-full flex items-center mb-4">
                        <span class="pr-2 min-w-[76px]">Yawo</span>
                        <input type="number" class="px-4 w-[100px] flex-1" value="1">
                    </label>
                    <div class="">
                        <button class="px-4 bg-[#0f6cbd] text-[#fff] mr-2">create</button>
                        <button class="px-4 bg-[#0f6cbd] text-[#fff]">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/nipplejs.js"></script>
    <script type="module" src="/js/map.js"></script>
@endsection
