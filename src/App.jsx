import { useEffect, useRef } from 'react';
import {Header } from '../components/Header'
import { Main } from '../components/Main'
import ReactImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import image1 from "../src/assets/images/pexels-823sl-2294403.jpg"
import image2 from "../src/assets/images/pexels-leonardho-1552249.jpg"
import image3 from "../src/assets/images/pexels-olly-905336.jpg"
import image4 from "../src/assets/images/pexels-823sl-2294403.jpg"
import image5 from "../src/assets/images/pexels-leonardho-1552249.jpg"

function App() {
  const galleryRef = useRef(null);

// IMAGENES//
  const images = [
    {
      original: image1,
      thumbnail: image1,
    },
    {
      original: image2,
      thumbnail: image2,
    },
    {
      original: image3,
      thumbnail: image3,
    },

    {
      original: image4,
      thumbnail: image4,
    },

    {
      original: image5,
      thumbnail: image5,
    },
  ]


  //MINIATURAS//
  const renderThumbInner = (item) => {
    return (
      <img src={item.thumbnail} alt="" className="object-cover w-16 h-16 rounded-full"  />
      
    );
  };

  //IMAGEN GRANDE//
  const renderItem = (item) => {
    return (
      <img src={item.original} alt="" className=" rounded-lg lg:w-[600px]  max-h-[300px] 
" />
      
    );
  };


  //FUNCION PARA QUE LOS BOTONES DE NAVEGACION APAREZCAN Y DESAPAREZCAN USANDO HOVER//
  useEffect(() => {
    const galleryElement = galleryRef.current;

    const showButtons = () => {
      galleryElement.querySelector('.image-gallery-left-nav').classList.remove('hidden');
      galleryElement.querySelector('.image-gallery-right-nav').classList.remove('hidden');
    };

    const hideButtons = () => {
      galleryElement.querySelector('.image-gallery-left-nav').classList.add('hidden');
      galleryElement.querySelector('.image-gallery-right-nav').classList.add('hidden');
    };

    galleryElement.addEventListener('mouseenter', showButtons);
    galleryElement.addEventListener('mouseleave', hideButtons);

    return () => {
      galleryElement.removeEventListener('mouseenter', showButtons);
      galleryElement.removeEventListener('mouseleave', hideButtons);
    };
  }, []);

  return (
    <div className='px-3 bg-slate-500' >
    <Header />
    <Main />

    <div ref={galleryRef} className='flex justify-center mx-auto w-fit'>
    < ReactImageGallery additionalClass='justify-center  mt-4 mx-auto rounded-lg  object-cover' items= {images}
            renderThumbInner={renderThumbInner}
            renderItem={renderItem}
            showPlayButton={false}
            autoPlay={true}
            slideDuration={700}
            slideInterval={5000}
            />

</div>

    </div>
  )
}

export default App
