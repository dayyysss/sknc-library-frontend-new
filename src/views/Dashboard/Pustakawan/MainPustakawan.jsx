import React from 'react';
import Chart from '../../../components/Dashboard/Pustakawan/Chart/Chart';
import ItemLists from '../../../components/Dashboard/Pustakawan/ItemLists/ItemLists';
import './main.scss';

function Home() {
    document.title = "Skanic Library - Pustakawan Dashboard";
    return (
<>
                <div className="bg_color" />

                <div className="home_items">
                    <ItemLists type="data-buku" />
                    <ItemLists type="peminjaman-buku" />
                    <ItemLists type="pengembalian-buku" />
                    <ItemLists type="denda" />
                </div>

                <div className="chart_sec">
                    <Chart height={450} title="Grafik Peminjaman"/>
                </div>
                </>
    );
}

export default Home;
