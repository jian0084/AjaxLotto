document.addEventListener("DOMContentLoaded", init);

let pages = []
let digits = 0;
let max = 0;
let nums = [];

function init() {

    document.getElementById("digits").focus();

    pages = document.querySelectorAll(".page");

    document.getElementById("btnSend").addEventListener("click", getNums.init);
    document.getElementById("btnBack").addEventListener("click", navigate);
}

let getNums = {

    url: "http://davidst.edumedia.ca/mad9014/nums.php",
    init: function () {

        let formData = new FormData();

        digits = document.getElementById("digits");
        max = document.getElementById("max");

        if (digits.value.length == 0) {
            alert("You must enter the number of digits");
            digits.focus();
            return;
        } else if (max.value.length == 0) {
            alert("You must enter the range");
            max.focus();
            return;
        } else {
            pages[0].classList.toggle("active");
            pages[1].classList.toggle("active");
        }

        formData.append("digits", digits.value);
        formData.append("max", max.value);

        let customOptions = {
            mode: "cors",
            method: "POST",
            body: formData
        };

        let request = new Request(getNums.url, customOptions);

        fetch(request)
            .then(function (response) {
                return response.json();
            })
            .then(displayResults)
            .catch((error) => console.log(error))
    }
}

let displayResults = function (data) {
//    console.log(data);
    if (data.code == 0) {
        let ul = document.querySelector(".num_list");
        let generatedNums = data.numbers
        generatedNums.forEach(function (item) {
            nums.push(item);
            let li = document.createElement("li");
            li.innerHTML = item;
            ul.appendChild(li);
        })
    }
}

function navigate() {
    pages[0].classList.toggle("active");
    pages[1].classList.toggle("active");
    document.getElementById("digits").value = "";
    document.getElementById("max").value = "";
}
