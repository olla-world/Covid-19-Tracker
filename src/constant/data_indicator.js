export const data_indicator =
{
    "people_vaccinated_per_hundred": {
        "headline": " Representing the number of single dose vaccinatin per million",
        "indicator": [
            {
                "title": "> 1500 ",
                "color": "#008000"
            }, {
                "title": "> 1000",
                "color": "#00e600"
            },{
                "title": "> 500",
                "color": "#4dff4d"
            }, {  "title": "> 100",
                "color": "#b3ffb3"
            }, {
                "title": "< 100",
                "color": "#e6ffe6"
            }

        ]
    },

    "total_cases_per_million": {
        "headline": " Representing the number of cases per million",
        "indicator": [
            {
                "title": "> 1500",
                "color": "#997300"
            },  {
                "title": "> 1000",
                "color": "#e6ac00"
            }, {
                "title": "> 500",
                "color": "#ffd24d"
            },{
                "title": "> 100",
                "color": "#ffecb3"
            }, {
                "title": "< 100",
                "color": "#fff9e6"
            }

        ]
    },

    "total_deaths_per_million": {
        "headline": " Representing the number of deaths per million",
        "indicator": [
            {
                "title": "> 1500",
                "color": "#800000"
            },  {
                "title": "> 1000",
                "color": "#e60000"
            },  {
                "title": "> 500",
                "color": "#ff4d4d"
            },  {
                "title": "> 100",
                "color": "#ffb3b3"
            }, {
                "title": "< 100",
                "color": "#ffe6e6"
            }

        ]
    }
}

export const getDataIndicator = (type) => data_indicator[`${type}`]
