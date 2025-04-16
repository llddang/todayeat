import HomeCalendar from '@/components/_home/home-calendar';
import Footer from '@/components/commons/footer';
import CalendarProvider from '@/lib/contexts/calendar.context';
import DashboardProvider from '@/lib/contexts/dashboard.context';

const HomePage = () => {
  return (
    <div>
      <DashboardProvider>
        <CalendarProvider>
          <HomeCalendar />
        </CalendarProvider>

        {/* TODO: recode summary container 들어가기 */}
      </DashboardProvider>
      <Footer />
    </div>
  );
};

export default HomePage;
