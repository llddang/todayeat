import HomeCalendar from '@/components/_home/home-calendar';
import HomeMealContainer from '@/components/_home/home-meal-container';
import Footer from '@/components/commons/footer';
import GlassBackground from '@/components/commons/glass-background';
import CalendarProvider from '@/lib/contexts/calendar.context';
import DashboardProvider from '@/lib/contexts/dashboard.context';

// TODO: selectedDate를 context가 아닌 queryParam으로 관리해보기.
const HomePage = async () => {
  return (
    <div>
      <DashboardProvider>
        <CalendarProvider>
          <HomeCalendar />
        </CalendarProvider>

        {/* TODO: recode summary container 들어가기 */}
        <GlassBackground className="flex flex-col gap-4 pb-8 pt-6">
          <HomeMealContainer />
        </GlassBackground>
      </DashboardProvider>
      <Footer />
    </div>
  );
};

export default HomePage;
