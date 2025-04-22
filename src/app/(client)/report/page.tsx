import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Weekly from './components/weekly';

const Report = () => {
  return (
    <Tabs defaultValue="weekly">
      <TabsList className="flex w-full">
        <TabsTrigger value="daily" className="flex-1">
          일간
        </TabsTrigger>
        <TabsTrigger value="weekly" className="flex-1">
          주간
        </TabsTrigger>
        <TabsTrigger value="monthly" className="flex-1">
          월간
        </TabsTrigger>
      </TabsList>
      <TabsContent value="daily" className="mt-4">
        <Weekly />
      </TabsContent>
      <TabsContent value="weekly" className="mt-4">
        <Weekly />
      </TabsContent>
      <TabsContent value="monthly" className="mt-4">
        <Weekly />
      </TabsContent>
    </Tabs>
  );
};

export default Report;
