import React, { useState, useEffect } from "react";
import { Box, Grid, Modal, Typography } from "@material-ui/core";
import "./styles.scss";
import { Link } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";
import SmsIcon from "@material-ui/icons/Sms";
import EmailIcon from "@material-ui/icons/Email";

export default function SubMenu(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [props.open]);

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        //  aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box className="contentModal">
          {props.isPets && (
            <>
              <div className="titleSubmemu">Mascota</div>
              <Grid container alignItems="center">
                <Grid xs={3}>
                  <Link onClick={props.edit} className="with-icon">
                    <EditIcon className="borderIcon" fontSize="medium" />
                    Modificar mascota
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3}>
                  <Link onClick={props.delete} className="with-icon">
                    <DeleteIcon className="borderIcon" fontSize="medium" />
                    Eliminar mascota
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
          {props.isOwner && (
            <>
              <div className="titleSubmemu">Mascota</div>
              <Grid container alignItems="center">
                <Grid xs={3}>
                  <Link onClick={props.edit} className="with-icon">
                    <EditIcon className="borderIcon" fontSize="medium" />
                    Modificar propietario
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3}>
                  <Link onClick={props.delete} className="with-icon">
                    <DeleteIcon className="borderIcon" fontSize="medium" />
                    Eliminar propietario
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3}>
                  <Link onClick={props.option2} className="with-icon">
                    <AddIcon className="borderIcon" fontSize="medium" />
                    Agregar Mascota
                  </Link>
                </Grid>
              </Grid>
              <div className="titleSubmemu">comunicación</div>
              <Grid container alignItems="center">
                <Grid xs={3}>
                  <Link className="with-icon">
                    <PhoneIcon className="borderIcon" fontSize="medium" />
                    Llamar
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3}>
                  <Link className="with-icon">
                    <WhatsAppIcon className="borderIcon" fontSize="medium" />
                    WhatsApp
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3}>
                  <Link className="with-icon">
                    <SmsIcon className="borderIcon" fontSize="medium" />
                    SMS
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3}>
                  <Link className="with-icon">
                    <EmailIcon className="borderIcon" fontSize="medium" />
                    Email
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
          <div className="titleSubmemu">Mascotas</div>

          <Grid container alignItems="center">
            <Grid xs={3}>
              <Link to="/pets" className="with-icon">
                <SearchIcon className="borderIcon" fontSize="medium" />
                Buscar mascota
              </Link>
            </Grid>
            <Grid className="with-icon" xs={3}>
              <Link
                to={!props.addPet && "/pets/create"}
                onClick={props.addPet && props.addPet}
                className="with-icon"
              >
                <AddIcon className="borderIcon" fontSize="medium" />
                Nueva mascota
              </Link>
            </Grid>
          </Grid>
          <div className="titleSubmemu">Propietarios</div>
          <Grid container alignItems="center">
            <Grid className="with-icon" xs={3}>
              <Link to="/owners" className="with-icon">
                <SearchIcon className="borderIcon" fontSize="medium" />
                Buscar propietario
              </Link>
            </Grid>
            <Grid className="with-icon" xs={3}>
              <Link
                to={!props.addOwner && "/owners/create"}
                onClick={props.addOwner && props.addOwner}
                className="with-icon"
              >
                <AddIcon className="borderIcon" fontSize="medium" />
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
