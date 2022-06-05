import React,{useState, useEffect} from 'react'
import logo1 from '../assets/images/Logo-3_-_Copy-removebg-preview.png'
import Sidebar from '../components/Sidebar'
import Card from '../components/Cards'
import LiveTvIcon from '@mui/icons-material/LiveTv';
import HistoryIcon from '@mui/icons-material/History';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import axios from 'axios'
import {styled} from '@mui/styles'


const LiveTvIco = styled(LiveTvIcon)({
  color:'black',
  width: "20px",
  height:"20px"
});
const HistoryIco = styled(HistoryIcon)({
  color:'black',
  width: "20px",
  height:"20px"
});
const CircleRoundedIco = styled(CircleRoundedIcon)({
  color:'red',
});
const Home = () => {
  const [dataProduct, setDataProduct] = useState([])
  const [liveStream,setLive]=useState([])
  const [sp1, setSp1] = useState(null)
  const [list,setLis]=useState([])
  let number=4
  let offset=0
  let layout='homelayout'
  const onClick1= (event) => {
    event.preventDefault();
    setSp1(event.target.id )
  }
  
  useEffect(() => {
    if(sp1==null)
    {
    axios.get(`${process.env.REACT_APP_HOST_URL}/api_public/live/`).then(res => {
      setLive(res.data.result)
    })
    }
    else
    {
      let history=sp1
      axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/checkLive/`, {
      history
    }).then(res => {
      setLive(res.data.result)
    })
    }
  }, [sp1]);
  
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOST_URL}/api_public/history/`).then(res => {
      setLis(res.data.result)
    })
  }, []);
  
  /* useEffect(() => {
    axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/list/product`, {
      number: query.pageSize || 9,
      page: query.page || 0,
      // ...{filter: (strFilter ? strFilter : '')}
    }).then(res => {
      setDataProduct(res.data.result)
    })
  }, []);*/
  useEffect(() => {
    axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/getlayout/`, {
        number,offset,layout
    }).then(res => {
      setDataProduct(res.data.result)
    })
  }, []);

    return (
      <>
          <Sidebar/>
      {/*product section start*/}
      {dataProduct?.map((item,index)=>(
        <>
        <hr></hr>
        <div className='container-fluid pt-5' key={index}>
        {item?.section.map((item1,index1)=>(
          <>
                  <br></br>
            <div className="heading">
             <h2 key={index1}>{item1.section_name}<span>Khuyến mãi</span></h2>
               <a href={`/layout_detail/${item1.uid}`} >Hiện thêm</a>
            </div>
            <br></br>
            <div className='row px-xl-5 pb-3'>
           
            {item1?.section_ref.map((item2,index2)=>(
              <Card data={item2} key={index2} ></Card>
            ))}
            </div>
          </>
          ))}
        </div> 
       </>
      ))}

    <div className='container-fluid pt-5'>
      <div className='row px-xl-5'>
        {/* Shop Sidebar start */}
        <div className='col-lg-3 col-md-12'>
          <div className='border-bottom mb-4 pb-4'>
            <h2 className='font-weight-semi-bold mb-4'><HistoryIco/>Livestream cũ</h2>
          </div>
          <form>
            {list?.map((item,index)=>(   
              <div className="card mb-3" style={{maxWidth:"540px"}} key={index}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={logo1} className="card-img"/>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text"><small className="text-muted">AT 3/12/2020</small></p>
                  <button id={item.uid} className="btn btn-primary" onClick={onClick1} >Xem ngay</button>
                  </div>
                </div>
              </div>
              </div>
                  ))}
            </form>
        </div>

        {/* Shop Product Start */}
        <div className='col-lg-9 col-md-12'>
            <div className='border-bottom mb-4 pb-4'>
              <h2 className='font-weight-semi-bold mb-4'><LiveTvIco/>Live stream</h2>
            </div>
            {liveStream?.map((item,index)=>(   
            <div className='row px-xl-5 pb-3' key={index}>
              <h2><CircleRoundedIco/>{item.title}</h2>
              <iframe src={item.source}  width="1280" height="720" style={{border:'none',overflow:'hidden'}} scrolling="no" allowfullcreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
            </div>
              ))}
        </div>
      </div>
    </div>        
      {/* last product section ends
      */}

      </>
    )
}

export default Home
