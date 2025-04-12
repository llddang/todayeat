import { Typography } from '@/components/ui/typography';

const Footer = () => {
  return (
    <footer className="flex items-center justify-center px-4 py-7">
      <Typography as="span" variant="body3" className="text-gray-400">
        Copyright 2025. 투데잇 All rights reserved.
      </Typography>
    </footer>
  );
};
export default Footer;
