import DateProvider from '@/app/(home)/contexts/date.context';
import HomeCalendar from './components/home-calendar';
import HomeContent from './components/home-content';
import AppUseSummary from './components/app-use-summary';

const HomePage = async () => {
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
