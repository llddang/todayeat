import { cva, type VariantProps } from 'class-variance-authority';
import ILLUST_PROFILE from '@/../public/illustrations/illust_profile.svg';
import Image from 'next/image';

const profileImageVariants = cva('relative overflow-hidden rounded-full', {
  variants: {
    size: {
      sm: 'w-9 h-9',
      md: 'w-16 h-16',
      lg: 'w-[5.625rem] h-[5.625rem]'
    }
  },
  defaultVariants: {
    size: 'sm'
  }
});

type ProfileImageProps = VariantProps<typeof profileImageVariants> & {
  src: string | null;
};

const ProfileImage = ({ src, size }: ProfileImageProps) => {
  const imageUrl = src || ILLUST_PROFILE;

  return (
    <div className={profileImageVariants({ size })}>
      <Image src={imageUrl} alt="프로필" fill className="object-cover" />
    </div>
  );
};

export default ProfileImage;
