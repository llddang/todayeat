/* eslint-disable @next/next/no-img-element */
import { MealDTO } from '@/types/DTO/meal.dto';

const HomeMealCardImagePreview = ({ images }: { images: MealDTO['foodImages'] }) => {
  if (!images || images.length === 0) return null;
  return (
    <div className="flex [&>*:not(:last-child)]:-mr-3">
      {images?.map((image) => (
        <img
          key={image}
          className="h-10 w-10 rounded-lg border border-white"
          src={image}
          alt="식사 사진"
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default HomeMealCardImagePreview;
