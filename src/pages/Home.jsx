import React,{useState, useEffect,useContext} from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Card from '../components/Cards'
import LiveTvIcon from '@mui/icons-material/LiveTv';
import HistoryIcon from '@mui/icons-material/History';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import axios from 'axios'
import {styled} from '@mui/styles'
import { AuthContext } from '../context/AuthContext';

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
const Home = (query) => {
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
    axios.get('http://localhost:60000/api_public/live/').then(res => {
      setLive(res.data.result)
      console.log("live:",res.data.result)
    })
    }
    else
    {
      let history=sp1
      axios.post('http://localhost:60000/api_public/checkLive/', {
      history
    }).then(res => {
      setLive(res.data.result)
      console.log("live:",res.data.result)
    })
    }
  }, [sp1]);
  
  
  useEffect(() => {
    axios.get('http://localhost:60000/api_public/history/').then(res => {
      setLis(res.data.result)

    })
  }, []);
  
  /* useEffect(() => {
    axios.post('http://localhost:60000/api_public/list/product', {
      number: query.pageSize || 9,
      page: query.page || 0,
      // ...{filter: (strFilter ? strFilter : '')}
    }).then(res => {
      setDataProduct(res.data.result)
    })
  }, []);*/
  useEffect(() => {
    axios.post('http://localhost:60000/api_public/getlayout/', {
        number,offset,layout
    }).then(res => {
      setDataProduct(res.data.result)
      console.log("data:",res.data.result)
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
             <h2 key={index1}>{item1.section_name}<span>20% off</span></h2>
               <a href={`/layout_detail/${item1.uid}`} >view all</a>
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
              <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                 <a id={item.uid} onClick={onClick1} >{item.title}</a>
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
            <div className='row px-xl-5 pb-3'>
              <h2><CircleRoundedIco/>{item.title}</h2>
              <iframe src={item.source}  width="1280" height="720" style={{border:'none',overflow:'hidden'}} scrolling="no" frameborder="0" allowfullcreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
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
