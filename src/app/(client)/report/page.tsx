import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Charts from './components/charts';
import { UnitEnum } from './types/report.type';

const Report = () => {
  return (
    <Tabs defaultValue={UnitEnum.WEEKLY}>
      <TabsList className="flex w-full">
        <TabsTrigger value={UnitEnum.DAILY} className="flex-1">
          일간
        </TabsTrigger>
        <TabsTrigger value={UnitEnum.WEEKLY} className="flex-1">
          주간
        </TabsTrigger>
        <TabsTrigger value={UnitEnum.MONTHLY} className="flex-1">
          월간
        </TabsTrigger>
      </TabsList>
      <TabsContent value={UnitEnum.DAILY} className="mt-4">
        <Charts unit={UnitEnum.DAILY} />
      </TabsContent>
      <TabsContent value={UnitEnum.WEEKLY} className="mt-4">
        <Charts unit={UnitEnum.WEEKLY} />
      </TabsContent>
      <TabsContent value={UnitEnum.MONTHLY} className="mt-4">
        <Charts unit={UnitEnum.MONTHLY} />
      </TabsContent>
    </Tabs>
  );
};

export default Report;
