'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';

const ImageCarousel = ({ imageList, pagination = true }: { imageList: string[]; pagination?: boolean }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleClickPagination = (index: number) => {
    if (api) api.scrollTo(index);
  };

  return (
    <Carousel setApi={setApi} className="w-full overflow-hidden rounded-2xl">
      <CarouselContent className="ml-0 gap-4">
        {imageList.map((imageUrl, index) => (
          <CarouselItem
            key={imageUrl}
            className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black pl-0"
          >
            <Image src={imageUrl} alt={`식단 기록 이미지 ${index + 1}`} fill priority className="object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>

      {api && pagination && (
        <div className="carousel-bottom-area absolute bottom-[0.6rem] left-1/2 -translate-x-1/2 rounded-[3.125rem] bg-[#BFBFBF44] px-[0.75rem] py-[0.5rem] backdrop-blur-xl">
          <div className="flex gap-2">
            {Array.from({ length: count }, (_, index) => (
              <button
                key={index}
                className={`inline-block h-2 w-2 rounded-full bg-primary ${current === index ? 'opacity-1' : 'opacity-30'}`}
                onClick={() => handleClickPagination(index)}
              ></button>
            ))}
          </div>
        </div>
      )}
    </Carousel>
  );
};

export default ImageCarousel;
