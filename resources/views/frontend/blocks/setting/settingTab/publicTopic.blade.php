<div class="setting-detail flex hidden">
    <div class="inline-block mx-auto py-10 px-5 border bg-[#F2EAE8]">
        {{-- @include('frontend.blocks.setting.selectRobot', ['tab' => 'public-topic']) --}}
        <textarea id="public-data" class="block  p-4 outline-none border bg-[rgba(255,255,255,0.43)]" rows="10" cols="50"
            placeholder="Enter topic..."></textarea>
        <button id="public-btn"
            class="px-4 py-2 bg-main text-[#fff]  font-bold btn rounded-md opacity-80 hover:opacity-100 float-right mt-4">
            <span class="mr-2">Send topic</span>
            <i class="fa-regular fa-paper-plane"></i>
        </button>
    </div>
</div>
