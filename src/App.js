import React, { useState, useEffect } from "react"
import './App.css';
import axios from "axios";


import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));;


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [filterParam, setFilterParam] = useState(["All"]);

  const [q, setQ] = useState("");
  const [searchParam] = useState(["name"]);


  const handlesc = (e) => {
    document.getElementById(e).style.color = "gray";
  }
  const handledb = (e) => {
    document.getElementById(e).style.color = "red";
  }

  useEffect(() => {
    axios("https://fakerapi.it/api/v1/products")
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data.data);

        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  console.log(items);

  function search(items) {
    return items.filter((item) => {
      for (var i = 0; i < item.tags.length; i++) {
        if (item.tags.includes(filterParam)) {
          return searchParam.some((newItem) => {
            return (
              item[newItem]
                .toString()
                .toLowerCase()
                .indexOf(q.toLowerCase()) > -1
            );
          });
        } else if (filterParam == "All") {
          return searchParam.some((newItem) => {
            return (
              item[newItem]
                .toString()
                .toLowerCase()
                .indexOf(q.toLowerCase()) > -1
            );
          });
        }
      }
    });

  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return (
      <div className="App">
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for..."
              value={q}
              style={{ align: "center", marginTop: 20, width: 300, borderRadius: 5, height: 30 }}
              onChange={(e) => setQ(e.target.value)}
            />

          </label>
        </div>
        <select
          onChange={(e) => {
            setFilterParam(e.target.value);
          }}
          style={{ marginTop: 20 }}
          className="custom-select"
          aria-label="Filter Countries By Region">
          <option value="All">Tags</option>
          <option value="sint">sint</option>
          <option value="voluptas">voluptas</option>
          <option value="eligendi">eligendi</option>
          <option value="rerum">rerum</option>
          <option value="nam">nam</option>
          <option value="quisquam">quisquam</option>
          <option value="est">est</option>
          <option value="quia">quia</option>
          <option value="aut">aut</option>
          <option value="quis">quis</option>
          <option value="en">en</option>
        </select>
        <span className="focus"></span>
        <Box sx={{ flexGrow: 1, padding: 10, paddingTop: 20 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {search(items).map((item) => (
              <Grid item xs={4} sm={4} md={4} key={item.id}>
                <Card key={item.id} sx={{ maxWidth: 370 }}>
                  <div>
                    <CardMedia
                      component="img"
                      height="194"
                      image={item.image}
                      alt="Paella dish"
                      sx={{ positon: "relative" }}
                    >
                    </CardMedia>
                    <IconButton id={item.id} onClick={() => handlesc(item.id)} onDoubleClick={() => handledb(item.id)} aria-label="add to favorites" sx={{ color: "gray", positon: "fixed", top: 0, right: 0 }}>
                      <FavoriteIcon />
                    </IconButton>
                  </div>


                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.price} $
                    </Typography>
                  </CardContent>

                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                      </Typography>
                      <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                      </Typography>
                      <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is absorbed,
                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                        mussels, tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don&apos;t open.)
                      </Typography>
                      <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        </ Box >

      </div>
    );
  }
}

export default App;


