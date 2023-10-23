@extends('frontend.layouts.mainLayout')
@section('content')
    @php
        $userName = session('UserName');
        $key = substr($userName, 0, 1);
        $colors = ['#FF7B54', '#D7E9B9', '#7B2869', '#B5D5C5', '#3C6255', '#579BB1', '#FF6E31', '#FFEBB7', '#AD8E70', '#B9FFF8', '#6FEDD6', '#FF9551', '#FF4A4A', '#FDFDBD', '#C8FFD4', '#B8E8FC', '#B1AFFF', '#FED049', '#CFFDE1', '#68B984', '#3D5656'];
        $color = $colors[strlen($userName)];
    @endphp
    <div class="heading dashboard-heading">User</div>
    <div class="w-full h-[calc(100%_-_38px)] flex flex-col">
        <div class="w-full h-full mx-auto mt-10 max-w-[500px] overflow-auto">
            <div class="flex items-center">
                <div key="{{ $key }}" style="background-color: {{ $color }};"
                    class="w-[70px] h-[70px] lg:w-[140px] lg:h-[140px] rounded-full m-3 transparent bg-avatar flex justify-center items-center shadow-lg after:absolute after:w-[110%] after:h-[110%] after:rounded-full after:border after:border-stone-400 text-white avatar-img-key before:content-[attr(key)] relative before:absolute before:top-1/2 before:left-1/2 before:font-bold before:-translate-x-1/2 before:-translate-y-1/2 before:text-[80px] before:uppercase">
                    @if (session('TypeUser') == 'admin')
                        <div
                            class="absolute text-cyan-400 text-[30px] top-0 right-0 bg-[#fff] rounded-full leading-[0px] z-30">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                    @endif
                </div>
                <input
                    class="ml-10 text-[22px] font-bold name-user w-1/2 border-2 bg-transparent change-username px-3 rounded-xl border-transparent"
                    readonly value="{{ session('UserName') }}" />
            </div>

            <div class="mt-16">
                <span class="mb-4 block">Authentication & login</span>
                <div class="w-full bg-stone-300 border border-solid border-stone-400 border-b-0">
                    <div
                        class="px-4 py-5 flex items-center justify-between  border-b border-solid border-stone-400 hover:bg-stone-500 cursor-pointer hover:text-[#fff] user-setting-btn">
                        <span class="text-[16px]">Password</span>
                        <div class="flex text-[5px] items-center">
                            <i class="fa-solid fa-circle mr-1"></i>
                            <i class="fa-solid fa-circle mr-1"></i>
                            <i class="fa-solid fa-circle mr-1"></i>
                            <i class="fa-solid fa-circle mr-1"></i>
                            <i class="fa-solid fa-angle-right text-[20px] ml-3"></i>
                        </div>
                    </div>

                    <div
                        class="px-4 py-4 flex items-center justify-between  border-b border-solid border-stone-400 text-stone-400">
                        <span class="text-[16px] pointer-events-none">Automatic Login</span>
                        <div class="flex items-center text-[30px] pointer-events-none">
                            <i class="fa-solid fa-toggle-off pointer-events-none"></i>
                        </div>
                    </div>
                    @if (session('TypeUser') == 'admin')
                        <div
                            class="px-4 py-5 flex items-center justify-between  border-b border-solid border-stone-400 hover:bg-stone-500 cursor-pointer hover:text-[#fff] user-setting-btn">
                            <span class="text-[16px] pointer-events-none">Manager account</span>
                            <div class="flex items-center pointer-events-none">
                                <i class="fa-solid fa-angle-right text-[20px] ml-3 pointer-events-none"></i>
                            </div>
                        </div>

                        <div
                            class="px-4 py-5 flex items-center justify-between  border-b border-solid border-stone-400 hover:bg-stone-500 cursor-pointer hover:text-[#fff] user-setting-btn">
                            <span class="text-[16px] pointer-events-none">Create new account</span>
                            <div class="flex items-center pointer-events-none">
                                <i class="fa-solid fa-angle-right text-[20px] ml-3 pointer-events-none"></i>
                            </div>
                        </div>
                    @endif
                </div>
            </div>

            <div class="">
                @include('frontend.blocks.user.usersTab.password')
                @include('frontend.blocks.user.usersTab.managerAcc')
                @include('frontend.blocks.user.usersTab.createAcc')
            </div>
            <a href="{{ route('logout') }}"
                class="text-[16px] px-4 rounded border-[1px] border-solid border-stone-500 float-right mt-4 btn hover:bg-stone-300">
                Logout...
            </a>
        </div>
    </div>
    <script type="module" src="/js/user/user.js"></script>
@endsection
