import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Charts from './components/charts';
import { PeriodUnitEnum } from './types/report.type';

const Report = () => {
  return (
    <Tabs defaultValue={PeriodUnitEnum.WEEKLY}>
      <TabsList className="flex w-full">
        <TabsTrigger value={PeriodUnitEnum.DAILY} className="flex-1">
          일간
        </TabsTrigger>
        <TabsTrigger value={PeriodUnitEnum.WEEKLY} className="flex-1">
          주간
        </TabsTrigger>
        <TabsTrigger value={PeriodUnitEnum.MONTHLY} className="flex-1">
          월간
        </TabsTrigger>
      </TabsList>
      <TabsContent value={PeriodUnitEnum.DAILY} className="mt-4">
        <Charts unit={PeriodUnitEnum.DAILY} />
      </TabsContent>
      <TabsContent value={PeriodUnitEnum.WEEKLY} className="mt-4">
        <Charts unit={PeriodUnitEnum.WEEKLY} />
      </TabsContent>
      <TabsContent value={PeriodUnitEnum.MONTHLY} className="mt-4">
        <Charts unit={PeriodUnitEnum.MONTHLY} />
      </TabsContent>
    </Tabs>
  );
};

export default Report;
