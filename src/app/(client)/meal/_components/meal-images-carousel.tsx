'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import useIsClient from '@/hooks/use-is-client';

const MealImageCarousel = ({ imageList, pagination = true }: { imageList: string[]; pagination?: boolean }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const isClient = useIsClient();
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    const onSelectHandler = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelectHandler);

    return () => {
      api.off('select', onSelectHandler);
    };
  }, [api, imageList]);

  const handleClickPagination = (index: number) => {
    if (api) api.scrollTo(index);
  };

  const isPaginationOn = isClient && api && pagination && count > 1;

  if (imageList.length === 0) return null;
  return (
    <div className="relative">
      <Carousel setApi={setApi} className="w-full overflow-hidden rounded-2xl xl:aspect-square xl:w-[22.5rem]">
        <CarouselContent className="ml-0 gap-4">
          {imageList.map((imageUrl, index) => (
            <CarouselItem key={imageUrl} className="relative aspect-square w-full overflow-hidden rounded-2xl pl-0">
              <Image src={imageUrl} alt={`식단 기록 이미지 ${index + 1}`} fill priority className="object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>
        {isPaginationOn && <Pagination current={current} count={count} onClick={handleClickPagination} />}
      </Carousel>
    </div>
  );
};

export default MealImageCarousel;

const Pagination = ({
  current,
  count,
  onClick
}: {
  current: number;
  count: number;
  onClick: (index: number) => void;
}) => {
  return (
    <nav className="carousel-bottom-area absolute bottom-[0.6rem] left-1/2 flex -translate-x-1/2 gap-2 rounded-[3.125rem] bg-[#BFBFBF44] px-3 py-2 backdrop-blur-xl">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          className={`inline-block h-2 w-2 rounded-full bg-primary ${current === index ? 'opacity-1' : 'opacity-30'}`}
          onClick={() => onClick(index)}
          aria-label={`${index + 1}번 이미지로 이동`}
          aria-current={current === index ? 'true' : 'false'}
        ></button>
      ))}
    </nav>
  );
};
