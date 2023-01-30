<select name=""
    class="text-[16px] outline-none border rounded-md bg-main text-[#fff] px-4 py-2 mb-2 cursor-pointer choose_robot {{ $tab }}">
    <option value="">choose robot</option>
    @foreach ($allRobot as $item)
        <option value="{{ $item['name_seri'] }}">{{ $item['name_seri'] }}</option>
    @endforeach
</select>
