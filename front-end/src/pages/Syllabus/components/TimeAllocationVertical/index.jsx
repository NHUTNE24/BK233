// import styles from './style.module.scss';
import LegendList from '../LegendList';
import { PieChart } from '@mui/x-charts/PieChart';
import styles from './style.module.scss';

const color = ['#F4BE37', '#FF9F40', '#0D2535', '#5388D8', 'blue', 'green', '#ddd'];

function TimeAllocationVertical({ data }) {
    const dataSource = data.map((item, idx) => {
        return {
            ...item,
            id: idx,
            color: color[idx],
        };
    });

    const LegendRender = dataSource.filter((item) => item.value > 0);

    // console.log('LEGEND ', LegendRender);
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Time allocation</h3>
            <div className={styles.body}>
                <div className={styles.chartWrapper}>
                    <div className={styles['chart-container']}>
                        <PieChart
                            series={[
                                {
                                    data: dataSource,
                                    colorByPoint: true,
                                },
                            ]}
                            width={220}
                            height={220}
                        />
                    </div>
                    <div className={styles.legend}>
                        <LegendList data={LegendRender} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimeAllocationVertical;
