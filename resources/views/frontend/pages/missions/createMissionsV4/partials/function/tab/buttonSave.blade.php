<div class="font-bold">
    @if ($type == 'wakeup')
        <div class="absolute left-0 bottom-2 mt-4 flex w-full justify-between px-2">
            <label for="wake-up"
                class="btn cancel-wake_up self-end rounded-md bg-yellow-400 px-4 py-1 text-[#fff]">Cancel</label>
            <button data-kind-button="save" data-type="{{ $type }}"
                class="btn save-wake-up-btn self-end rounded-md bg-[#0f6cbd] px-4 py-1 text-[#fff]">
                Save
            </button>
        </div>
    @elseif ($type == 'stop')
        <div class="absolute left-0 bottom-2 mt-4 flex w-full justify-between px-2">
            <label for="stop"
                class="btn cancel-stop self-end rounded-md bg-yellow-400 px-4 py-1 text-[#fff]">cancel</label>
            <button data-kind-button="save" data-type="{{ $type }}"
                class="btn save-stop-btn self-end rounded-md bg-[#0f6cbd] px-4 py-1 text-[#fff]">
                Save
            </button>
        </div>
    @else
        <div class="group absolute right-6 bottom-6 z-10 flex data-[valid=disable]:pointer-events-none data-[valid=disable]:opacity-70"
            data-name="action-form-function" data-type="{{ $type }}" data-status="create" data-valid="">
            <div class="mr-2 hidden group-data-[status='update']:block">
                <button class="btn self-end rounded-md bg-yellow-400 px-4 py-1 text-[#fff]"
                    data-type="{{ $type }}" data-button-function-kind="cancel">
                    Cancel
                </button>
                <button class="btn self-end rounded-md bg-[#0f6cbd] px-4 py-1 text-[#fff]"
                    data-type="{{ $type }}" data-button-function-kind="update">
                    Update
                </button>
            </div>
            <div class="hidden group-data-[status='create']:block">
                <button data-type="{{ $type }}" data-button-function-kind="create"
                    class="btn create-step-btn self-end rounded-md bg-[#0f6cbd] px-4 py-1 text-[#fff]">
                    Create
                </button>
            </div>
        </div>
    @endif
</div>
