import HomeCalendar from '@/components/_home/home-calendar';
import HomeContent from '@/components/_home/home-content';
import CalendarProvider from '@/app/(home)/contexts/calendar.context';
import DashboardProvider from '@/app/(home)/contexts/dashboard.context';

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
