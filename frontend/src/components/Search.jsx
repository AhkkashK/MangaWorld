import React  from "react";
import { useState,useEffect } from "react";
import Card from "./Card";
import "./../css/Search.css"


export default function Search(){
    const [result,setResult]= useState("");
    const [data,setData] = useState([]);
    const [demographics,setDemographics]= useState([]);
    const [genres,setGenres]= useState([]);
    const [themes,setThemes]= useState([]);
    
    
    function handleSubmit(e){
        e.preventDefault();
        
        async function getData(){
            try{
                const response = await fetch("http://localhost:3000/api/manga",{
                    method : "POST",
                    headers :{
                        'Content-Type':'application/json'
                        },
                    body :  JSON.stringify({
                        demographics :demographics,
                        genres:genres,
                        themes:themes,
            })})
            if(!response.ok){
                throw new Error(response.status);
            }else{
            const d = await response.json();
            setData(d);
            }
            }catch(error){
                console.error("Error sending  data: ",error)
            }
        
        }
        getData();

    }
    


    useEffect(()=>{
        async function getData(){
            try{
                const response = await fetch("http://localhost:3000/api/manga");
                if(!response.ok){
                    throw new Error(response.status);
                }else{
                const d = await response.json();
                setData(d);
                }
            }catch(error){
                console.error("Error fetching data: ",error)
            }
        }
        getData();
        
        
    },[])

    


    function handleData(e,listes){
        if (e.target && e.target.value) {
            var value  = e.target.value
           
                switch(listes){

                    case "demographics": 
                        if (demographics.includes(value)) {
                            setDemographics(demographics.filter((val) => val !== value));
                        }else{
                            setDemographics([...demographics, value]);
                        }
                        break;
                    case "genres":
                        if (genres.includes(value)) {
                            setGenres(genres.filter((val) => val !== value));
                        }else{
                            setGenres([...genres, value]);
                        }
                        break;
                    case "themes":
                        if (themes.includes(value)) {
                            setThemes(themes.filter((val) => val !== value));
                        }else{
                            setThemes([...themes, value]);
                        }
                        break;
                    default:
                        break;

                }
            }
        }
       
    function handleReset(e){
        e.preventDefault();
        var checkbox = document.getElementById("form").querySelectorAll('input[type=checkbox]:checked');
        checkbox.forEach((box)=>{
            box.checked = false;
        })

        setDemographics([]);
        setGenres([]);
        setThemes([]);

        
       async function getData(){
        
            try{
                const response = await fetch("http://localhost:3000/api/manga");
                if(!response.ok){
                    throw new Error(response.status);
                }else{
                const d = await response.json();
                setData(d);
                }
            }catch(error){
                console.error("Error fetching data: ",error)
            }
        }
        getData();
       
    }

    
    
   
    return(     
        <div className="search-container">
            <input type="text" placeholder="Search..." onChange={(e)=>setResult(e.target.value)} className="searchbar"/>
            <div className="filter-container">
                <form onSubmit={handleSubmit} onReset={handleReset} id ="form" action="">

                    <h3>Demographics</h3>
                    <input type="checkbox" name="" id="" value="Seinen" onChange={(e)=>handleData(e,"demographics")}/> Seinen
                    <input type="checkbox" name="" id="" value="Shoujo" onChange={(e)=>handleData(e,"demographics")} /> Shoujo
                    <input type="checkbox" name="" id="" value="Shounen" onChange={(e)=>handleData(e,"demographics")} /> Shounen
                    <input type="checkbox" name="" id="" value="Josei" onChange={(e)=>handleData(e,"demographics")} /> Josei
                    <input type="checkbox" name="" id="" value="Kids" onChange={(e)=>handleData(e,"demographics")} /> Kids

                    <h3>Genres</h3>
                    <input type="checkbox" name="" id="" value="Action" onChange={(e)=> handleData(e,"genres")} /> Action
                    <input type="checkbox" name="" id="" value="Action" onChange={(e)=> handleData(e,"genres")} /> Adventure
                    <input type="checkbox" name="" id="" value="Award Winning" onChange={(e)=> handleData(e,"genres")} /> Award Winning
                    <input type="checkbox" name="" id="" value="Boys Love" onChange={(e)=> handleData(e,"genres")} /> Boys Love
                    <input type="checkbox" name="" id="" value="Comedy" onChange={(e)=> handleData(e,"genres")} /> Comedy
                    <input type="checkbox" name="" id="" value="Drama" onChange={(e)=> handleData(e,"genres")} /> Drama
                    <input type="checkbox" name="" id="" value="Ecchi" onChange={(e)=> handleData(e,"genres")} /> Ecchi
                    <input type="checkbox" name="" id="" value="Fantasy" onChange={(e)=> handleData(e,"genres")} /> Fantasy
                    <input type="checkbox" name="" id="" value="Girls Love" onChange={(e)=> handleData(e,"genres")} /> Girls Love
                    <input type="checkbox" name="" id="" value="Gourmet" onChange={(e)=> handleData(e,"genres")} /> Gourmet
                    <input type="checkbox" name="" id="" value="Horror" onChange={(e)=> handleData(e,"genres")} /> Horror
                    <input type="checkbox" name="" id="" value="Mystery" onChange={(e)=> handleData(e,"genres")} /> Mystery
                    <input type="checkbox" name="" id="" value="Romance" onChange={(e)=> handleData(e,"genres")} /> Romance
                    <input type="checkbox" name="" id="" value="Sci-Fi" onChange={(e)=> handleData(e,"genres")} /> Sci-Fi
                    <input type="checkbox" name="" id="" value="Slice of Life" onChange={(e)=> handleData(e,"genres")} /> Slice of Life
                    <input type="checkbox" name="" id="" value="Sports" onChange={(e)=> handleData(e,"genres")} /> Sports
                    <input type="checkbox" name="" id="" value="Supernatural" onChange={(e)=> handleData(e,"genres")} /> Supernatural
                    <input type="checkbox" name="" id="" value="Suspense" onChange={(e)=> handleData(e,"genres")} /> Suspense

                    <h3>Themes</h3>
                    <input type="checkbox" name="" id="theme-1" value="Anthropomorphic" onChange={(e)=> handleData(e,"themes")} /> Anthropomorphic
                    <input type="checkbox" name="" id="theme-2" value="CGDCT" onChange={(e)=> handleData(e,"themes")} /> CGDCT
                    <input type="checkbox" name="" id="theme-3" value="Childcare" onChange={(e)=> handleData(e,"themes")} /> Childcare
                    <input type="checkbox" name="" id="theme-4" value="Combat Sports" onChange={(e)=> handleData(e,"themes")} /> Combat Sports
                    <input type="checkbox" name="" id="theme-5" value="Crossdressing" onChange={(e)=> handleData(e,"themes")} /> Crossdressing
                    <input type="checkbox" name="" id="theme-6" value="Delinquents" onChange={(e)=> handleData(e,"themes")} /> Delinquents
                    <input type="checkbox" name="" id="theme-7" value="Detective" onChange={(e)=> handleData(e,"themes")} /> Detective
                    <input type="checkbox" name="" id="theme-8" value="Gag Humor" onChange={(e)=> handleData(e,"themes")} /> Gag Humor
                    <input type="checkbox" name="" id="theme-9" value="Gore" onChange={(e)=> handleData(e,"themes")} /> Gore
                    <input type="checkbox" name="" id="theme-10" value="Harem" onChange={(e)=> handleData(e,"themes")} /> Harem
                    <input type="checkbox" name="" id="theme-11" value="High Stakes Game" onChange={(e)=> handleData(e,"themes")} /> High Stakes Game
                    <input type="checkbox" name="" id="theme-12" value="Historical" onChange={(e)=> handleData(e,"themes")} /> Historical
                    <input type="checkbox" name="" id="theme-13" value="Isekai" onChange={(e)=> handleData(e,"themes")} /> Isekai
                    <input type="checkbox" name="" id="theme-14" value="Iyashikei" onChange={(e)=> handleData(e,"themes")} /> Iyashikei
                    <input type="checkbox" name="" id="theme-15" value="Love Polygon" onChange={(e)=> handleData(e,"themes")} /> Love Polygon
                    <input type="checkbox" name="" id="theme-16" value="Magical Sex Shift" onChange={(e)=> handleData(e,"themes")} /> Magical Sex Shift
                    <input type="checkbox" name="" id="theme-17" value="Mahou Shoujo" onChange={(e)=> handleData(e,"themes")} /> Mahou Shoujo
                    <input type="checkbox" name="" id="theme-18" value="Martial Arts" onChange={(e)=> handleData(e,"themes")} /> Martial Arts
                    <input type="checkbox" name="" id="theme-19" value="Mecha" onChange={(e)=> handleData(e,"themes")} /> Mecha
                    <input type="checkbox" name="" id="theme-20" value="Medical" onChange={(e)=> handleData(e,"themes")} /> Medical
                    <input type="checkbox" name="" id="theme-21" value="Memoir" onChange={(e)=> handleData(e,"themes")} /> Memoir
                    <input type="checkbox" name="" id="theme-22" value="Military" onChange={(e)=> handleData(e,"themes")} /> Military
                    <input type="checkbox" name="" id="theme-23" value="Music" onChange={(e)=> handleData(e,"themes")} /> Music
                    <input type="checkbox" name="" id="theme-24" value="Mythology" onChange={(e)=> handleData(e,"themes")} /> Mythology
                    <input type="checkbox" name="" id="theme-25" value="Organized Crime" onChange={(e)=> handleData(e,"themes")} /> Organized Crime
                    <input type="checkbox" name="" id="theme-26" value="Otaku Culture" onChange={(e)=> handleData(e,"themes")} /> Otaku Culture
                    <input type="checkbox" name="" id="theme-27" value="Parody" onChange={(e)=> handleData(e,"themes")} /> Parody
                    <input type="checkbox" name="" id="theme-28" value="Performing Arts" onChange={(e)=> handleData(e,"themes")} /> Performing Arts
                    <input type="checkbox" name="" id="theme-29" value="Pets" onChange={(e)=> handleData(e,"themes")} /> Pets
                    <input type="checkbox" name="" id="theme-30" value="Psychological" onChange={(e)=> handleData(e,"themes")} /> Psychological
                    <input type="checkbox" name="" id="theme-31" value="Racing" onChange={(e)=> handleData(e,"themes")} /> Racing
                    <input type="checkbox" name="" id="theme-32" value="Reincarnation" onChange={(e)=> handleData(e,"themes")} /> Reincarnation
                    <input type="checkbox" name="" id="theme-33" value="Reverse Harem" onChange={(e)=> handleData(e,"themes")} /> Reverse Harem
                    <input type="checkbox" name="" id="theme-34" value="Romantic Subtext" onChange={(e)=> handleData(e,"themes")} /> Romantic Subtext
                    <input type="checkbox" name="" id="theme-35" value="Samurai" onChange={(e)=> handleData(e,"themes")} /> Samurai
                    <input type="checkbox" name="" id="theme-36" value="School" onChange={(e)=> handleData(e,"themes")} /> School
                    <input type="checkbox" name="" id="theme-37" value="Showbiz" onChange={(e)=> handleData(e,"themes")} /> Showbiz
                    <input type="checkbox" name="" id="theme-38" value="Space" onChange={(e)=> handleData(e,"themes")} /> Space
                    <input type="checkbox" name="" id="theme-39" value="Strategy Game" onChange={(e)=> handleData(e,"themes")} /> Strategy Game
                    <input type="checkbox" name="" id="theme-40" value="Super Power" onChange={(e)=> handleData(e,"themes")} /> Super Power
                    <input type="checkbox" name="" id="theme-41" value="Survival" onChange={(e)=> handleData(e,"themes")} /> Survival
                    <input type="checkbox" name="" id="theme-42" value="Team Sports" onChange={(e)=> handleData(e,"themes")} /> Team Sports
                    <input type="checkbox" name="" id="theme-43" value="Time Travel" onChange={(e)=> handleData(e,"themes")} /> Time Travel
                    <input type="checkbox" name="" id="theme-44" value="Vampire" onChange={(e)=> handleData(e,"themes")} /> Vampire
                    <input type="checkbox" name="" id="theme-45" value="Video Game" onChange={(e)=> handleData(e,"themes")} /> Video Game
                    <input type="checkbox" name="" id="theme-46" value="Villainess" onChange={(e)=> handleData(e,"themes")} /> Villainess
                    <input type="checkbox" name="" id="theme-47" value="Visual Arts" onChange={(e)=> handleData(e,"themes")} /> Visual Arts
                    <input type="checkbox" name="" id="theme-48" value="Workplace" onChange={(e)=> handleData(e,"themes")} /> Workplace
                    <div className="search-button">
                        <button type="submit" >Submit</button>
                        <button type="reset">Clear</button>
                    </div>
                    
                </form>
            </div>
            <div className="container-card">
            {data.filter((x)=> {
                if (result === ""){
                    return true
                }else if (x.title.toLowerCase().includes(result.toLowerCase())){
                    return x
                }

            }).map((x)=>      
                        <Card key={x.id} id={x.id}/>
                )}
            </div> 
        </div>

    )
}