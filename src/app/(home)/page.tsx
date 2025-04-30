import DateProvider from '@/app/(home)/_contexts/date.context';
import HomeCalendar from './_components/home-calendar';
import HomeContent from './_components/home-content';
import AppUseSummary from './_components/app-use-summary';

const HomePage = () => {
  return (
    <DateProvider>
      <div>
        <HomeCalendar />
        <AppUseSummary />
      </div>
      <HomeContent />
    </DateProvider>
  );
};

export default HomePage;
