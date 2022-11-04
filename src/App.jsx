import { useState, useEffect } from 'react'
import './App.scss'
import { processtarot } from './utils/processtarot';
import Result from './components/Result';
import Loader from './components/Loader/index.jsx';
import useScrollDirection from "./hooks/useScrollDirection.js"
import Map from './components/Map/Map';
import Maptest from './components/Maptest';
const App = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("solar")
  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState("");
  const scrollDirection = useScrollDirection();

  // map states
  const [childClicked, setChildClicked] = useState(null);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [distance, setDistance] = useState(500)
  const handleChange = async (e) => {
    setUserType(e.target.value)
  }


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => console.log(userType), [userType]);



  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        console.log({ result })
      }, 2000);
    }
  }, [result]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    const newDistance = e.target[0].value;
    setDistance(newDistance)
  };
  return (
    <div className="formContainer flex-col justify-center items-center p-3">
      <div className={`sticky ${scrollDirection === "down" ? "-top-60" : "top-5"} m-4 transition-all duration-500 formWrapper`}>
        <span className="logo">산책로 확인</span>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-between'>
            <input className="normal text-sm text-center" placeholder="반경(100m)" />
            <div className="flex flex-col items-center justify-center gap-1">

            </div>

          </div>

          <button>반경 분석</button>

        </form>
      </div>
      {loading && <Loader />}
      {/* <Map
        setChildClicked={setChildClicked}
        setBounds={setBounds}
        setCoords={setCoords}
        coords={coords}
      // places={filteredPlaces.length ? filteredPlaces : places}
      /> */}
      <Maptest
        distance={distance}
        coords={coords}
        setBounds={setBounds}
        setCoords={setCoords}
      />
    </div>
  );
};

export default App;
