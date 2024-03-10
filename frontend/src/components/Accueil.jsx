import React,{useState,useEffect} from "react"

import "./../css/Accueil.css"
import Card from "./Card";


export default function  Accueil() {
    const [populaire,setPopulaire]=useState([])

    useEffect(()=>{
            async function getData(){
                try{
                    const response = await fetch("http://localhost:3000/api/manga/popular");
                    if(!response.ok){
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    setPopulaire(data);
                }catch(error){
                    console.error('Error fetching data:',error);
                }
            }
            getData();
    },[])

    const [randomData,setRandomData] = useState([]);
    useEffect(()=>{
    async function getRandom(){
        try {
            const response = await fetch("http://localhost:3000/api/manga")
            if(!response.ok){
                throw new Error('Failed to fetch data')
            }
            const data = await response.json();
            let listeRandom = [];
            for(let i = 0;i<30;i++){
                let randomItem= data[Math.floor(Math.random()*data.length)];
                
                listeRandom.push(randomItem);
            }
            setRandomData(listeRandom);

        }catch(error){
            console.error('Error fetching data:',error);
        }
    }
    getRandom();
   },[])

   


    return (

        <div className="accueil">
            <h1>Welcome  to our platform ⛩️! Here you can get more information about your favourite mangas or discover new ones!</h1>
            <h1>MOST POPULARS</h1>
            <div className="container">
                {populaire.map((x)=>      
                        <Card id={x.id} />
                )}
             </div> 
             <h1>OUR DISCOVERY</h1>
            <div className="container">
                {randomData.map((x)=>      
                        <Card id={x.id} />
                )}
             </div>  
        </div>
        
    )
    
}