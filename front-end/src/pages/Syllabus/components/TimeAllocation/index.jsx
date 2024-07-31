import styles from './style.module.scss';
import LegendList from '../LegendList';
import { PieChart } from '@mui/x-charts/PieChart';

function TimeAllocation({ data, minHeight, height }) {
    const colorChart = ['#F4BE37', '#FF9F40', '#0D2535', '#5388D8', 'blue', 'green'];

    const items = data.map((item, idx) => {
        return {
            ...item,
            id: idx,
            color: colorChart[idx],
        };
    });

    const itemsRender = items.filter((item) => item.value > 0);

    return (
        <div
            style={{ minHeight: height, height: height }}
            className={styles.container}
        >
            <h3 className={styles.title}>Time allocation</h3>
            <div className={styles.body}>
                <div className={styles.chartWrapper}>
                    <PieChart
                        series={[
                            {
                                data: items,
                                color: items.map((item) => item.color),
                            },
                        ]}
                        width={400}
                        height={210}
                        margin={{ right: 200 }}
                    />
                    <div className={styles.legend}>
                        <LegendList data={itemsRender} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimeAllocation;
