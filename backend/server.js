const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const  mysql = require('mysql2')
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.use(cors(
    {
        origin:'*'
    }
))

app.get('/api/manga',(req,res)=>{
    const connection = mysql.createConnection({
        host:'localhost',
        user:'aroot',
        password:'azerty1234',
        database:'anime_project'
    })
    
    connection.connect((err)=>{
        if(err){
            console.log("Error de connexion a la base de données")
        }
        else{
         
        }
    })
    
    connection.query(
    
        `
        select manga.*,author_list.authors, genre_list.genres, theme_list.themes, demo_list.demos from manga

        left join (
        select manga.id, group_concat(concat(authors.name,' ',authors.fullname,' (',role.role,')')) as authors from manga
        inner join manga_authors on manga.id = manga_authors.id_manga
        inner join authors on manga_authors.id_author = authors.id
        inner join role on manga_authors.id_role = role.id
        group by 1
        ) as author_list on manga.id = author_list.id
        
        left join (
        select manga.id, group_concat(genre.name_genre) as genres from manga
        inner join manga_genre on manga.id = manga_genre.id_manga
        inner join genre on manga_genre.id_genre = genre.id
        group by 1
        ) as genre_list on manga.id = genre_list.id
        
        left join (
        select manga.id, group_concat(theme.theme) as themes from manga
        inner join manga_theme on manga.id = manga_theme.id_manga
        inner join theme on manga_theme.id_theme = theme.id
        group by 1
        ) as theme_list on manga.id = theme_list.id
        
        left join (
        select manga.id, group_concat(demographic.demographic) as demos from manga
        inner join manga_demographic on manga.id = manga_demographic.id_manga
        inner join demographic on manga_demographic.id_demographic = demographic.id
        group by 1
        ) as demo_list on manga.id = demo_list.id 
        
        order by manga.rank;`
    
    ,(err,rows,fields)=>{
        
        if(err)throw err;
        res.json(rows)
    
    })


    connection.end();

})

app.post('/api/manga',(req,res)=>{

    const connection = mysql.createConnection({
        host:'localhost',
        user:'aroot',
        password:'azerty1234',
        database:'anime_project'
    })
    
    connection.connect((err)=>{
        if(err){
            console.log("Error de connexion a la base de données")
        }
        else{
         
        }
    })
    
    var demographics = req.body.demographics
    var genres = req.body.genres
    var themes = req.body.themes
    var query  = `
    select manga.*,author_list.authors, genre_list.genres, theme_list.themes, demo_list.demos from manga

    left join (
    select manga.id, group_concat(concat(authors.name,' ',authors.fullname,' (',role.role,')')) as authors from manga
    inner join manga_authors on manga.id = manga_authors.id_manga
    inner join authors on manga_authors.id_author = authors.id
    inner join role on manga_authors.id_role = role.id
    group by 1
    ) as author_list on manga.id = author_list.id
    
    left join (
    select manga.id, group_concat(genre.name_genre) as genres from manga
    inner join manga_genre on manga.id = manga_genre.id_manga
    inner join genre on manga_genre.id_genre = genre.id
    group by 1
    ) as genre_list on manga.id = genre_list.id
    
    left join (
    select manga.id, group_concat(theme.theme) as themes from manga
    inner join manga_theme on manga.id = manga_theme.id_manga
    inner join theme on manga_theme.id_theme = theme.id
    group by 1
    ) as theme_list on manga.id = theme_list.id
    
    left join (
    select manga.id, group_concat(demographic.demographic) as demos from manga
    inner join manga_demographic on manga.id = manga_demographic.id_manga
    inner join demographic on manga_demographic.id_demographic = demographic.id
    group by 1
    ) as demo_list on manga.id = demo_list.id 
    
    where `;
    console.log(req.body);

    if(demographics<=0 && genres<=0 && themes<=0){
        query = query.slice(0,-7);
        query +=` order by manga.rank;`

    }else{ 
        demographics?.forEach(element => {
            var condition = ` demo_list.demos like '%${element}%' and`
            query  += `${condition}` ;
        });

        genres?.forEach(element => {
            var condition = ` genre_list.genres like '%${element}%' and`
            query  += `${condition}` ;
        });

        themes?.forEach(element => {
            var condition = ` theme_list.themes like '%${element}%' and`
            query  += `${condition}`;
        });

        query = query.slice(0,-3);
        query+=` order by manga.rank;`
    }


    connection.query(query,(err,rows,fields)=>{
        
        if(err)throw err;
        res.json(rows)
    })

    connection.end();

})

app.get('/api/manga/popular',(req,res)=>{
    const connection = mysql.createConnection({
        host:'localhost',
        user:'aroot',
        password:'azerty1234',
        database:'anime_project'
    })
    
    connection.connect((err)=>{
        if(err){
            console.log("Error de connexion a la base de données")
        }
        else{
            
        }
    })
    
    connection.query(
        
    `
    select manga.*,author_list.authors, genre_list.genres, theme_list.themes, demo_list.demos from manga

    left join (
    select manga.id, group_concat(concat(authors.name,' ',authors.fullname,' (',role.role,')')) as authors from manga
    inner join manga_authors on manga.id = manga_authors.id_manga
    inner join authors on manga_authors.id_author = authors.id
    inner join role on manga_authors.id_role = role.id
    group by 1
    ) as author_list on manga.id = author_list.id

    left join (
    select manga.id, group_concat(genre.name_genre) as genres from manga
    inner join manga_genre on manga.id = manga_genre.id_manga
    inner join genre on manga_genre.id_genre = genre.id
    group by 1
    ) as genre_list on manga.id = genre_list.id
    left join (
    select manga.id, group_concat(theme.theme) as themes from manga
    inner join manga_theme on manga.id = manga_theme.id_manga
    inner join theme on manga_theme.id_theme = theme.id
    group by 1
    ) as theme_list on manga.id = theme_list.id

    left join (
    select manga.id, group_concat(demographic.demographic) as demos from manga
    inner join manga_demographic on manga.id = manga_demographic.id_manga
    inner join demographic on manga_demographic.id_demographic = demographic.id
    group by 1
    ) as demo_list on manga.id = demo_list.id

    order by manga.popularity asc
    limit 30 ;`
    
    ,(err,rows,fields)=>{
        
        if(err)throw err;
        res.json(rows)
    
    })


    connection.end();

})


app.get('/api/manga/:id',(req,res)=>{
    const connection = mysql.createConnection({
        host:'localhost',
        user:'aroot',
        password:'azerty1234',
        database:'anime_project'
    })
    
    connection.connect((err)=>{
        if(err){
            console.log("Error de connexion a la base de données")
        }
        else{
           
        }
    })
    
    connection.query(
        
    `
    select manga.*,author_list.authors, genre_list.genres, theme_list.themes, demo_list.demos, autres_oeuvres.other_manga from manga

    left join (
    select manga.id, group_concat(concat(authors.name,' ',authors.fullname,' (',role.role,')')) as authors from manga
    inner join manga_authors on manga.id = manga_authors.id_manga
    inner join authors on manga_authors.id_author = authors.id
    inner join role on manga_authors.id_role = role.id
    group by 1
    ) as author_list on manga.id = author_list.id
    
    left join (
    select manga.id, group_concat(genre.name_genre) as genres from manga
    inner join manga_genre on manga.id = manga_genre.id_manga
    inner join genre on manga_genre.id_genre = genre.id
    group by 1
    ) as genre_list on manga.id = genre_list.id
    
    left join (
    select manga.id, group_concat(theme.theme) as themes from manga
    inner join manga_theme on manga.id = manga_theme.id_manga
    inner join theme on manga_theme.id_theme = theme.id
    group by 1
    ) as theme_list on manga.id = theme_list.id
    
    left join (
    select manga.id, group_concat(demographic.demographic) as demos from manga
    inner join manga_demographic on manga.id = manga_demographic.id_manga
    inner join demographic on manga_demographic.id_demographic = demographic.id
    group by 1
    ) as demo_list on manga.id = demo_list.id
    
    left join (
    
		select manga.id,group_concat(other.listo) as other_manga from manga 
		left join Manga_Authors ma  on id = ma.id_manga
		left join Authors a on ma.id_author = a.id

		left join (
				select group_concat(manga.id) as listo,ma.id_author  from manga
				left join Manga_Authors ma  on id = ma.id_manga
				left join Authors a on ma.id_author = a.id
				group by 2
		) as other on ma.id_author = other.id_author
		where ma.id_role !=1 
		group by manga.id 
    ) as autres_oeuvres on manga.id = autres_oeuvres.id

    where manga.id = ?;`
    
    ,req.params.id,(err,rows,fields)=>{
        
        if(err)throw err;
        res.json(rows[0])
    
    })


    connection.end();

})



app.listen(3000,()=>{
    console.log('Serveur en ligne');
})



