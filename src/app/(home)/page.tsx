import CalendarProvider from '@/app/(home)/contexts/calendar.context';
import DashboardProvider from '@/app/(home)/contexts/dashboard.context';
import HomeCalendar from './components/home-calendar';
import HomeContent from './components/home-content';
import AppUseSummary from './components/app-use-summary';

const HomePage = async () => {
  return (
    <>
      <DashboardProvider>
        <div>
          <CalendarProvider>
            <HomeCalendar />
          </CalendarProvider>
          <AppUseSummary />
        </div>
        <HomeContent />
      </DashboardProvider>
    </>
  );
};

export default HomePage;
