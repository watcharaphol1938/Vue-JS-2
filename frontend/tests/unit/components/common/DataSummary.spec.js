import {render} from '@testing-library/vue';
import DataSummary from '@/components/common/DataSummary.vue';

describe('common/DataSummary.vue', () => {
  const xData = [
    '2020-07-31 12:00:28.509',
    '2020-07-31 12:00:36.008',
    '2020-07-31 12:01:04.001',
  ];
  const yData = ['1', '2', '3'];

  test('データ合計値を表示', async () => {
    const dataSummary = await render(DataSummary, {
      props: {xData, yData},
    });
    dataSummary.findByText('合計: 6');
  });
  test('データ平均値を表示', async () => {
    const dataSummary = await render(DataSummary, {
      props: {xData, yData},
    });
    dataSummary.findByText('平均: 2');
  });
});
