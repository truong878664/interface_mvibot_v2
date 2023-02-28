export function showStep() {
    $$(".show-step-btn").forEach((element) => {
        element.onclick = (e) => {
            const missionItems = e.target
                .closest(".mission-item")
                .querySelectorAll(".step-hidden");

            missionItems.forEach((item) => {
                item.classList.toggle("hidden");
            });
            e.target.innerHTML == '<i class="fa-regular fa-eye-slash"></i>'
                ? (e.target.innerHTML = '<i class="fa-regular fa-eye"></i>')
                : (e.target.innerHTML =
                      '<i class="fa-regular fa-eye-slash"></i>');
        };
    });
}

export function showAllStep() {
    $(".check-show-step").checked =
        localStorage.getItem("isShowAllStep") === "true";

    if ($(".check-show-step").checked) {
        $$(".step-hidden").forEach((element) => {
            element.classList.remove("hidden");
        });

        $$(".show-step-btn").forEach((element) => {
            element.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
        });
    } else {
        $$(".step-hidden").forEach((element) => {
            element.classList.add("hidden");
        });

        $$(".show-step-btn").forEach((element) => {
            element.innerHTML = '<i class="fa-regular fa-eye"></i>';
        });
    }

    $(".check-show-step").onchange = (e) => {
        if (e.target.checked) {
            $$(".step-hidden").forEach((element) => {
                element.classList.remove("hidden");
            });

            $$(".show-step-btn").forEach((element) => {
                element.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
            });

            localStorage.setItem("isShowAllStep", true);
        } else {
            $$(".step-hidden").forEach((element) => {
                element.classList.add("hidden");
            });

            $$(".show-step-btn").forEach((element) => {
                element.innerHTML = '<i class="fa-regular fa-eye"></i>';
            });
            localStorage.setItem("isShowAllStep", false);
        }
    };
}