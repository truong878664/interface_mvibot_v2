<div class="rounded-md p-4 bg-gray-50 shadow-sm flex flex-col border-2 border-black">
    <input class="sr-only" id="module_gpio_list" type="text" value="{{ json_encode($moduleGpios) }}">
    <div class="h-full flex flex-col">
        <div class="">
            <span class="font-bold">Module GPIO</span>
        </div>
        <div class="grid grid-cols-3 grid-rows-1 flex-1 gap-4 mx-auto w-full max-w-3xl" id="light-andon-wrapper">
            <div class="h-full">
                <div data-hs="hs-0010-0020-12" data-module="IB05_916b" class="andon aspect-square"></div>
                <span class="block text-center">HS0010 - HS0020 line 12</span>

            </div>
            <div class="h-full">
                <div data-hs="hs-0020-34-56" data-module="IB03_916b" class="andon aspect-square"></div>
                <span class="block text-center">HS0020 line 34,56</span>

            </div>
            <div class="h-full">
                <div data-hs="hs-2360-12-34" data-module="IB04_916b" class="andon aspect-square"></div>
                <span class="block text-center">HS2360 line 12,34</span>

            </div>
        </div>
        <div class="text-white text-xl ml-3 mt-5 flex gap-[50px] justify-center">
            <button data-type-button="setYellowSx"
                class="bg-yellow-500 p-5 shadow-light shadow-yellow-500/10 btn font-bold rounded-full">Kích đèn
                vàng ở
                SX</button>
            <button data-type-button="setRedSx"
                class="bg-red-500 p-5 shadow-light shadow-red-500/10 btn font-bold rounded-full">Kích đèn đỏ ở
                SX</button>
        </div>
    </div>
</div>
