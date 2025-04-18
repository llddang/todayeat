import CalendarProvider from '@/app/(home)/contexts/calendar.context';
import DashboardProvider from '@/app/(home)/contexts/dashboard.context';
import HomeCalendar from './components/home-calendar';
import HomeContent from './components/home-content';

const HomePage = async () => {
  return (
    <div>
      <DashboardProvider>
        <CalendarProvider>
          <HomeCalendar />
        </CalendarProvider>
        <HomeContent />
      </DashboardProvider>
    </div>
  );
};

export default HomePage;
