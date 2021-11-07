import React, { useEffect, useState } from "react";
import Drawer from "../../Components/Drawer";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import { Box, CircularProgress, Checkbox } from "@material-ui/core";

import dog from "../../Assets/img/dog-blue.svg";

import Dialog from "../Dialog";

import { DeletePet } from "../../Services/Pet";

import EditPet from "../../Containers/EditPet";

import "./styles.scss";
import SubMenu from "../Menu/SubMenu";

const PetNameStyle = {
  color: "#fff",
  padding: "1em",
  paddingLeft: "0",
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Menu(props) {
  const [state, setState] = React.useState({
    open: false,
    newPetFlag: true,
  });

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [closeMenu, setCloseMenu] = React.useState(false);

  useEffect(() => {
    //console.log('props pet', props)
    setState({ ...state, newPetFlag: props.open });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setState({ ...state, open: false, newPetFlag: false });
  };

  const handleOpen = () => {
    setState({ ...state, open: true });
  };

  const deletePet = () => {
    let dataAux = {
      id_mascota: props.data.id,
      id_veterinaria: props.sesion.veterinary.id,
      token: props.sesion.access_token,
    };
    //console.log(dataAux)
    setFetching(true);
    DeletePet(
      dataAux,
      (resp) => {
        console.log(resp);
        props.onDelete();
        setState({ ...state, open: false });
        setFetching(false);
      },
      (error) => {
        setFetching(false);
      }
    );
  };

  const handleOpenDialog = () => {
    setCloseMenu(!closeMenu);
    setOpenDialog(!openDialog);
  };

  const handleOpenEdit = () => {
    setCloseMenu(!closeMenu);
    setOpenEdit(!openEdit);
  };

  const handleUpdate = (resp) => {
    props.onUpdate(resp);
    handleOpenEdit();
  };

  return (
    <div className="pet-wraper">
      {/*console.log(props.data)*/}
      <span className="pointer" onClick={handleOpen}>
        {props.children}
      </span>

      <Drawer
        open={!state.open ? props.open && state.newPetFlag : state.open}
        onClose={handleClose}
        className="pet-drawer"
      >
        <div>
          <div className="pet-header">
            <div>
              <ArrowBackIcon
                style={{ color: "#fff", cursor: "pointer" }}
                onClick={handleClose}
              />
              <div className="pet-data">
                <span className="dog-img">
                  <img src={dog} alt="dog" style={{ width: "100%" }} />
                </span>
                <span style={PetNameStyle}>{props.data.nombre}</span>
              </div>
            </div>
            {/*<div>
                  <span><DeleteIcon/></span>
                </div>*/}

            {/* <span className="header-crud">
              <span onClick={handleOpenEdit}>
                <CreateIcon />
              </span>
              <span onClick={handleOpenDialog} className="pointer">
                <DeleteIcon />
              </span>
            </span> */}
          </div>

          <div className="pet-info">
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Mascota" {...a11yProps(0)} />
                  {/*<Tab label="Clínica" {...a11yProps(1)} />
                      <Tab label="Suministro" {...a11yProps(2)} />*/}
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                {!fetching ? (
                  <div className="pet-info-basic">
                    {props.data.propietarios !== undefined && (
                      <div>
                        {props.data.propietarios.map((d) => {
                          return (
                            <div key={d.id} className="pet-avatar">
                              <span className="dog-img">
                                <PersonIcon />
                              </span>
                              <div className="pet-avatar-info">
                                <span>{d.nombre}</span>
                                <span>Información</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="pet-details">
                      <div className="item-detail">
                        <span className="title">Nombre</span>
                        <span>{props.data.nombre}</span>
                      </div>
                      <div className="item-detail">
                        <span className="title">Raza</span>
                        <span>{props.data.nombre_raza}</span>
                      </div>
                      <div className="item-detail">
                        <span className="title">Pelaje</span>
                        <span>{props.data.nombre_pelaje}</span>
                      </div>
                      <div className="item-detail">
                        <span className="title">Sexo</span>
                        <span>{props.data.nombre_sexo}</span>
                      </div>
                      <div className="item-detail">
                        <span className="title">Caracter</span>
                        <span>{props.data.nombre_caracter}</span>
                      </div>
                      <div className="item-detail">
                        <span className="title">Nacimiento</span>
                        <span>{props.data.nacimiento}</span>
                      </div>
                      <div className="item-detail">
                        <span className="title">Peso</span>
                        <span>{props.data.peso}</span>
                      </div>
                      <div className="item-detail">
                        <span className="title">Chip</span>
                        <span>{props.data.chip}</span>
                      </div>
                      <div className="item-detail">
                        <span className="title">Notas</span>
                        <span>{props.data.notas}</span>
                      </div>

                      <div className="item-detail item-detail-deseso">
                        <Checkbox
                          checked={props.data.deceso + "" === "1"}
                          name="deceso"
                          disabled={true}
                        />
                        <span>Deceso</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <span className="spiner-container">
                    <CircularProgress />
                  </span>
                )}
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
            </div>
          </div>
        </div>
        <Dialog
          open={openDialog && !fetching}
          message="¿Eliminar?"
          handleClose={handleOpenDialog}
          okText="OK"
          CloseText="CANCELAR"
          handleOk={deletePet}
        />

        <SubMenu
          isPets
          edit={handleOpenEdit}
          delete={handleOpenDialog}
          open={closeMenu}
        />
        <EditPet
          open={openEdit}
          data={props.data}
          onClose={handleOpenEdit}
          races={props.races}
          furs={props.furs}
          sexes={props.sexes}
          characteres={props.characteres}
          sesion={props.sesion}
          onUpdate={handleUpdate}
          id_propietario={props.id_propietario}
        />
      </Drawer>
    </div>
  );
}
