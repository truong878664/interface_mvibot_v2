<div class="setting-detail hidden">
    <div class="w-1/2 mx-auto mt-10">
        <div class="flex items-center">
            <div
                class="w-[70px] h-[70px] lg:w-[140px] lg:h-[140px] rounded-full transparent bg-avatar flex justify-center items-center shadow-lg relative after:absolute after:w-[110%] after:h-[110%] after:rounded-full after:border after:border-stone-400">
                <span class="lg:text-[80px] font-[300] uppercase avatar-img-key text-white avatar-img-key"></span>
                @if (session('TypeUser') == 'admin')
                    <div
                        class="absolute text-cyan-400 text-[30px] top-0 right-0 bg-[#fff] rounded-full leading-[0px] z-30">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                @endif
            </div>
            <input
                class="ml-10 text-[22px] font-bold name-user w-1/2 border-2 bg-transparent change-username px-3 rounded-xl border-transparent"
                readonly value="admin" />
            <div
                class="w-[30px] h-[30px] rounded-full border border-stone-400 bg-stone-300 flex justify-center items-center cursor-pointer text-[#fff] text-xl btn ml-5 change-username-btn">
                <i class="fa-solid fa-pen"></i>

            </div>
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
            @include('frontend.blocks.setting.settingTab.usersTab.password')
            @include('frontend.blocks.setting.settingTab.usersTab.managerAcc')
            @include('frontend.blocks.setting.settingTab.usersTab.createAcc')
        </div>
        <button
            class="text-[16px] px-4 rounded border-[1px] border-solid border-stone-500 float-right mt-4 btn hover:bg-stone-300 logout-btn">Logout...
        </button>
        <a href="{{ route('logout') }}" class="hidden logout-href"></a>
    </div>
</div>
