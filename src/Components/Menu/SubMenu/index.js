import React, { useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";
import { Box, Grid, Modal, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "./styles.scss";
import { Label } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";

export default function SubMenu(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        //  aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box className="contentModal">
          <div className="titleSubmemu">Mascotas</div>

          <Grid container alignItems="center">
            <Grid xs={3}>
              <Link to="/pets" className="with-icon">
                <SearchIcon fontSize="large" />
                Buscar mascota
              </Link>
            </Grid>
            <Grid className="with-icon" xs={3}>
              <Link to="/pets" className="with-icon">
                <AddIcon fontSize="large" />
                Nueva mascota
              </Link>
            </Grid>
          </Grid>
          <div className="titleSubmemu">Propietarios</div>
          <Grid container alignItems="center">
            <Grid className="with-icon" xs={3}>
              <Link to="/owners" className="with-icon">
                <SearchIcon fontSize="large" />
                Buscar propietario
              </Link>
            </Grid>
            <Grid className="with-icon" xs={3}>
              <Link to="/owners" className="with-icon">
                <AddIcon fontSize="large" />
                Nuevo propietario
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <span className="plus-menu" onClick={() => setOpen(true)}>
        <AddCircleIcon />
      </span>
    </>
  );
}
