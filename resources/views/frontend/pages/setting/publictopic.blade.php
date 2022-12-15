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
    </div>
    <script type="module" src="/js/setting/publishTopic.js"></script>
@endsection
