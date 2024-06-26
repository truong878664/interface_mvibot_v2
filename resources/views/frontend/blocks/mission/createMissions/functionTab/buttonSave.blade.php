<div class="font-bold">
    @if ($type == 'gpio_wake_up')
        <div class="mt-4 absolute left-0 bottom-2 px-2 w-full flex justify-between">
            <label for="wake-up"
                class="btn bg-yellow-400 text-[#fff] self-end px-4 py-1 rounded-md cancel-wake_up">Cancel</label>
            <button class="btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-1 rounded-md save-wake-up-btn">Save</button>
        </div>
    @elseif ($type == 'gpio_stop')
        <div class="mt-4 absolute left-0 bottom-2 px-2 w-full flex justify-between">
            <label for="stop"
                class="btn bg-yellow-400 text-[#fff] self-end px-4 py-1 rounded-md cancel-stop">cancel</label>
            <button class="btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-1 rounded-md save-stop-btn">Save</button>
        </div>
    @else
        <div class="absolute right-6 bottom-6 flex data-[valid=disable]:pointer-events-none data-[valid=disable]:opacity-70  z-10"
            data-valid="">
            <div class="update-btn-wrapper mr-2 {{ $type . '-update-btn-wrapper' }} hidden">
                <button
                    class="btn bg-yellow-400 text-[#fff] self-end px-4 py-1 rounded-md update-cancel-btn {{ $type . '-update-cancel' }}">Cancel</button>
                <button
                    class="btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-1 rounded-md {{ $type . '-update-btn' }}">Update</button>
            </div>
            <button
                class=" btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-1 rounded-md {{ 'submit-btn-' . $type }}">Create</button>
        </div>
    @endif
</div>
