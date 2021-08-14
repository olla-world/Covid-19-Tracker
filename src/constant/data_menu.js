export const data_menu = [{
    type: "vaccination",
    value: "0",
    color: "success",
    data_show: [{
        "tag_name": "last day vaccination",
        "value_key": "new_vaccinations"
    }, {
        "tag_name": "total vaccination",
        "value_key": "total_vaccinations"
    }, {
        "tag_name": "single dose",
        "value_key": "people_vaccinated"
    }, {
        "tag_name": "full dose",
        "value_key": "people_fully_vaccinated"
    }, {
        "tag_name": "vaccine name",
        "value_key": "vaccine_name"
    }]
}, {
    type: "cases",
    value: "1",
    color: "orange",
    data_show: [{
        "tag_name": "new cases",
        "value_key": "new_cases"
    }, {
        "tag_name": "total cases",
        "value_key": "total_cases"
    }]
}, {
    type: "deaths",
    value: "2",
    color: "red",
    data_show: [{
        "tag_name": "new deaths",
        "value_key": "new_deaths"
    }, {
        "tag_name": "total deaths",
        "value_key": "total_deaths"
    }]
}];