import BackButton from './variants/back-button';
import Default from './variants/default';
import WithProfile from './variants/with-profile';

export type MobileHeaderProps = {
  variant?: 'backButton' | 'default' | 'withProfile';
};

const MobileHeader = ({ variant = 'default' }: MobileHeaderProps) => {
  const renderVariant = () => {
    switch (variant) {
      case 'backButton':
        return <BackButton />;
      case 'default':
        return <Default />;
      case 'withProfile':
        return <WithProfile />;
      default:
        return <Default />;
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-layout flex h-16 w-full items-center justify-between bg-purple-10/[0.94] px-4 py-3 backdrop-blur-[20px] layout-container">
      {renderVariant()}
    </header>
  );
};

export default MobileHeader;
