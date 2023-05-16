<div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
    <button data-action="decrement" data-math="minus" data-parameter={{$parameter}}
        class="bg-gray-300 text-gray-600 hover:text-gray-00 hover:bg-gray-400 hover:text-[#fff] h-full w-20 rounded-l cursor-pointer outline-none math-parameter-btn">
        <span class="m-auto text-2xl font-thin">−</span>
    </button>
    <input type="number"
        class="parameter-item outline-none border-none max-w-[70px] focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700"
        name="{{$parameter}}" value="0">
    <button data-action="increment" data-math="plus" data-parameter={{$parameter}}
        class="bg-gray-300 text-gray-600 hover:text-gray-00 hover:bg-gray-400 hover:text-[#fff] h-full w-20 rounded-r cursor-pointer math-parameter-btn">
        <span class="m-auto text-2xl font-thin">+</span>
    </button>
</div>