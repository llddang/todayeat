import { cva, type VariantProps } from 'class-variance-authority';
import DEFAULT_PROFILE from '@/../public/illustrations/default-profile.svg';
import Image from 'next/image';

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
};

const ProfileImage = ({ src, size }: ProfileImageProps) => {
  const imageUrl = src || DEFAULT_PROFILE;

  return (
    <div className={profileImageVariants({ size })}>
      <Image src={imageUrl} alt="프로필" fill className="object-cover" sizes="20vw" priority key={imageUrl} />
    </div>
  );
};

export default ProfileImage;
