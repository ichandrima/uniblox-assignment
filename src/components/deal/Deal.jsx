import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getDeals } from '../../redux/actions/dealActions';
import './deal.scss';

const Deals = () => {
  let dispatch = useDispatch();
  const dealData = useSelector((state) => state.dealReducer.deals);

  const settings = {
    arrows: false,
    dots: false,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    slidesToShow: window.innerWidth < 992 ? 3 : 4,
    slidesToScroll: 1,
  };

  useEffect(() => {
    !dealData?.length && dispatch(getDeals());
  }, []);

  return (
    <>
      <div className="section-title">Hot Deals</div>
      <div className="deal-container padding-main">
        <div className="deal-text">
          <h2 className="margin-0">Summer Sale</h2>
          <h1 className="margin-bottom-2">Up to 60%  off</h1>
        </div>
        <div className="slider-container">
          <Slider {...settings}>
            {dealData?.map((item) => {
              return (
                <div key={item.id}>
                  <div className="slider-card">
                    <img src={item.image} alt="slider" />
                    <div className="slider-card-content">
                      <div>{item.title}</div>
                      <div className="card-price">
                        <span className="old-price"><i className="fa fa-inr" aria-hidden="true"></i>{item.actualPrice}</span>
                        <span className="price"><i className="fa fa-inr" aria-hidden="true"></i>{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Deals;