import {React,useEffect,useState} from "react"
import "./../css/Manga.css"
import star from "./../images/star.png"
import Card from "./Card"

export default function Manga(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    
    const [manga,setManga] = useState([])

    const[recommandation,setRecommandation] = useState([])

    const[others,setOthers] = useState([])

   
    
    useEffect(()=>{
        async function getData(){
            try{
                let response = await fetch(`http://localhost:3000/api/manga/${id}`)
                if(!response.ok){
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setManga(data);
                
            }catch(error){
            
                console.error("Error fetching data: ",error);
            
            }
        }
        getData();
    },[])


    

    useEffect(() => {
        if (manga.recommandation) {
            setRecommandation(manga.recommandation.slice(1, -1).split(','));
        }

        if(manga.other_manga){
            setOthers(manga.other_manga.replace('"',).split(',').filter((val)=> val!==manga.id.toString()));
            
        }
    }, [manga.recommandation,manga.other_manga]);


    
    return(
        <div className="container-a">
            <div className="container-manga">
                <div className="container-stats">
                    <img src={manga.image_url} alt="" />
                    <h4>Volumes: <span className="h4_span">{manga.volumes ===0 ? 'Unknow': manga.volumes}</span>  | Chapters: <span className="h4_span">{manga.chapters===0 ? 'Unknow':manga.chapters}</span></h4>
                </div>
                
                <div className="container-manga-description">
                    
                    <h1>{manga.title} <span className="status">{'('+manga.status+')'}</span></h1>
                    <div className="manga-score">
                        <h2>Rank: <span className="h4_span">{'#'+manga.rank}</span> | Popularity: <span className="h4_span">{'#'+manga.popularity}</span> </h2>
                        <img src={star} alt="" /> 
                        <h3><span className="h4_span">{manga.score}</span></h3>
                    </div>
                    <h4>Authors: <span className="h4_span">{manga.authors}</span></h4>
                    <h4>Date: <span className="h4_span">{manga.start_date+' - '+(manga.end_date==='0001-01-01' ? 'in progress' : manga.end_date)}</span></h4>
                    <h4>Demographics: <span className="h4_span">{manga.demos}</span></h4>
                    <h4>Genres: <span className="h4_span">{manga.genres}</span></h4>
                    <h4>Themes: <span className="h4_span">{manga.themes}</span></h4>
                    <h4>Synopsis:<p className="description">{manga.description}</p></h4>
                </div>
            </div>
            
            
            {others.length > 0 &&(
                <div className="container-recommandation">
                <h1>OTHER MANGAS FROM THE AUTHOR</h1>     
                    <div className="recommandation">
                    {  
                        others.map((x)=>
                                <Card key={x} id={x}/>
                        )
                    }
                    </div>
                </div>
            )}

            <div className="container-recommandation">
                <h1>MANGAS YOU CAN LIKE</h1>     
                <div className="recommandation">
                {  
                    recommandation.map((x)=>
                            <Card key={x} id={x}/>
                    )
                }
                </div>
            </div>
        </div>
    )
}