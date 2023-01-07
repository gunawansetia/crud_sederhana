import { Breadcrumbs } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

export default function BreadCrumbs(props) {
  const { homeActive, addActive } = props;
  return (
    <>
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 3 }}>
          <Link className={`Link ${homeActive}`} to="/">
            Home
          </Link>
          <Link className={`Link ${addActive}`} to="/add">
            Add
          </Link>
        </Breadcrumbs>
      </Container>
    </>
  );
}
