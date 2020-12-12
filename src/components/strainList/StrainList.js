import React, { useEffect, useState } from 'react'
import axios from 'axios'
import imgGenerique from '../../assets/img/weed_cube 90.png'

const StrainList = () => {
const [getInfo, setGetInfo] = useState({name:'', race:'', desc:'', id:''})
const [inputRes, setInputRes] = useState("")
const [isLoading, setIsLoading] = useState(true)
const {REACT_APP_API_KEY, REACT_APP_STRAIN_URL} = process.env


useEffect(() => {
  const Url = `https://strainapi.evanbusse.com/QSQ1xL0/strains/search/name/${inputRes}`
  axios
  .get(Url)
  .then(res => {
    const strain = res.data;
    res.data.map( strains => ({
      name: `${strains.name}`,
      race:`${strains.race}`,
      desc:`${strains.desc}`,
      id:`${strains.id}`
    })
    )

    console.log('strain:', strain)
    setGetInfo(strain) && setIsLoading(false)
  })
  .then(strainsRace => {
  //   setGetInfo({
  //     name: `${strainsRace.name}`,
  //     race:`${strainsRace.race}`,
  //     desc:`${strainsRace.desc}`,
  //     id:`${strainsRace.id}`,
  //    });
     setIsLoading(false)
  })


},[inputRes])





  console.log("get info:", getInfo)
  console.log("get input value:", inputRes)

  return (
    <div>
      <div>Search By Race</div>
        <input value={inputRes} type='text' onChange={(e) => setInputRes(e.target.value)} />
      <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center'}}>
      {!isLoading ? getInfo.map( races => {
        const {name, race, desc, id} = races
          return (
            <div key={id} style={{maxWidth:'80%'}}>
              <p>{name}</p>
              <img style={{transform:'rotate(-45deg)', marginTop: 30, marginBottom:35}} src={imgGenerique} alt="weed" />
              <br />
              <sub>{race}</sub>
              <p>{desc}</p>
            </div>
            )
        }): (
          <p>Loading...</p>
        )}
        {JSON.stringify(getInfo)}
      </div>
    </div>
  )
}

export default StrainList
