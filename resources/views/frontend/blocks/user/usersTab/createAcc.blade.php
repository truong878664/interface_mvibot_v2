<div
    class="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] z-40 flex justify-center items-center user-setting-detail hidden">
    <div class="bg-stone-50 z-50 w-[400px] p-4 rounded-t-lg">
        <div class="flex justify-between text-[16px] border-b border-b-stone-500 pb-4 text-[#333]">
            <button
                class="px-4 py-1 btn rounded-lg border border-yellow-500 text-yellow-500 close-tab-user">Cancel</button>
            <span class="">Create new user</span>
            <button class="px-4 py-1 btn rounded-lg border bg-main text-[#fff] create-btn">Create</button>
        </div>

        <div class="py-4">

            {{-- <div class="flex text-[16px] justify-end mb-6">
                <span class="mr-4 paddword">UserName</span>
                <input type="text" class="px-2 py-1 w-3/5 create-username">
            </div> --}}

            <div class="text-[16px] mb-6 flex flex-col items-end">
                <div class="flex justify-end w-full ">
                    <span class="mr-4">UserName</span>
                    <input type="text" class="px-2 py-1 w-3/5 create-username">
                </div>
                <span class="text-red-400 text-xl span-create-username"></span>

            </div>

            <div class="text-[16px] mb-6 flex flex-col items-end">
                <div class="flex justify-end w-full">
                    <span class="mr-4">Password</span>
                    <input type="text" class="px-2 py-1 w-3/5 create-password">
                </div>
                <span class="text-red-400 text-xl span-create-password"></span>

            </div>

        </div>
    </div>
</div>
