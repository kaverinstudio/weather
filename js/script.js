$(document).ready(function () {
    if(YMaps.location){
        $("#city_search").val(YMaps.location.city)
        SearchWeather()
    }
})

function SearchWeather() {
    let city = document.city.city_search.value;
    let xmlRequest = new XMLHttpRequest(); // формируем запрос
    xmlRequest.open("GET", "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&lang=ru&appid=63564fa13272699cac68700de30af29e"); // отправляем
    xmlRequest.send(); // принимаем
    xmlRequest.onload = function () { // выполняем
        let i = JSON.parse(xmlRequest.responseText);
        if (i["cod"] === "200") {
            let arrTemp = [];
            for (let x = 0; x <= 7; x++) {

                arrTemp.push(Math.round(i["list"][x]["main"]["temp"]));
                document.getElementById("temp_now" + x).innerHTML = Math.round(i["list"][x]["main"]["temp"]) + "&#176;C";
                arrTemp.push(Math.round(i["list"][x + 1]["main"]["temp"]));

                document.getElementById("wind_speed" + x).innerHTML = i["list"][x]["wind"]["speed"] + " м/с";
                document.getElementById("city_name").innerText = i["city"]["name"];
                document.getElementById("weather_description" + x).innerText = i["list"][x]["weather"][0]["description"];

                let icon = i["list"][x]["weather"][0]["icon"];
                document.getElementById("weather_icon" + x).src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                let date = i["list"][0]["dt_txt"];
                let city_time = new Date();
                let hour = (city_time.getTimezoneOffset());
                let shift = hour * 60000;
                let timezone = new Date(((i["list"][x]["dt"]) * 1000) + ((i["city"]["timezone"]) * 1000) + shift).toString();
                document.getElementById("city_date_new").innerText = date.substr(0, 10);
                document.getElementById("city_date" + x).innerText = timezone.substr(16, 5);

                let temp_max = arrTemp[0];
                let temp_min = arrTemp[0];
                for (let a = 0; a < arrTemp.length + 1; a++) {
                    if (arrTemp[a] > temp_max) {
                        temp_max = arrTemp[a];
                    }
                    if (arrTemp[a] < temp_min) {
                        temp_min = arrTemp[a];
                    }
                }
                document.getElementById("temp_min").innerHTML = "Минимальная температура: " + temp_min + "&#176;C";
                document.getElementById("temp_max").innerHTML = "Максимальная температура: " + temp_max + "&#176;C";
            }

        } else {
            document.getElementById("hidden").hidden = true;
            document.getElementById("show").style.display = "block";
        }
    }
}

function show() {
    let res = document.getElementById("show");
    if (res.style.display === "block") {
        res.style.display = "none";
        document.getElementById("hidden").hidden = false;
        document.getElementById("city_search").value = "";
    }
}

