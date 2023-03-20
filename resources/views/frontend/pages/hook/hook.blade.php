@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="flex w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2 overflow-auto border shadow-sm shadow-[#ccc]">
        <div class="h-full w-1/4">
            <select name=""  id="robot-hook"
                class="ml-4 mt-4 text-2xl borde rounded-md border-[#0f6cbd] mr-[20px] bg-[#0f6cbd] py-2 text-white px-4 outline-none inline-block">
                <option value="">Select robot</option>
                @foreach ($robots as $robot)
                    <option value="{{ $robot->name_seri }}">{{ $robot->name_seri }}</option>
                @endforeach
            </select>
        </div>

        <div class="w-3/4 flex justify-center items-center overflow-hidden data-[status=disabled]:opacity-50 hook-wrapper" data-status="disabled">
            <div class="w-full img-wrapper relative">
                <div class="w-full img-item bg-contain bg-no-repeat bg-center absolute left-0 top-0"
                    style="background-image: url(/img/hook/robot2.png)"></div>
                <div class="w-full img-item bg-contain bg-no-repeat bg-center absolute left-0 top-0 origin-[50%_20%] hook-img"
                    style="background-image: url(/img/hook/hook2.png);transform: rotate(0deg);"></div>
                <div class="w-full img-item bg-contain bg-no-repeat bg-center absolute left-0 top-0"
                    style="background-image: url(/img/hook/path.png)"></div>
            </div>
        </div>

    </div>
    <script>
        const width = document.querySelector('.img-wrapper')
        const style = getComputedStyle(width);
        const height = (style.width.slice(0, style.width.length - 2)) * 68.8 / 100 + "px"
        width.style.height = height

        document.querySelectorAll('.img-item').forEach(element => {
            element.style.height = height
        });
    </script>

    <script type="module" src="/js/hook/hook.js"></script>
@endsection
