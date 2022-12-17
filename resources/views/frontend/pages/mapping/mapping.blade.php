@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-full h-full lg:flex">
        <div class="h-2/3 lg:h-full lg:w-2/3 relative">
            <label class="absolute h-[30px] bg-[#0f6cbd] text-[#fff] m-4 px-2 rounded-sm z-[1000]">
                <span for="">Choose robot:</span>
                <select name="" id="robot-mapping" class="bg-transparent outline-none">
                    <option value="">select robot</option>
                    @foreach ($robotSlam as $item)
                        <option value="{{ $item['name_seri'] }}" class="text-[#333]">{{ $item['name_seri'] }}</option>
                    @endforeach
                </select>
            </label>
            <div class="w-full h-full overflow-hidden" id="map-wrapper">
                <div class="w-full h-full" id="map"></div>
            </div>
        </div>
        <div class="h-1/3 flex justify-between items-center px-7 lg:h-full lg:w-1/3 lg:flex-col xl:flex-col ">
            <div class="w-full mt-[32px] h-full">
                <div class="flex">
                    <input type="text" class="px-3 w-[200px] text-[1.5rem] placeholder:text-[1.5rem]"
                        placeholder="Name map" id="create_map">
                    <button class="bg-[#0f6cbd] px-3 text-[#fff] btn" id="create_map_btn">Save map</button>
                </div>
                <span class="text-[1.5rem] text-red-500 block" id="error_create_map"></span>
            </div>
            <div class="lg:p-10 lg:mb-[70px]">
                @include('frontend/blocks/joystick')
            </div>

        </div>
    </div>

    <script src="/js/library/roslib.min.js"></script>
    <script type="module" src="/js/mapping.js"></script>
@endsection
