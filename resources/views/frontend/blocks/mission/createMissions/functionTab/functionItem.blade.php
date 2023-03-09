<div class="function-list-item {{ $type !== 'gpio' ? 'hidden' : '' }} w-full h-full overflow-y-auto overflow-x-hidden">
    <div class="function-list-item-{{ $type }}"></div>
    <div data-type="{{$type}}" class="flex justify-center items-center bg-[rgba(204,204,204,0.2)] opacity-60 px-5 py-3 mb-2 point-id-8 text-[20px] h-[40px] text-sky-500 hover:opacity-100 btn create-function-btn">
        <i class="fa-solid fa-plus"></i>
    </div>
</div>
