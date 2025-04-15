import { cva, type VariantProps } from 'class-variance-authority';
import DEFAULT_PROFILE from '@/../public/illustrations/default_profile.svg';
import Image from 'next/image';

const profileWrapperStyle = cva('relative overflow-hidden rounded-full', {
  variants: {
    size: {
      sm: 'w-9 h-9',
      md: 'w-16 h-16',
      lg: 'w-[5.625rem] h-[5.625rem]' // tailwind엔 22.5 없으므로 custom
    }
  },
  defaultVariants: {
    size: 'sm'
  }
});

type ProfileImageProps = VariantProps<typeof profileWrapperStyle> & {
  src?: string;
};

const ProfileImage = ({ src, size }: ProfileImageProps) => {
  const imageUrl = src || DEFAULT_PROFILE;

  return (
    <div className={profileWrapperStyle({ size })}>
      <Image src={imageUrl} alt="프로필" fill className="object-cover" />
    </div>
  );
};

export default ProfileImage;
