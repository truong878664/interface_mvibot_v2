<label for="" class="bg-[#0f6cbd] flex items-center text-[#fff] px-4 rounded-lg py-2">
    <select class="outline-none bg-[#0f6cbd] rounded" id="{{ $id }}">
        <option value="">Chose robot</option>
        @foreach ($robots as $robot)
            <option value="{{ $robot['name_seri'] }}">{{ $robot['name_seri'] }}</option>
        @endforeach
    </select>
</label>
