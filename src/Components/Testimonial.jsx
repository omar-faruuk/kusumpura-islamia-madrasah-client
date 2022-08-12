import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Scrollbar, A11y, Virtual, Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
// const testimonial = [
//     {
//         id: 1,
//         img: '/teachers/head.jpg',
//         name: 'মোহাম্মদ কামাল উদ্দিন',
//         position: 'সভাপতি ',
//         title: 'মাদ্রাসা পরিচালনা ও বাস্তবায়ন পরিষদ',
//         subTitle: 'বাণী ',
//         speach: `কোরআন সুন্নাহর আলোকে দক্ষ ও যোগ্য সু-নাগরিক গড়ার প্রত্যয়ে" প্রতিষ্ঠিত কুসুমপুরা ইসলামিয়া দাখিল মাদ্রাসা। এই মাদ্রাসা এলাকার সর্বস্তরের ছেলে-মেয়েদের আধুনিক ও দ্বীনি শিক্ষার জ্ঞানার্জনের মাধ্যমে  সমৃদ্ধ সমাজ ও দেশ গঠনের নেতৃত্বের গুণ, যোগ্যতা ও দক্ষতা অর্জনের জোড়ালো ভূমিকা রাখবে ইনশা-আল্লাহ।
//         এই প্রতিষ্ঠান আল্লাহর প্রিয় নবী মোস্তফা সাল্লাল্লাহু আলাইহি ওয়াসাল্লামের প্রদর্শিত একমাত্র পথ "আহলে সুন্নাত ওয়াল জামা‘আত"-এর আদর্শ বিস্তারে অনন্য ভূমিকা  রাখবে।  এই মাদরাসাকে দেশের অন্যতম শীর্ষস্থানীয় দ্বীনি শিক্ষা প্রতিষ্ঠানে উন্নীত করার লক্ষ্যে  অভিজ্ঞ পরিচালনা পরিষদ, দক্ষ সুপারিন্টেন্ডেন্ট ও যোগ্য শিক্ষকমণ্ডলীর পরিচালনায় আন্তরিকতাপূর্ণ পাঠদানের পরিবেশে শিক্ষার্থীরা জ্ঞান অর্জন করে আসছে। নতুন শিক্ষার্থীরাও এই পরিবেশকে কাজে লাগিয়ে নিজকে বিকশিত করতে পারবে। 
//         হে রাব্বে কারীম আমাদের এই খেদমতকে আপনার প্রিয় হাবীবের ছদকায় কবুল করুন। আমিন।`,
//     },
//     {
//         id: 2,
//         img: '/teachers/subhead.jpg',
//         name: 'মোহাম্মদ আবু সুফিয়ান টিপু ',
//         position: 'সচিব',
//         title: 'মাদ্রাসা পরিচালনা ও বাস্তবায়ন পরিষদ ',
//         subTitle: 'বাণী ',
//         speach: `মহান আল্লাহ সুবহানাহু ওয়াতাআ'লা ও তাঁর প্রিয় হাবিব সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম এর সন্তুষ্টির নিয়তে আমাদের ক্ষুদ্র প্রয়াস "কুসুমপুরা ইসলামিয়া দাখিল মাদ্রাসা"।
//         শুধু শিক্ষা নয়, ‘সুশিক্ষাই হল জাতির মেরুদন্ড’। একথা সুস্পষ্ট যে, সকল শিক্ষার মাঝে একমাত্র কুরআন  কারীম ও হাদিসে নববীর শিক্ষাই হল আদর্শবান সুশিক্ষা। নবী করীম সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম এরশাদ করেছেন, ‘তোমাদের মধ্যে সর্বোত্তম ঐ ব্যক্তি, যে কুরআন মাজীদ শিক্ষা করে এবং শিক্ষা দেয়। এই শিক্ষা (ইলম) অর্জন করাকেই রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম ফরজ বলেছেন। ব্যক্তি, রাষ্ট্র, সমাজ, পরিবার ও আন্তর্জাতিক পর্যায়সহ জীবনের প্রতিটি অঙ্গনে সফলতা লাভের জন্য দ্বীনি শিক্ষা অর্জনের বিকল্প নেই। তাই এই লক্ষ্য বাস্তবায়নের দৃঢ় প্রত্যয়ে প্রতিষ্ঠিত "কুসুমপুরা ইসলামিয়া দাখিল মাদ্রাসা"। প্রতিষ্ঠানটি নিজস্ব ভবনে, প্রাকৃতিক ও নিরিবিলি পরিবেশে দক্ষ পরিচালনা পরিষদের তত্বাবধানে, অভিজ্ঞ সুপারিন্টেন্ডেন্ট, শিক্ষকমণ্ডলী আন্তরিকতার সহিত আধুনিক ও ইসলামী দ্বীনি শিক্ষার সমম্বিত পাঠদান করে আসছে। যাতে শিক্ষার্থীরা সমগ্র জাহানের শ্রেষ্ঠ আদর্শ নবী মোস্তফা সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম এর আদর্শে সমাজ ও দেশ গঠনের যোগ্যতা অর্জন করতে পারে।
//         অত্র মাদ্রাসার শিক্ষার্থীরা আলোকিত মানুষ হয়ে দেশ ও জাতির উন্নয়ন এবং প্রকৃতভাবে ইসলামকে কোরান ও সুন্নাহর আলোকে মানুষের সামনে উপস্থাপন করবে এ প্রত্যয় ব্যক্ত করে মহান আল্লাহ তাআলার কাছে সাহায্য প্রার্থনা করছি। আমীন`,
//     },
//     {
//         id: 3,
//         img: '/teachers/super.jpg',
//         name: 'মোহাম্মদ নুরুল আলম',
//         position: 'সুপারিন্টেন্ডেন্ট',
//         title: 'অত্র মাদ্রাসা',
//         subTitle: 'বাণী',
//         speach: `সকল প্রশংসা জ্ঞাপন করছি মহান আল্লাহ সুবহানাহু ওয়া তা'য়ালার দরবারে যিনি বস্তুবাদী শিক্ষার যুগেও  আমাদেরকে কোরান সুন্নাহর আলোকে দক্ষ ও যোগ্য সু-নাগরিক গড়ার কাফেলায় সম্পৃক্ত হওয়ার তৌফিক দিয়েছেন। লাখো কোটি দরুদ ও সালাম দো-জাহানের বাদশাহ নবী মোস্তফা সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম এর  নুরানী কদম মোবারকে।
//         ঐতিহ্যবাহী পশ্চিম পটিয়াস্থ মধ্যম কুসুমপুরার ১নং ওয়ার্ডে অত্যন্ত সুন্দর মনোরম পরিবেশে সর্বস্তরের শিক্ষার্থীদের আধুনিক ও ইসলামী দ্বীনি শিক্ষা নিশ্চিতে ২০১৯ সালে এলাকার গণ্যমান্য ব্যক্তিবর্গের আন্তরিকতায় প্রতিষ্ঠিত "কুসুমপুরা ইসলামিয়া দাখিল মাদ্রাসা"। এখানে যুগোপযোগী সিলেবাস ও বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ডের কারিকুলামে বাংলা, আরবি ও ইংরেজি ভাষার সমন্বিত পাঠদান অব্যাহত রয়েছে। পাশাপাশি শিক্ষার্থীদের প্রতিভা বিকাশ ও মনোদৈহিক উন্নয়নে নানান রকম কার্যকর চালু রয়েছে। 
//        নববি আদর্শে আদর্শবান, যোগ্য সু-নাগরিক গড়ার প্রত্যয়ে এই প্রতিষ্ঠানকে পরিপূর্ণ কারিগরি প্রশিক্ষণ কেন্দ্র সহ সিনিয়র মাদ্রাসায় উন্নতি করার যে পরিকল্পনা  তা বাস্তবায়নে মহান আল্লাহ তা’আলা তাঁর প্রিয় হাবিব সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম এর ছদকায় আমাদের সবাইকে  সাহায্য ও সফলতা দান করুন।
//        আমিন।`,
//     },
// ]

const Card = styled.div`
 height: 100vh;
 overflow-y: scroll;
`
const Image = styled.img`
   width: 100%;
   height: 450px;
   border-radius: 50%;
   object-fit: cover;
   @media screen and (max-width:568px){
      height: 450px;
   }
`
const TitleWrapper = styled.div`
 margin-bottom: 35px;
 position: relative;
 &:before{
    background: #1bb4b9 none repeat scroll 0 0;
    bottom: 0;
    content: "";
    height: 2px;
    left: 0;
    margin: -14px auto;
    position: absolute;
    right: 0;
    text-align: center;
    width: 200px;
    
 };
 &::after{
    background: #ffffff none repeat scroll 0 0;
    bottom: -6px;
    color: #1bb4b9;
    content: "";
    font-family: fontawesome;
    font-size: 18px;
    height: 17px;
    left: 0;
    margin: -10px auto;
    position: absolute;
    right: 0;
    text-align: center;
    width: 39px;
    z-index: 9;
 }
`
const Title = styled.h2`
text-align: center;
overflow: hidden;
position: relative;

`
const P = styled.p`
text-align: justify;
text-justify: inter-word;
`
const Testimonial = () => {
    const [talks, setTalks] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/talks')
            .then(res => setTalks(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="container mt-5 mb-5">
            <TitleWrapper>
                <Title>অভিমত</Title>
            </TitleWrapper>
            <div className="row g-5">
                <Swiper
                    modules={[Navigation, Autoplay, Virtual, Pagination]}
                    navigation
                    autoplay={{ delay: 5000, }}
                    pagination={{ clickable: true }}
                    loop={true}
                    slidesPerView={3}
                    onSwiper={(swiper) => { }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 2,
                            
                            
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                    }}

                    className="mySwiper"
                >
                    {
                        talks.map(testi => <SwiperSlide className='col-md-4' key={testi.id}>
                            <Card className="card">
                                <Image src={testi.image} className="card-img-top img-fluid" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title text-center">{testi.name}</h5>
                                    <p className='text-center mb-0'>{testi.position}</p>
                                    <h6 className='text-center'>{testi.board}</h6>
                                    <p className='text-muted text-center'>বাণী</p>
                                    <P className='card-text'><ReactMarkdown>{testi.talk}</ReactMarkdown></P>

                                </div>
                            </Card>

                        </SwiperSlide>
                        )
                    }


                </Swiper>




            </div>
        </div>
    );
};

export default Testimonial;