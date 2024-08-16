function searchKeyWord() {
  const input = document.getElementById("keyWord").value.toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
        let cities;
        if (input.includes("beach")) {
            cities = data.beaches.map((city) => city);
        } else if (input.includes("temple")) {
            cities = data.temples.map((city) => city);
        } else {
            const country = data.countries.find(
            (item) => item.name.toLowerCase() === input
            );
            if (country) {
            cities = country.cities.map((city) => city);

            } else {
            resultDiv.innerHTML = "Condition not found.";
            }
        }
        console.log(cities);
        cities.forEach(city => {
            let cityCard = document.createElement('li')
            cityCard.innerHTML += `<img src="https://i.postimg.cc/DZPV9stg/255795-city-sky-building-night-architecture-travel-world-hd-wallpaper-748x421.jpg" alt="">`;
            cityCard.innerHTML +=   `<div>
                                        <h1>${city.name}</h1>
                                        <p>${city.description}</p>
                                        <button>Visit</button>
                                    </div>`
            resultDiv.append(cityCard)
        });
        
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML = "An error occurred while fetching data.";
    });
}
const clearInput = () => {
    document.getElementById("keyWord").value = ""
};

const btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", searchKeyWord);

const btnClear = document.getElementById("btnClear");
btnClear.addEventListener("click", clearInput);
