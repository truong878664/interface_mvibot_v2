<p class="heading-form-mission">Footprint</p>
<form action="">
    {{-- <label for="name-footprint">Name footprint</label> <br> --}}
    {{-- <input id="name-footprint" type="text" > --}}
    <div class="footprint-img" style="background-image:url('/img/footprint.png');" class="img-footprint">
        <div class="input-footprint-wrapper top-footprint">
            <input type="number" class=" input-footprint" placeholder="front">
            <span>cm</span>
        </div>

        <div class="input-footprint-wrapper right-footprint">
            <input type="number" class=" input-footprint" placeholder="right">
            <span>cm</span>
        </div>

        <div class="input-footprint-wrapper left-footprint">
            <input type="number" class="left-footprint input-footprint" placeholder="left">
            <span>cm</span>
        </div>

        <div class="input-footprint-wrapper bottom-footprint">
            <input type="number" class="bottom-footprint input-footprint" placeholder="behind">
            <span>cm</span>
        </div>

    </div>

    <button class="add-btn submit-btn">Add</button>

</form>
