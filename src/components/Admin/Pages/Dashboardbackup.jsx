

import AdminNavigation from '../Layout/AdminNavigation';
import TitleHeader from '../../TitleHeader';
import TopCard from '../../TopCard';
import ComposedChart from '../../charts/ComposedChart';
import SimplePieChart from '../../charts/SimplePieChart';


function Dashboard() {
  return (
    <div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='z-1 sidebar border border-right col-2 col-md-1 p-0 bg-body-tertiary shadow vh-100 position-fixed d-flex align-items-center justify-content-center'>
            <div className='bg-body-tertiary h-100' tabIndex='-1' id='sidebarMenu' aria-labelledby='sidebarMenuLabel'>
              <div className='d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto h-100'>
                <AdminNavigation />
              </div>
            </div>
          </div>

          <main className='ms-auto col-10 col-xs-9 col-md-11 px-md-4'>
            <TitleHeader   heading={'Dashboard'} />

            <div>
              <div className='row g-4 d-flex justify-content-around'>
                <div className='col-lg-3 p-0'>
                  <TopCard title={464} text={'Trade In'} color1={'#00A9FF'} color2={'#CDF5FD'} val1={800} val2={300} />
                </div>
                <div className='col-lg-3 p-0'>
                  <TopCard title={323} text={'Apple Trade In'} color1={'#FCC8D1'} color2={'#D14D72'} val1={200} val2={1000} />
                </div>
                <div className='col-lg-3 p-0'>
                  <TopCard title={678} text={'Android Trade In'} color1={'#E38B29'} color2={'#FFD8A9'} val1={600} val2={500} />
                </div>
              </div>

              <div className='row d-flex justify-content-around my-5'>
                <div className='col-lg-7 bg-body-tertiary shadow d-flex flex-column align-items-center justify-content-around border rounded' style={{height: '60vh'}}>
                  <h2 className='text-capitalize'>Tradein Composed chart</h2>
                  <ComposedChart />
                </div>

              
                <div className='col-lg-4 bg-body-tertiary shadow d-flex flex-column align-items-center justify-content-around border rounded' style={{height: '60vh'}}>
                  <h2 className='text-capitalize'>Pie chart</h2>
                  <SimplePieChart />
                </div>
              </div>

        

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
