<div class="hidden">
    {{-- NORMAL --}}
    <div data-block-wrapper="normal" class="mt-4 flex w-full rounded-lg bg-white p-4 shadow-block">
        <span class="mr-3 flex h-[20px] w-[20px] items-center justify-center text-red-400">
            <i class="fa-solid fa-bullseye"></i>
        </span>
        <div class="flex flex-1 flex-wrap" data-data-block="normal">
            @for ($i = 0; $i < 20; $i++)
                <div data-type="footprint"
                    class="mr-2 mb-2 inline-flex h-[30px] items-center rounded-lg bg-[#38c3ff33] px-4 text-[16px] text-[#38c3ff]">
                    <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                    <span>HS_123</span>
                </div>
            @endfor
        </div>
    </div>
    {{-- END NORMAL --}}
    {{-- IF --}}
    <div data-block-wrapper="ifelse" class="mt-4 flex w-full rounded-lg bg-white p-4 shadow-block">
        <span class="mr-3 flex h-[20px] w-[20px] rotate-90 items-center justify-center text-green-400">
            <i class="fa-solid fa-code-fork"></i>
        </span>
        <div class="flex-1 text-[16px]">
            <div class="mb-3 flex rounded-lg bg-stone-100 p-4">
                <span class="mr-3 font-bold">If</span>
                <div class="flex flex-1 flex-wrap" data-data-block="condition">
                    @for ($i = 0; $i < 10; $i++)
                        <div data-type="footprint"
                            class="mr-2 mb-2 inline-flex h-[30px] items-center rounded-lg bg-[#38c3ff33] px-4 text-[16px] text-[#38c3ff]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor
                </div>
            </div>
            <div class="mb-3 flex rounded-lg bg-stone-100 p-4">
                <span class="mr-3 font-bold">Then</span>
                <div class="flex flex-1 flex-wrap" data-data-block="if">
                    @for ($i = 0; $i < 10; $i++)
                        <div data-type="footprint"
                            class="mr-2 mb-2 inline-flex h-[30px] items-center rounded-lg bg-[#38c3ff33] px-4 text-[16px] text-[#38c3ff]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor
                </div>
            </div>
            <div class="mb-3 flex rounded-lg bg-stone-100 p-4">
                <span class="mr-3 font-bold">Else</span>
                <div class="flex flex-1 flex-wrap" data-data-block="else">
                    @for ($i = 0; $i < 10; $i++)
                        <div data-type="footprint"
                            class="mr-2 mb-2 inline-flex h-[30px] items-center rounded-lg bg-[#38c3ff33] px-4 text-[16px] text-[#38c3ff]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor
                </div>
            </div>
        </div>
    </div>
    {{-- END IF --}}
    {{-- WHITE --}}
    <div data-block-wrapper="while" class="mt-4 flex w-full rounded-lg bg-white p-4 shadow-block">
        <span class="mr-3 flex h-[20px] w-[20px] rotate-90 items-center justify-center text-sky-400">
            <i class="fa-solid fa-arrows-spin"></i>
        </span>
        <div class="flex-1 text-[16px]">
            <div class="mb-3 flex rounded-lg bg-stone-100 p-4">
                <span class="mr-3 font-bold">While</span>
                <div class="flex flex-1 flex-wrap" data-data-block="condition">
                    @for ($i = 0; $i < 10; $i++)
                        <div data-type="footprint"
                            class="mr-2 mb-2 inline-flex h-[30px] items-center rounded-lg bg-[#38c3ff33] px-4 text-[16px] text-[#38c3ff]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor
                </div>
            </div>
            <div class="mb-3 flex rounded-lg bg-stone-100 p-4">
                <span class="mr-3 font-bold">Do</span>
                <div class="flex flex-1 flex-wrap" data-data-block="do">
                    @for ($i = 0; $i < 10; $i++)
                        <div data-type="footprint"
                            class="mr-2 mb-2 inline-flex h-[30px] items-center rounded-lg bg-[#38c3ff33] px-4 text-[16px] text-[#38c3ff]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor
                </div>
            </div>
        </div>
    </div>
    {{-- END WHITE --}}
    {{-- TRY CATCH --}}
    <div data-block-wrapper="trycatch" class="mt-4 flex w-full rounded-lg bg-white p-4 shadow-block">
        <span class="mr-3 flex h-[20px] w-[20px] items-center justify-center text-yellow-500">
            <i class="fa-solid fa-triangle-exclamation"></i>
        </span>
        <div class="flex-1 text-[16px]">
            <div class="mb-3 flex rounded-lg bg-stone-100 p-4">
                <span class="mr-3 font-bold">Try</span>
                <div class="flex flex-1 flex-wrap" data-data-block="try">
                    @for ($i = 0; $i < 10; $i++)
                        <div data-type="footprint"
                            class="mr-2 mb-2 inline-flex h-[30px] items-center rounded-lg bg-[#38c3ff33] px-4 text-[16px] text-[#38c3ff]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor
                </div>
            </div>
            <div class="mb-3 flex rounded-lg bg-stone-100 p-4">
                <span class="mr-3 font-bold">Catch</span>
                <div class="flex flex-1 flex-wrap" data-data-block="catch">
                    @for ($i = 0; $i < 10; $i++)
                        <div data-type="footprint"
                            class="mr-2 mb-2 inline-flex h-[30px] items-center rounded-lg bg-[#38c3ff33] px-4 text-[16px] text-[#38c3ff]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor
                </div>
            </div>
        </div>
    </div>
    {{-- END TRY CATCH --}}
    {{-- LOGIC AND --}}
    <div data-block-wrapper="logic_and" class="mt-4 inline-flex rounded-lg bg-white p-4 shadow-block">
        <span class="mr-3 flex h-[20px] w-[20px] items-center justify-center text-blue-500">
            <i class="fa-solid fa-face-smile"></i>
        </span>
        <div class="flex flex-1 text-[16px]">
            <div class="mb-3 flex rounded-lg bg-stone-100 p-4">
                <div class="flex flex-1 flex-wrap" data-data-block="logicA">
                    @for ($i = 0; $i < 2; $i++)
                        <div data-type="footprint"
                            class="mr-2 mb-2 inline-flex h-[30px] items-center rounded-lg bg-[#38c3ff33] px-4 text-[16px] text-[#38c3ff]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor
                </div>
            </div>
            <span class="px-4 font-bold">AND</span>
            <div class="mb-3 flex rounded-lg bg-stone-100 p-4">
                <div class="flex flex-1 flex-wrap" data-data-block="logicB">
                    @for ($i = 0; $i < 3; $i++)
                        <div data-type="footprint"
                            class="mr-2 mb-2 inline-flex h-[30px] items-center rounded-lg bg-[#38c3ff33] px-4 text-[16px] text-[#38c3ff]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor
                </div>
            </div>
        </div>
    </div>
    {{-- END LOGIC AND --}}
    {{-- LOGIC OR --}}
    <div data-block-wrapper="logic_or" class="mt-4 inline-flex rounded-lg bg-white p-4 shadow-block">
        <span class="mr-3 flex h-[20px] w-[20px] items-center justify-center text-purple-800">
            <i class="fa-solid fa-face-smile"></i>
        </span>
        <div class="flex flex-1 text-[16px]">
            <div class="mb-3 flex rounded-lg bg-stone-100 p-4">
                <div class="flex flex-1 flex-wrap" data-data-block="logicA">
                    @for ($i = 0; $i < 1; $i++)
                        <div data-type="footprint"
                            class="mr-2 mb-2 inline-flex h-[30px] items-center rounded-lg bg-[#38c3ff33] px-4 text-[16px] text-[#38c3ff]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor
                </div>
            </div>
            <span class="px-4 font-bold">OR</span>
            <div class="mb-3 flex rounded-lg bg-stone-100 p-4">
                <div class="flex flex-1 flex-wrap" data-data-block="logicB">
                    @for ($i = 0; $i < 1; $i++)
                        <div data-type="footprint"
                            class="mr-2 mb-2 inline-flex h-[30px] items-center rounded-lg bg-[#38c3ff33] px-4 text-[16px] text-[#38c3ff]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor
                </div>
            </div>
        </div>
    </div>
    {{-- END LOGIC OR --}}
</div>
