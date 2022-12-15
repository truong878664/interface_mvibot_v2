@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading ">setting</div>
    <div class="">
        <select name="" id="choose_robot">
            <option value="">choose robot</option>
            @foreach ($allRobot as $item)
                <option value="{{ $item['name_seri'] }}">{{ $item['name_seri'] }}</option>
            @endforeach
        </select>
        <input type="text" class="w-[500px] px-2 placeholder:text-[2rem]" placeholder="data public" id="public-data">
        <button class="bg-[#0f6cbd] text-[#fff] px-2" id="public-btn">publish topic</button>

        <div class="fixed bottom-0 right-0 m-[50px]">
            <button id="shutdown-btn"
                class="px-4 py-2 bg-red-500  text-[#fff] rounded-md opacity-80 hover:opacity-100">shutdown</button>
            <button id="reboot-btn"
                class="px-4 py-2 bg-blue-500 text-[#fff] rounded-md opacity-80 hover:opacity-100">reboot</button>
        </div>
    </div>
    <script type="module" src="/js/setting/publishTopic.js"></script>
@endsection
