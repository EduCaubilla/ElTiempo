/* 
Se añade evento con las variables longitud y latitud para determinar la localización.
Se asignan las variables de los tags del HTML donde se insertará la info sacada de la API.
*/
window.addEventListener('DOMContentLoaded', () => {
  let long;
  let lat;
  let temperaturaDescripcion = document.querySelector(
    ".descripcion"
  );
  let temperaturaGrados = document.querySelector(".temperatura-grados");
  let localizacionZona = document.querySelector(".localizacion-zona");
  let humedadRelativa = document.querySelector(".humedad");

/* 
Se determina la localización del usuario.
Se añade la conexión a la API por medio de un proxy "público" (+-pirata)
porque la API no da accesso desde local host.
*/

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=sp&appid=ac66ce66d63a767ee28425bcb8f4ef36`;

/* 
Utilizamos fetch para sacar la información y con el console.log conseguimos, 
por medio de la consola de chrome, los datos del archivo json que comprobamos
para ver su estructura (que luego necesitaremos saber para sacar los datos).

Entonces con el .then sacamos la información que necesitamos;
la temperatura se denomina temp en el archivo json de la api, así que creamos
una constante (const) que asigna la ruta dónde encontrar el dato según la estructura
del json de la api (data.temp).
Como la humedad (humidity) también está en el mismo apartado de la estructura,
podemos sacar los dos datos en la misma consulta (fetch).

Como el nombre (name) del lugar asignaso a las coordenadas está en otro apartado
debemos hacer una segunda consulta con fetch. Y lo mismo para la descripción (description).

*/
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temp, humidity } = data.main;
          temperaturaGrados.textContent = Math.floor(temp) + (' ºC');
          humedadRelativa.textContent = ('humedad: ') + humidity + (' %');
        });

      fetch(api)
        .then(response => {
          return response.json();
        })

        .then(data => {
          const { name } = data;
          localizacionZona.textContent = name.toUpperCase();
        });

      fetch(api)
        .then(response => {
          return response.json();
        })

        .then(data => {
          const { description } = data.weather[0];
          temperaturaDescripcion.textContent = description;
          
        });

/* 
Una vez tenemos los datos, pasamos a poner el icono.
Los iconos están sacados de Github
https: //github.com/erikflowers/weather-icons

Por medio de una fuente que contiene los iconos y una asignación de
la clase (wi wi-cloudy) se ve el icono de, en este caso, nubes.
Por esto, primero asignamos el inicio de la clase a la variable prefix.

Para conseguir que el icono coincida con los datos del json de la api,
necesitamos, primero, un id que corresponde a la descripción de la
la segunda parte de la clase al que asignamos la variable code.
Un vez tenemos este dato, insertamos la variable weatherIcons con un listado
sacado de Github:
https: //gist.github.com/tbranyen/62d974681dea8ee0caa1#file-icons-json
En este listado se asigna cada número de código a la descripción (icon)
que nos servirá para definir la segunda parte de la clase que definirá
el icono final.

*/

      fetch(api)
        .then(response => {
          return response.json();
        })

        .then(data => {
        let prefix = 'wi wi-';
        let code = data.weather[0].id;

        let weatherIcons = {
        "200": {
          "label": "thunderstorm with light rain",
          "icon": "storm-showers"
        },

        "201": {
          "label": "thunderstorm with rain",
          "icon": "storm-showers"
        },

        "202": {
          "label": "thunderstorm with heavy rain",
          "icon": "storm-showers"
        },

        "210": {
          "label": "light thunderstorm",
          "icon": "storm-showers"
        },

        "211": {
          "label": "thunderstorm",
          "icon": "thunderstorm"
        },

        "212": {
          "label": "heavy thunderstorm",
          "icon": "thunderstorm"
        },

        "221": {
          "label": "ragged thunderstorm",
          "icon": "thunderstorm"
        },

        "230": {
          "label": "thunderstorm with light drizzle",
          "icon": "storm-showers"
        },

        "231": {
          "label": "thunderstorm with drizzle",
          "icon": "storm-showers"
        },

        "232": {
          "label": "thunderstorm with heavy drizzle",
          "icon": "storm-showers"
        },

        "300": {
          "label": "light intensity drizzle",
          "icon": "sprinkle"
        },

        "301": {
          "label": "drizzle",
          "icon": "sprinkle"
        },

        "302": {
          "label": "heavy intensity drizzle",
          "icon": "sprinkle"
        },

        "310": {
          "label": "light intensity drizzle rain",
          "icon": "sprinkle"
        },

        "311": {
          "label": "drizzle rain",
          "icon": "sprinkle"
        },

        "312": {
          "label": "heavy intensity drizzle rain",
          "icon": "sprinkle"
        },

        "313": {
          "label": "shower rain and drizzle",
          "icon": "sprinkle"
        },

        "314": {
          "label": "heavy shower rain and drizzle",
          "icon": "sprinkle"
        },

        "321": {
          "label": "shower drizzle",
          "icon": "sprinkle"
        },

        "500": {
          "label": "light rain",
          "icon": "rain"
        },

        "501": {
          "label": "moderate rain",
          "icon": "rain"
        },

        "502": {
          "label": "heavy intensity rain",
          "icon": "rain"
        },

        "503": {
          "label": "very heavy rain",
          "icon": "rain"
        },

        "504": {
          "label": "extreme rain",
          "icon": "rain"
        },

        "511": {
          "label": "freezing rain",
          "icon": "rain-mix"
        },

        "520": {
          "label": "light intensity shower rain",
          "icon": "showers"
        },

        "521": {
          "label": "shower rain",
          "icon": "showers"
        },

        "522": {
          "label": "heavy intensity shower rain",
          "icon": "showers"
        },

        "531": {
          "label": "ragged shower rain",
          "icon": "showers"
        },

        "600": {
          "label": "light snow",
          "icon": "snow"
        },

        "601": {
          "label": "snow",
          "icon": "snow"
        },

        "602": {
          "label": "heavy snow",
          "icon": "snow"
        },

        "611": {
          "label": "sleet",
          "icon": "sleet"
        },

        "612": {
          "label": "shower sleet",
          "icon": "sleet"
        },

        "615": {
          "label": "light rain and snow",
          "icon": "rain-mix"
        },

        "616": {
          "label": "rain and snow",
          "icon": "rain-mix"
        },

        "620": {
          "label": "light shower snow",
          "icon": "rain-mix"
        },

        "621": {
          "label": "shower snow",
          "icon": "rain-mix"
        },

        "622": {
          "label": "heavy shower snow",
          "icon": "rain-mix"
        },

        "701": {
          "label": "mist",
          "icon": "sprinkle"
        },

        "711": {
          "label": "smoke",
          "icon": "smoke"
        },

        "721": {
          "label": "haze",
          "icon": "day-haze"
        },

        "731": {
          "label": "sand, dust whirls",
          "icon": "cloudy-gusts"
        },

        "741": {
          "label": "fog",
          "icon": "fog"
        },

        "751": {
          "label": "sand",
          "icon": "cloudy-gusts"
        },

        "761": {
          "label": "dust",
          "icon": "dust"
        },

        "762": {
          "label": "volcanic ash",
          "icon": "smog"
        },

        "771": {
          "label": "squalls",
          "icon": "day-windy"
        },

        "781": {
          "label": "tornado",
          "icon": "tornado"
        },

        "800": {
          "label": "clear sky",
          "icon": "sunny"
        },

        "801": {
          "label": "few clouds",
          "icon": "cloudy"
        },

        "802": {
          "label": "scattered clouds",
          "icon": "cloudy"
        },

        "803": {
          "label": "broken clouds",
          "icon": "cloudy"
        },

        "804": {
          "label": "overcast clouds",
          "icon": "cloudy"
        },

        "900": {
          "label": "tornado",
          "icon": "tornado"
        },

        "901": {
          "label": "tropical storm",
          "icon": "hurricane"
        },

        "902": {
          "label": "hurricane",
          "icon": "hurricane"
        },

        "903": {
          "label": "cold",
          "icon": "snowflake-cold"
        },

        "904": {
          "label": "hot",
          "icon": "hot"
        },

        "905": {
          "label": "windy",
          "icon": "windy"
        },

        "906": {
          "label": "hail",
          "icon": "hail"
        },

        "951": {
          "label": "calm",
          "icon": "sunny"
        },

        "952": {
          "label": "light breeze",
          "icon": "cloudy-gusts"
        },

        "953": {
          "label": "gentle breeze",
          "icon": "cloudy-gusts"
        },

        "954": {
          "label": "moderate breeze",
          "icon": "cloudy-gusts"
        },

        "955": {
          "label": "fresh breeze",
          "icon": "cloudy-gusts"
        },

        "956": {
          "label": "strong breeze",
          "icon": "cloudy-gusts"
        },

        "957": {
          "label": "high wind, near gale",
          "icon": "cloudy-gusts"
        },

        "958": {
          "label": "gale",
          "icon": "cloudy-gusts"
        },

        "959": {
          "label": "severe gale",
          "icon": "cloudy-gusts"
        },

        "960": {
          "label": "storm",
          "icon": "thunderstorm"
        },

        "961": {
          "label": "violent storm",
          "icon": "thunderstorm"
        },

        "962": {
          "label": "hurricane",
          "icon": "cloudy-gusts"
        }
        };

        //Creamos variable que busca el id del listado y lo convierte en el texto
        let newIcon = weatherIcons[code].icon;

        //Para que se muestren los iconos apropiados se ha de definir si es día o noche
        const date = new Date();
        const sunrise = new Date(data.sys.sunrise * 1000); //Convertir código unix a hora
        const sunset = new Date(data.sys.sunset * 1000);

        /* Definimos las horas para asignar que es de día */
        if (
          date >= sunrise &&
          date < sunset
        ) {
          newIcon = "day-" + newIcon;
        } 
        
        // o de noche
        else if (date >= sunset ) {
          newIcon = "night-" + newIcon;
        }

        //Juntamos el prefijo necesario con el texto día o noche + descripción 
        newIcon = prefix + newIcon;

        //asginamos el texto con prefijo y definición a la clase del HTML
        document.getElementById("icon").className = newIcon;

      });

    });
  } 
  
  //En caso de que el usuario no acepte la localización se envia un mensaje de error
  else {
    let errorText = "Por favor activa tu ubicación para determinar la temperatura.";

    document.getElementById("localizacion").textContent = errorText;
  }

  

});

