import { cva, type VariantProps } from 'class-variance-authority';
import DEFAULT_PROFILE from '@/../public/illustrations/default-profile.svg';
import Image from 'next/image';
import { cn } from '@/lib/shadcn';
import { useEffect, useState } from 'react';

const profileImageVariants = cva('relative overflow-hidden rounded-full', {
  variants: {
    size: {
      sm: 'w-10 h-10 p-4',
      md: 'w-[4.5rem] h-[4.5rem] p-[0.225rem]',
      lg: 'w-[6.25rem] h-[6.25rem] p-[0.3125rem]'
    }
  },
  defaultVariants: {
    size: 'sm'
  }
});

type ProfileImageProps = VariantProps<typeof profileImageVariants> & {
  src: string | null;
  isImageLoading?: boolean;
  setIsImageLoading?: (isLoading: boolean) => void;
};

const ProfileImage = ({
  src,
  size,
  isImageLoading: externalIsLoading,
  setIsImageLoading: externalSetIsLoading
}: ProfileImageProps) => {
  const [internalIsLoading, setInternalIsLoading] = useState(true);
  const isControlled = externalIsLoading !== undefined && externalSetIsLoading !== undefined;
  const isImageLoading = isControlled ? externalIsLoading : internalIsLoading;
  const setIsImageLoading = isControlled ? externalSetIsLoading : setInternalIsLoading;

  const imageUrl = src || DEFAULT_PROFILE;

  useEffect(() => {
    setIsImageLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <div className={profileImageVariants({ size })}>
      <Image
        src={isImageLoading ? DEFAULT_PROFILE : imageUrl}
        alt="프로필"
        fill
        className={cn('object-cover transition-opacity duration-500', isImageLoading && 'animate-pulse')}
        sizes="20vw"
        priority
        key={imageUrl}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ProfileImage;
