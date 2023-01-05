<div class="text-xl md:text-3xl absolute right-0 bottom-0 flex">
    <div class="update-btn-wrapper mr-2 {{ $type . '-update-btn-wrapper' }} hidden">
        <button
            class="btn bg-yellow-400 text-[#fff] self-end px-4 py-2 rounded-md {{ $type . '-update-cancel' }}">Cancel</button>
        <button
            class="btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md {{ $type . '-update-btn' }}">Update</button>
    </div>
    <button
        class=" btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md {{ 'submit-btn-' . $type }}">Create</button>
</div>
