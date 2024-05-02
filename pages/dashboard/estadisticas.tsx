import { useEffect, useState } from "react"
import { useGlobalContext } from "../../context/GlobalContext"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import CardEstadisticas from "../../components/card-estadisticas/CardEstadisticas";
import { getDailySales } from "../../reducer/Product";
import TableStatidisticsPerMonth from "../../components/tableStatidisticsPerMonth/TableStatidisticsPerMonth";
import { AuthAction, useUser, withUser, withUserTokenSSR } from "next-firebase-auth";
import LayoutDashboard from "../../layout/LayoutDashboard";
import Loader from "../../components/Loader/Loader";
import TestNavbar from "../../components/Navbar/TestNavbar";
import Navbar from "../../components/Navbar/Navbar";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { numberToNameMonth } from "../../dates/date";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Estadisticas = () => {
  const dataUser = useUser()
  const auth = getAuth();
  const { getDataUser, dailySaleContext, LibraryData, dailyTicketContext, incomePerDay, totalSalesPerYearContext, getDataToStatistics, loaderState,getPaymentTypeDailyContext,getDataUserContext } = useGlobalContext()
  const { dailySale, dailyTicket, averageTicket, dataSales, dataSalesLabel, dataTotalSalesPerMonth, totalSalesYear, dataStatistics, loader, paymentDataToStadistics } = LibraryData
  const [startDate, setStartDate] = useState(dayjs());
  const [minDate, setMinDate] = useState(dayjs(new Date().setFullYear(2023)));
  const [user, loading, error] = useAuthState(auth);

  const dateData: DateData = {
    date: startDate.date(),
    month: numberToNameMonth(startDate.month()),
    year: startDate.year(),
  }
  useEffect(() => {
    if(dataUser.id) {
      getDataUserContext(`${dataUser.id}`)
    }
  },[dataUser])
  // useEffect(() => {
  //   if(user) {
  //     getDataUserContext(`${user.uid}`)
  //   }
  // },[user])
  
  useEffect(() => {
    dailySaleContext(dateData)
    getDataToStatistics(dateData)
    getPaymentTypeDailyContext(dateData)
    getDailySales()
  }, [dailyTicket, dataStatistics.length,startDate])
  const sales = {
    labels: dataSalesLabel,
    datasets: [{
      label: 'venta',
      data: dataSales,
      backgroundColor: [
        'rgb(0, 102, 255)'
      ],
      borderColor: [
        'rgb(0, 102, 255)'
      ],
      borderWidth: 3,
      tension: 0.5,
      pointRadius: 6,

    }]
  }
  const options = {
    plugins: {
      legend: {
        position: 'center' as const,
      },
      title: {
        display: true,
        text: 'ventas diarias',
      },
    },
  };
  
  return (
    <LayoutDashboard>
      <>
        <Navbar dataUser={dataUser} />
        {/* <Navbar /> */}
      </>
      {
        loader
          ?
          <div className="grid h-loader w-full place-content-center">
            <Loader />
          </div>
          :
          <>
            <div className="w-full p-4 relative">
              <h1 className="text-3xl text-slate-700 font-nunito font-semibold p-2 my-5">Mis Estadísticas</h1>
              <div className='flex justify-end items-center mb-3'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker minDate={minDate} value={startDate} onChange={(newValue: any) => setStartDate(newValue)} />
          </LocalizationProvider>
        </div>
              <CardEstadisticas dataStatistics={dataStatistics} dataSales={dataSales} dailySale={dailySale} dailyTicket={dailyTicket} averageTicket={averageTicket} dataTotalSalesPerMonth={dataTotalSalesPerMonth} totalSalesYear={totalSalesYear} paymentDataToStadistics={paymentDataToStadistics}/>
            <TableStatidisticsPerMonth dataStatistics={dataStatistics} />
              <div className="my-[50px] w-full">
                <h2 className="text-slate-600 font-nunito text-xl font-medium capitalize mb-5">graficos y ratios</h2>
                <div className="grid p-2 grid-cols-1 gap-4 cs:grid-cols-2 w-full rounded-sm mb-[50px]">
                  <div className="w-full bg-white p-2 rounded-lg">
                    <Line className="w-full h-full" options={options} data={sales} />
                  </div>
                </div>
              </div>
            </div>
          </>
      }
    </LayoutDashboard>
  )
}
export default withUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(Estadisticas)