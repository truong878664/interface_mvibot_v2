<div class="hidden">
    {{-- NORMAL --}}
    <div data-block-wrapper="normal" class="flex w-full shadow-block bg-white p-4 rounded-lg mt-4">
        <span class="text-red-400 mr-3 w-[20px] h-[20px] flex justify-center items-center">
            <i class="fa-solid fa-bullseye"></i>
        </span>
        <div class="flex-1 flex flex-wrap" data-data-block="normal">
            @for ($i = 0; $i < 20; $i++)
                <div data-type="footprint"
                    class="h-[30px] mr-2 mb-2 bg-[#38c3ff33] text-[#38c3ff] rounded-lg inline-flex items-center px-4 text-[16px]">
                    <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                    <span>HS_123</span>
                </div>
            @endfor
        </div>
    </div>
    {{-- END NORMAL --}}
    {{-- IF --}}
    <div data-block-wrapper="ifelse" class="flex w-full shadow-block bg-white p-4 rounded-lg mt-4">
        <span class="text-green-400 mr-3 rotate-90 w-[20px] h-[20px] flex justify-center items-center">
            <i class="fa-solid fa-code-fork"></i>
        </span>
        <div class="flex-1 text-[16px]">
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <span class="font-bold mr-3">If</span>
                <div class="flex-1 flex flex-wrap" data-data-block="condition">
                    @for ($i = 0; $i < 10; $i++)
                        <div data-type="footprint"
                            class="h-[30px] mr-2 mb-2 bg-[#38c3ff33] text-[#38c3ff] rounded-lg inline-flex items-center px-4 text-[16px]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor
                </div>
            </div>
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <span class="font-bold mr-3">Then</span>
                <div class="flex-1 flex flex-wrap" data-data-block="if">
                    @for ($i = 0; $i < 10; $i++)
                        <div data-type="footprint"
                            class="h-[30px] mr-2 mb-2 bg-[#38c3ff33] text-[#38c3ff] rounded-lg inline-flex items-center px-4 text-[16px]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor

                </div>
            </div>
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <span class="font-bold mr-3">Else</span>
                <div class="flex-1 flex flex-wrap" data-data-block="else">
                    @for ($i = 0; $i < 10; $i++)
                        <div data-type="footprint"
                            class="h-[30px] mr-2 mb-2 bg-[#38c3ff33] text-[#38c3ff] rounded-lg inline-flex items-center px-4 text-[16px]">
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
    <div data-block-wrapper="while" class="flex w-full shadow-block bg-white p-4 rounded-lg mt-4">
        <span class="text-sky-400 mr-3 rotate-90 w-[20px] h-[20px] flex justify-center items-center">
            <i class="fa-solid fa-arrows-spin"></i>
        </span>
        <div class="flex-1 text-[16px]">
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <span class="font-bold mr-3">While</span>
                <div class="flex-1 flex flex-wrap" data-data-block="condition">
                    @for ($i = 0; $i < 10; $i++)
                        <div data-type="footprint"
                            class="h-[30px] mr-2 mb-2 bg-[#38c3ff33] text-[#38c3ff] rounded-lg inline-flex items-center px-4 text-[16px]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor

                </div>
            </div>
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <span class="font-bold mr-3">Do</span>
                <div class="flex-1 flex flex-wrap" data-data-block="do">
                    @for ($i = 0; $i < 10; $i++)
                        <div data-type="footprint"
                            class="h-[30px] mr-2 mb-2 bg-[#38c3ff33] text-[#38c3ff] rounded-lg inline-flex items-center px-4 text-[16px]">
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
    <div data-block-wrapper="trycatch" class="flex w-full shadow-block bg-white p-4 rounded-lg mt-4">
        <span class="text-yellow-500 mr-3 w-[20px] h-[20px] flex justify-center items-center">
            <i class="fa-solid fa-triangle-exclamation"></i>
        </span>
        <div class="flex-1 text-[16px]">
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <span class="font-bold mr-3">Try</span>
                <div class="flex-1 flex flex-wrap" data-data-block="try">
                    @for ($i = 0; $i < 10; $i++)
                        <div data-type="footprint"
                            class="h-[30px] mr-2 mb-2 bg-[#38c3ff33] text-[#38c3ff] rounded-lg inline-flex items-center px-4 text-[16px]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor
                </div>
            </div>
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <span class="font-bold mr-3">Catch</span>
                <div class="flex-1 flex flex-wrap" data-data-block="catch">
                    @for ($i = 0; $i < 10; $i++)
                        <div data-type="footprint"
                            class="h-[30px] mr-2 mb-2 bg-[#38c3ff33] text-[#38c3ff] rounded-lg inline-flex items-center px-4 text-[16px]">
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
    <div data-block-wrapper="logic_and" class="inline-flex shadow-block bg-white p-4 rounded-lg mt-4">
        <span class="text-blue-500 mr-3 w-[20px] h-[20px] flex justify-center items-center">
            <i class="fa-solid fa-face-smile"></i>
        </span>
        <div class="flex-1 text-[16px] flex">
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <div class="flex-1 flex flex-wrap" data-data-block="logicA">
                    @for ($i = 0; $i < 2; $i++)
                        <div data-type="footprint"
                            class="h-[30px] mr-2 mb-2 bg-[#38c3ff33] text-[#38c3ff] rounded-lg inline-flex items-center px-4 text-[16px]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor
                </div>
            </div>
            <span class="px-4 font-bold">AND</span>
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <div class="flex-1 flex flex-wrap" data-data-block="logicB">
                    @for ($i = 0; $i < 3; $i++)
                        <div data-type="footprint"
                            class="h-[30px] mr-2 mb-2 bg-[#38c3ff33] text-[#38c3ff] rounded-lg inline-flex items-center px-4 text-[16px]">
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
    <div data-block-wrapper="logic_or" class="inline-flex shadow-block bg-white p-4 rounded-lg mt-4">
        <span class="text-purple-800 mr-3 w-[20px] h-[20px] flex justify-center items-center">
            <i class="fa-solid fa-face-smile"></i>
        </span>
        <div class="flex-1 text-[16px] flex">
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <div class="flex-1 flex flex-wrap" data-data-block="logicA">
                    @for ($i = 0; $i < 1; $i++)
                        <div data-type="footprint"
                            class="h-[30px] mr-2 mb-2 bg-[#38c3ff33] text-[#38c3ff] rounded-lg inline-flex items-center px-4 text-[16px]">
                            <span class="mr-4"><i class="fa-solid fa-arrows-left-right-to-line"></i></span>
                            <span>HS_123</span>
                        </div>
                    @endfor
                </div>
            </div>
            <span class="px-4 font-bold">OR</span>
            <div class="bg-stone-100 p-4 rounded-lg flex mb-3">
                <div class="flex-1 flex flex-wrap" data-data-block="logicB">
                    @for ($i = 0; $i < 1; $i++)
                        <div data-type="footprint"
                            class="h-[30px] mr-2 mb-2 bg-[#38c3ff33] text-[#38c3ff] rounded-lg inline-flex items-center px-4 text-[16px]">
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
