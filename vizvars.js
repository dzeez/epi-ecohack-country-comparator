var data = {
"year": 2012, 
"data": {
"countries": [{
"id":"AFG",
"name": "Afghanistan",
"categories":[
{"name": "EH_HealthImpacts", "value": 66.83},
{"name": "EV_BiodiversityHabitat", "value": 10.83},
{"name": "EH_WaterSanitation", "value": 90.83},
{"name": "EV_Agriculture", "value": 44.83}
]
},
{
"id":"GER",
"name": "Germany",
"categories":[
{"name": "EH_HealthImpacts", "value": 60.83},
{"name": "EV_BiodiversityHabitat", "value": 80.83},
{"name": "EH_WaterSanitation", "value": 60.83},
{"name": "EV_Agriculture", "value": 33.83}
]
}]
}
};

var issueColors = {
"EH_HealthImpacts" : "#ff9600", // Health impacts
"EH_AirQuality" : "#f7c80b", // Air quality
"EH_WaterSanitation" : "#ff6d24", // Water & Sanitation
"EV_WaterResources" : "#7993f2", // Water Resources
"EV_Agriculture" : "#2e74ba", // Agriculture
"EV_Forests" : "#009bcc", // Forest
"EV_Fisheries" : "#008c8c", // Fisheries
"EV_BiodiversityHabitat" : "#00ccaa", // Biodiversity
"EV_ClimateEnergy" : "#1cb85d", // Climate & Energy
};

cat = {"EH_HealthImpacts" :
{"title": "Health Impacts"}, 
"EH_AirQuality" :
{"title": "Air Quality"}, 
"EH_WaterSanitation" :
{"title": "Water and Sanitation"},
"EV_WaterResources" :
{"title": "Water Resources"},
"EV_Agriculture" :
{"title": "Agriculture"},
"EV_Forests" :
{"title": "Forests"},
"EV_Fisheries" :
{"title": "Fisheries"},
"EV_BiodiversityHabitat" :
{"title": "Biodiversity and Habitat"},
"EV_ClimateEnergy" :
{"title": "Climate and Energy"}
};

var states = new Array("Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic", "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Greenland", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Mongolia", "Morocco", "Monaco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "San Marino", " Sao Tome", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe");
