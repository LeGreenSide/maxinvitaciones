import { useState, useEffect } from "react";


const categories = [
  { src: '/invitaciones/image-1.png', alt: 'Invitaciones temática fútbol' },
  { src: '/invitaciones/image-2.png', alt: 'Invitaciones temática princesas' },
  { src: '/invitaciones/image-3.png', alt: 'Invitaciones temática Variada' },
  { src: '/invitaciones/image-4.png', alt: 'Invitaciones temática Variada' },
];


const ImageGrid = ({ interval = 4000 }) => {

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % categories.length);
        setVisible(true);
      }, 200);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  const current = categories[index];


  return (
    <div>
      <div className="flex justify-center px-4">
        <img
          src={current.src}
          alt={current.alt}
          width="1920"
          height="1080"
          loading={index === 0 ? 'eager' : 'lazy'}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          className={`w-full max-w-md sm:max-w-lg md:max-w-xl xl:max-w-3xl h-auto transition-opacity duration-400 ${visible ? 'opacity-100' : 'opacity-0'
            }`}
        />
      </div>
      <div class="flex justify-center -mt-4">
        <a
          href="#invitaciones"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors"
        >
          Ver invitaciones
        </a>
      </div>
    </div>

  );
};

export default ImageGrid;