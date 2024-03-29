<form method="POST" action="{{ route("dashboard.missions.$v.create-missions.") }}"
    class="fixed top-0 left-0 right-0 bottom-0 z-20 inline-block">
    <div
        class="z-[40] absolute bg-[#fff] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg flex items-center flex-col p-4">
        <div class="flex flex-col">
            <label for="name-mission" class="mb-3">Name group missions</label>
            <input id="name-mission" type="text" class="px-4 py-2 mb-3" name="name" required>
            <input id="" type="text" class="hidden" name="type" value="{{ $type }}" required>
        </div>
        <button class="font-bold rounded-md px-4 py-2 bg-[#0f6cbd] text-[#fff] btn self-end">Create</button>
    </div>
    <label for="show-create-missions" class="absolute w-full h-full bg-[#0000004c]"></label>
    @csrf
</form>
