import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useDispatch } from 'react-redux';
import { useQuanLiPhim } from '../../storeToolKit/quanLiPhim/quanLiPhimSelector';
import { getMovieBannerList } from '../../storeToolKit/quanLiPhim/quanLiPhimReducer';

const contentStyle = {
  height: '100vh',
  lineHeight: '160px',
  textAlign: 'center',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
};

const HomeCarousel = () => {

  const dispatch = useDispatch()
  const { bannerList } = useQuanLiPhim()

  useEffect(() => {
    dispatch(getMovieBannerList())
  }, [])

  return (
    <div className='w-full' >
      <Carousel effect="fade" autoplay >
        {bannerList.map((item) => {
          return <div key={item.maBanner}>
            <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }} >
              <img className='w-full opacity-0' src={item.hinhAnh} alt={item.maPhim} />
            </div>
          </div>
        })}
      </Carousel>
    </div>


  )
}

export default HomeCarousel