@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-full h-full md:flex">
        <div class="h-2/3 bg-slate-500 md:h-full md:w-2/3 relative">
            <label class="absolute h-[30px] bg-[#0f6cbd] text-[#fff] m-4 px-2 rounded-sm z-[1000]">
                <span for="">Choose robot:</span>
                <select name="" id="robot-mapping" class="bg-transparent outline-none">
                    @foreach ($robotSlam as $item)
                        <option value="{{ $item['name_seri'] }}" class="text-[#333]">{{ $item['name_seri'] }}</option>
                    @endforeach
                </select>
            </label>
            <div class="w-full h-full" id="map-wrapper">
                <div class="w-full h-full" id="map"></div>
            </div>
        </div>
        <div class="h-1/3 flex justify-between items-center px-7 md:h-full md:w-1/3 md:flex-col">
            <div class=""></div>
            @include('frontend/blocks/joystick')

        </div>
    </div>

    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/nipplejs.js"></script>
    <script type="module" src="/js/mapping.js"></script>
@endsection
