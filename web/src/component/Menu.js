import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {Link} from "react-router-dom";

const LinkStyle = {
    margin: "0px",
    color: "rgb(25, 118, 210)",
    textDecoration: "none",
};

export default function Menu() {
  return (
    <Container maxWidth="sm" direction="row">
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Link style={LinkStyle} to="/" title="Главная"><center><h2>Главная</h2></center></Link>
            </Grid>
            <Grid item xs={6}>
                <Link style={LinkStyle} to="/files" title="Файлы"><center><h2>Файлы</h2></center></Link>
            </Grid>
        </Grid>
    </Container>
  );
}