import React, { useEffect, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
function App() {

  const [search, updateSearch] = useState('Delhi');
  const [city, updateCity] = useState([]);
  const [data, setdata] = useState("");
  const [time, settime] = useState(new Date().toLocaleTimeString())
  const date = new Date().toLocaleDateString();



  useEffect(() => {

    async function getData() {
      try {

        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=57dc2c9ceff3366933bac0394afa3002`)
        const res = await data.json()
        console.log(res)
        updateCity(res);
      }
      catch (error) {
        console.log(error)
      }
    }

    getData()

  }, [search])


  useEffect(() => {

    const id = setInterval(() => {
      settime(
        new Date().toLocaleTimeString()
      )

      return (() => {
        clearInterval(id);
      })
    }, 1000)

  }, [])
  return (
    <>

      <div className='Container'>
        <p className='name'> Weather App</p>


        <div className='Weather_app'>

          <input type='search' style={{padding:"1px 0px"}} value={data} onChange={(event) => { setdata(event.target.value) }} />

          <button className='btn' onClick={() => updateSearch(data)}><SearchOutlinedIcon /></button>
          {!city.main ? (<div className=' no_data'>No Data Found</div>
          ) :
            (
              <div className='outerdata'>
                <div className='innerdata'>  <img className='imgsrc' src={`https://openweathermap.org/img/w/${city?.weather[0]?.icon}.png`} alt='sddsds' />
                  <p className='type'>{city?.weather[0]?.description}</p>
                </div>
                <div className='details'>

                  <div className='city'>{search}<span style={{ fontSize: "1rem" }}> {city?.sys?.country}</span>
                  </div>
                  <div className='city_temp' > <span>{city?.main?.temp}</span> °C</div>
                  <div className='min_max_temp'> Min: {city?.main?.temp_min} | Max: {city?.main?.temp_max}</div>
                  <div className="humidity">Humidity - {city?.main?.humidity} </div>
                  <div className='windSpeed'> WindSpeed - {city?.wind?.speed} km/h</div>
                  <div className='data'>{date}  at {time}</div>
                </div>
              </div>
            )}

        </div>
      </div>

    </>
  )
}

export default App