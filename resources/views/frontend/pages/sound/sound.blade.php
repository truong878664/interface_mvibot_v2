@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading dashboard-heading">Sound</div>
    <div class="w-[calc(100%_-_10px)] h-[calc(100%_-_38px)] m-2 flex flex-col overflow-auto">
        <div class="w-1/2 mx-auto py-10 px-5 border-stone-300 border bg-stone-200">
            <select name="" id="robot-sound"
                class="text-2xl border rounded-md border-[#0f6cbd] mr-[20px] bg-[#0f6cbd] py-2 text-white px-4 outline-none mb-4">
                <option value="">Select robot</option>
                @foreach ($allRobot as $robot)
                    <option value="{{ $robot->name_seri }}">{{ $robot->name_seri }}</option>
                @endforeach
            </select>

            <table class="w-full border text-2xl bg-white" id="table-sound">
                <tr class="text-center">
                    <th class="border border-solit border-[#ccc] py-2">STT</th>
                    <th class="border border-solit border-[#ccc] py-2">Name</th>
                    <th class="border border-solit border-[#ccc] py-2">Time</th>
                    <th class="border border-solit border-[#ccc] py-2">Action</th>
                </tr>
            </table>
            <div class="mt-4">
                <button
                    class="float-right text-xl md:text-3xl btn bg-red-500 text-[#fff] self-end px-4 py-2 rounded-md mr-4 stop-sound-btn">Stop</button>

                <button
                    class="float-right text-xl md:text-3xl btn bg-main text-[#fff] self-end px-4 py-2 rounded-md mr-4 basic-sound-btn">Basic</button>
                <button
                    class="float-right text-xl md:text-3xl btn bg-yellow-500 text-[#fff] self-end px-4 py-2 rounded-md mr-4 custom-sound-btn">Custom</button>
            </div>





            @php
                function getSound()
                {
                    $fileSound = json_encode(glob('sound/*'));
                    echo $fileSound;
                }
                
            @endphp

            <input type="hidden" class="pathSound" value="">
            {{-- <form action="">
                <label for="dropzone-file"
                    class="px-4 py-2 bg-[#0f6cbd] text-[#fff] text-[16px] btn rounded-md opacity-80 hover:opacity-100 float-right mt-2 add-sound">
                    <i class="fa-solid fa-upload"></i>
                    <span class="mr-2">Add sound</span>
                    <input id="dropzone-file" type="file" class="hidden" />
                </label>
                <input type="submit" value="df">
            </form> --}}

            <script>
                (function getPathSound() {
                    const pathSound = '<?php getSound(); ?>';
                    document.querySelector(".pathSound").value = pathSound;
                })()
            </script>
        </div>
    </div>
    <script type="module" src="/js/sound/sound.js"></script>
@endsection
