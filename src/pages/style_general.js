import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  // Root chung - khoang cach cho phep thu
  root: {
    padding: 10,
    minWidth: 750,
  },
  // Style header + Icon logo
  formpd: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 20,
    textAlign: "center"
  },
  rootPanel: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    display: 'flex',
    position: 'relative',
    marginTop: 30,
    flexDirection: 'column',
    padding: theme.spacing(2),
    paddingBottom: 25,
    width: '100%'
  },
  titlePanel: {
    margin: "10px 15px",
    position: 'relative',
    padding: 0
  },
  iconTitle: {
    display: "flex",
    float: "left",
    marginRight: 15,
    padding: 15,
    marginTop: -40,
    borderRadius: 3,
    backgroundColor: '#999',
    backgroundImage: 'linear-gradient(60deg, #50BC98, #2E9B93)',
    boxShadow: ' 0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(37, 66, 162,.4) '
  },
  iconAction: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    margin: "5px 4px 0px",
    width: 24,
    height: 24
  },
  contentTitle: {
    fontFamily: " 'Roboto', 'Helvetica', 'Arial' ",
    display: 'inline',
  },
  representImg: {
    width: 200,
    height: 100,
  },
  snackbarMessage: {
    padding: "0px !important",
  },

  // Style Button Submit
  // BUTTON: SUBMIT - BACK
  rootSubmit: {
    textAlign: "center",
    marginTop: 35
  },
  btnControlGeneral: {
    color: "#ffffff",
    margin: 20,
    padding: ".5rem 1rem",
    borderRadius: ".2rem"
  },
  imgEditView: {
    display: "block",
    maxWidth: 250,
    paddingTop: 20,
    margin: "auto"
  },


  // Style của toàn bộ TABLE
  titleTable: {
    margin: "10px 0px",
    fontWeight: 600,
    fontSize: 30,
    color: theme.palette.primary.main,
    '&:hover': {
      opacity: 0.7
    }
  },


  // Style Product
  rootDetailTable: {
    textAlign: "center",
    width: "100%",
    margin: 0,
    padding: 10
  },

  // Style Customer
  rootBasic: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    display: 'flex',
    position: 'relative',
    marginTop: 30,
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  title: {
    fontFamily: " 'Roboto', 'Helvetica', 'Arial' ",
    display: 'inline',
  },
  titleCustomer: {
    margin: "10px 15px",
    position: 'relative',
    padding: 0
  },
  btnPreview: {
    margin: '-5px 15px',
    float: "right"
  },
  rootAltPanel: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    padding: theme.spacing(2),
    width: '100%'
  },
  paddCollectionName: {
    paddingLeft: 15
  },
  iconback: {
    marginRight: 6
  },
  divider: {
    marinTop: 10,
    marginBottom: 10
  },
  timePicker: {
    width: "100%"
  },
  dialButton: {
    fontSize: "1rem"
  },
  genIcon: {
    color: "#FFF"
  },
  expandMoreIcon: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  btnExport: {
    backgroundColor: "#fbc531",
    color: "#FFF",
    margin: "0px 20px",
    padding: ".5rem 1rem",
    borderRadius: ".2rem",
    "&:hover": {
      backgroundColor: "#f1c40f"
    }
  },
  secondaryActionRoot: {
    paddingRight: "0px !important"
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formError: {
    position: 'absolute',
    width: 800,
    height: 850,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  btnSubmit: {
    textAlign: "center"
  },
  btnData: {
    margin: 20,
    padding: ".5rem 1rem",
    borderRadius: ".2rem"
  },
  // impTableContainer: {
  //     width:"100%",
  //     backgroundColor:"#FFF",
  //     padding:16,
  //     overflowX: "auto",
  //     boxShadow:"0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  //     borderRadius: ".5rem"
  // },
  inputTxt: {
    height: 75
  },
  mediaStyle: {
    width: "100%",
    display: "grid",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 20
  },
}));
