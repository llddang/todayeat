import WithProfile from './variants/with-profile';
import GlobalNavigationBar from '../global-navigation-bar';

const PcHeader = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-layout h-16 bg-purple-10/[0.94] py-3 backdrop-blur-[20px] layout-container">
      <div className="relative mx-auto flex h-full w-full max-w-[73.75rem] items-center justify-between">
        <WithProfile />
        <GlobalNavigationBar className="absolute bottom-auto top-0 h-fit w-fit p-1 xl:grid" />
      </div>
    </header>
  );
};

export default PcHeader;
