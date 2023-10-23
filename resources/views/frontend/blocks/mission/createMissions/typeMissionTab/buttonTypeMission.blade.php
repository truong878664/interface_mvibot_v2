<div class="flex rounded-tl-md font-bold">
    <div class="update-wrapper-{{ $type }} hidden">
        <button
            class=" btn mr-2 bg-yellow-400 text-[#fff] self-end px-4 py-1 rounded-md cancel-{{ $type }} ">Cancel</button>
        <button
            class=" btn mr-2 bg-[#0f6cbd] text-[#fff] self-end px-4 py-1 rounded-md update-{{ $type }} ">Update</button>
    </div>

    <div class="add-wrapper-{{ $type }}">
        <button class=" btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-1 rounded-md add-mission-{{ $type }}"
            type="save">Save</button>
        <button class=" btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-1 rounded-md add-mission-{{ $type }}"
            type="add">Add</button>
    </div>
</div>
