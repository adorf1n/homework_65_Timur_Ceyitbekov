$(document).ready(function () {
  const apiUrl = "https://restcountries.com/v3.1/all";
  let countryData = [];
  function fetchCountries() {
    $.ajax({
      url: apiUrl,
      method: "GET",
      success: function (data) {
        countryData = data;
        renderCountryList(data);
      },
      error: function () {
        alert("Failed to fetch countries. Please try again later.");
      },
    });
  }

  function renderCountryList(countries) {
    $("#country-list").empty();
    countries.forEach((country) => {
      const listItem = `
              <li class="list-group-item d-flex justify-content-between align-items-center country-item" data-name="${country.name.common}">
                  ${country.name.common}
                  <span class="badge bg-primary rounded-pill">${country.region}</span>
              </li>
          `;
      $("#country-list").append(listItem);
    });
  }

  function fetchCountryDetails(countryName) {
    const countryUrl = `https://restcountries.com/v3.1/name/${countryName}`;
    $.ajax({
      url: countryUrl,
      method: "GET",
      success: function (data) {
        renderCountryDetails(data[0]);
      },
      error: function () {
        alert(
          "Failed to fetch country details. Please check the country name."
        );
      },
    });
  }

  function renderCountryDetails(country) {
    const detailsHtml = `
          <h3 class="text-center">${country.name.common}</h3>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          <p><strong>Capital:</strong> ${
            country.capital ? country.capital[0] : "N/A"
          }</p>
          <div class="text-center">
              <img src="${country.flags.png}" alt="${
      country.name.common
    } flag" class="img-fluid mt-3">
          </div>
      `;
    $("#country-details").html(detailsHtml);
  }

  function searchCountries(query) {
    const filteredCountries = countryData.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    renderCountryList(filteredCountries);
  }

  $("#search-btn").click(function () {
    const query = $("#search").val().trim();
    searchCountries(query);
  });

  $("#search").keypress(function (e) {
    if (e.which === 13) {
      e.preventDefault();
      const query = $(this).val().trim();
      searchCountries(query);
    }
  });

  $("#country-list").on("click", ".country-item", function () {
    const countryName = $(this).data("name");
    fetchCountryDetails(countryName);
  });

  fetchCountries();
});
