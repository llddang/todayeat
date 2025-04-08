'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';

const MealImageCarousel = ({ imageList, pagination = true }: { imageList: string[]; pagination?: boolean }) => {
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

  // 페이지네이션이 사용 가능한 경우 - api 로드 완료 && 페이지네이션 사용 true && 이미지 1개 이상
  const isPaginationOn = api && pagination && count > 1;

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

      {isPaginationOn && (
        <div className="carousel-bottom-area absolute bottom-[0.6rem] left-1/2 flex -translate-x-1/2 gap-2 rounded-[3.125rem] bg-[#BFBFBF44] px-[0.75rem] py-[0.5rem] backdrop-blur-xl">
          {Array.from({ length: count }, (_, index) => (
            <button
              key={index}
              className={`inline-block h-2 w-2 rounded-full bg-primary ${current === index ? 'opacity-1' : 'opacity-30'}`}
              onClick={() => handleClickPagination(index)}
            ></button>
          ))}
        </div>
      )}
    </Carousel>
  );
};

export default MealImageCarousel;
