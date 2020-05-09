import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props: any) {
  const classes = useStyles();
  const { shopName, address, index, companyName } = props;

  return (
    <Card
      style={{ marginTop: 15, marginLeft: 10, marginRight: 10 }}
      className={classes.root}
    >
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        ></Typography>
        <Typography variant="h5" component="h2">
          {shopName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary"></Typography>
        <Typography variant="body2" component="p">
          <br />
          {address}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          style={{
            color: "black",
            textDecoration: "none",
          }}
          to={{
            pathname: `/${companyName}/${index}`,
          }}
        >
          <Button color="primary" variant="contained" size="small">
            Go to map
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
