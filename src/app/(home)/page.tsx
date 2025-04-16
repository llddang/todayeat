import HomeCalendar from '@/components/_home/home-calendar';
import HomeContent from '@/components/_home/home-content';
import CalendarProvider from '@/lib/contexts/calendar.context';
import DashboardProvider from '@/lib/contexts/dashboard.context';

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
