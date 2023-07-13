<div class="text-2xl font-bold">
    @if ($type == 'gpio_wake_up')
        <div class="mt-4 absolute left-0 bottom-2 px-2 w-full flex justify-between">
            <label for="wake-up"
                class="btn bg-yellow-400 text-[#fff] self-end px-4 py-2 text-2xl rounded-md cancel-wake_up">Cancel</label>
            <button
                class="btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 text-2xl rounded-md save-wake-up-btn">Save</button>
        </div>
    @elseif ($type == 'gpio_stop')
        <div class="mt-4 absolute left-0 bottom-2 px-2 w-full flex justify-between">
            <label for="stop"
                class="btn bg-yellow-400 text-[#fff] self-end px-4 py-2 rounded-md cancel-stop">cancel</label>
            <button
                class="btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md save-stop-btn">Save</button>
        </div>
    @else
        <div class="absolute right-6 bottom-6 flex data-[valid=disable]:pointer-events-none data-[valid=disable]:opacity-70 z-10 group" data-name="action-form-function" data-type="{{$type}}" data-status="create"
            data-valid="">
            <div class="mr-2 hidden group-data-[status='update']:block">
                <button
                    class="btn bg-yellow-400 text-[#fff] self-end px-4 py-2 rounded-md" data-type="{{$type}}" data-button-function-kind="cancel">Cancel</button>
                <button
                    class="btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md " data-type="{{$type}}" data-button-function-kind="update">Update</button>
            </div>
            <div class="hidden group-data-[status='create']:block">
                <button data-type="{{$type}}" data-button-function-kind="create"
                class="btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md create-step-btn">Create</button>
            </div>
        </div>
    @endif
</div>
