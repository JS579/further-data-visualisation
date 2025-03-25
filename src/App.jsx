import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);



function App() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState("")
  const [postcode, setPostcode] = useState("")
  const [labels, setLabels] = useState([])
  const [percentages, setPercentages] = useState([])

  const newLabelArr = []
  const newPercentageArr = []


  useEffect(() => {
    if(postcode !== ""){
    fetch(`https://api.carbonintensity.org.uk/regional/postcode/${postcode}
    `)
        .then((res) => {
            return res.json();
        })
        .then(({data}) => {
            data[0].data[0].generationmix.map((dataPoint)=>{
              newLabelArr.push(dataPoint.fuel)
              newPercentageArr.push(dataPoint.perc)
            }
            )
            setLabels(newLabelArr)
            setPercentages(newPercentageArr)
          })}
         }, [postcode])
        

         function handleInput(event) {
          setInput(event.target.value);
         }

         function handleSubmit(event) {
          event.preventDefault();
          setPostcode(input);
          setInput("");
      }

  
        const pie = {
          labels: labels,
          datasets: [{
            label: '%',
            data: percentages,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192 )',
              'rgb(153, 102, 255 )',
              'rgb(255, 159, 64 )',
              'rgb(255, 0, 0)',
              'rgb(0, 0, 0)',
              'rgb(255, 255, 255)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192 )',
              'rgb(153, 102, 255 )',
              'rgb(255, 159, 64 )',
              'rgb(255, 0, 0)',
              'rgb(0, 0, 0)',
              'rgb(255, 255, 255)'

            ],
            borderWidth: 1,
          },
        ]}
          
        

  return (
    <>
    <p>Carbon-Nation</p>
    <form onSubmit={handleSubmit}><input placeholder="enter postcode" onChange={handleInput} value={input}></input></form>
    <br/>
    <p>{postcode ? `Carbon data for ${postcode}` : null}</p>
    <Pie data={pie} />
<br/>
    {/* <ul>

      }
    </ul> */}

    </>
  )
}

export default App
