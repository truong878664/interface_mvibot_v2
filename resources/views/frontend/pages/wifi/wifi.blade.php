@extends('frontend.layouts.mainLayout')
@section('content')
    <div class=" overflow-hidden w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2">
        <div class="heading ">Wifi</div>
        <div
            class="w-full h-[calc(100%_-_32px)] bg-[#e1e1e1] flex rounded-lg overflow-hidden border border-[#e5e5e5] text-2xl wifi-container">
            <div class=" w-full max-w-[800px] h-[calc(100%_-_200px)] mx-auto mt-10 relative">
                <div
                    class="w-full h-[80px] rounded-lg bg-[#D9D9D9] flex justify-between items-center pl-[40px] pr-10 mb-[40px]">
                    <div class="">
                        <label for="" class="text-sky-600"><i class="fa-solid fa-check"></i></label>
                        <span class="font-bold ml-4 wifi-connected">MVP_wifi</span>
                    </div>
                    <label class="text-3xl">
                        <i class="fa-solid fa-wifi"></i>
                    </label>
                </div>

                <span class="text-2xl mb-4 block font-bold">Network available</span>

                <div
                    class="w-full min-h-[200px] max-h-full rounded-xl bg-[#D9D9D9] pl-[40px] relative wifi-wrapper pb-10 overflow-auto">
                </div>

                <div class="overlay fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] z-20 hidden"></div>
                <div
                    class="absolute w-full max-w-[600px] bg-[#E3E3E3] top-16 left-1/2 -translate-x-1/2 rounded-2xl shadow-lg p-10 hidden form-enter-password z-[21]">
                    <div class="flex justify-between">
                        <button class="mt-2 btn cancel-wifi-btn font-bold">Cancle</button>
                        <label class="font-bold text-[16px]">Enter password for "<span
                                class="label-wifi">null</span>"</label>
                        <button class="mt-2 btn connect-wifi-btn disabled:opacity-50 font-bold" disabled>Connect</button>
                    </div>

                    <div class="w-full h-[60px] rounded-xl bg-[#D9D9D9] mt-7 flex items-center px-10">
                        <span class="font-bold mr-4">Password</span>
                        <input class="flex-1 text-[16px] bg-transparent border-none outline-none tracking-[2px] py-4"
                            type="password" name="" id="password-wifi">
                        <button class="show-password-btn outline-none">
                            <i class="fa-regular fa-eye show"></i>
                            <i class="fa-regular fa-eye-slash hide"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <style>
        .active .show,
        .hide {
            display: none;
        }

        .active .hide,
        .show {
            display: block;
        }
    </style>
    <script type="module" src="/js/wifi/index.js"></script>
@endsection

