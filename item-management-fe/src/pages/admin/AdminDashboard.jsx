import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

// Mock data
const revenueData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Revenue (USD)",
      data: [12000, 15000, 18000, 22000],
      backgroundColor: "#4f46e5",
    },
  ],
};

const orderData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  datasets: [
    {
      label: "Orders",
      data: [120, 140, 180, 160, 200, 220, 210, 250],
      borderColor: "#16a34a",
      backgroundColor: "rgba(22,163,74,0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const topProducts = {
  labels: [
    "Nike Air Max",
    "Nike Jordan",
    "Nike Free",
    "Nike React",
    "Nike Zoom",
  ],
  datasets: [
    {
      label: "Sold",
      data: [320, 280, 250, 200, 180],
      backgroundColor: ["#f59e42", "#4f46e5", "#16a34a", "#f43f5e", "#0ea5e9"],
    },
  ],
};

const stats = {
  ordersMonth: 980,
  ordersWeek: 210,
  ordersYear: 10200,
  revenueMonth: 67000,
  revenueWeek: 14500,
};

function exportExcel() {
  // Mock export: tạo file CSV đơn giản
  const rows = [
    ["Product", "Sold"],
    ...topProducts.labels.map((label, i) => [
      label,
      topProducts.datasets[0].data[i],
    ]),
  ];
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "top-products.csv";
  a.click();
  URL.revokeObjectURL(url);
}

const AdminDashboard = () => (
  <div className="w-full min-h-screen flex justify-center items-start bg-gray-50 py-8 overflow-auto">
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 max-w-5xl w-full space-y-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded shadow p-4 text-center">
          <div className="text-gray-500">Đơn hàng trong tháng</div>
          <div className="text-2xl font-bold text-indigo-600">
            {stats.ordersMonth}
          </div>
        </div>
        <div className="bg-gray-50 rounded shadow p-4 text-center">
          <div className="text-gray-500">Đơn hàng trong tuần</div>
          <div className="text-2xl font-bold text-green-600">
            {stats.ordersWeek}
          </div>
        </div>
        <div className="bg-gray-50 rounded shadow p-4 text-center">
          <div className="text-gray-500">Đơn hàng trong năm</div>
          <div className="text-2xl font-bold text-pink-600">
            {stats.ordersYear}
          </div>
        </div>
        <div className="bg-gray-50 rounded shadow p-4 text-center">
          <div className="text-gray-500">Tổng doanh thu tháng</div>
          <div className="text-2xl font-bold text-orange-600">
            ${stats.revenueMonth.toLocaleString()}
          </div>
        </div>
        <div className="bg-gray-50 rounded shadow p-4 text-center">
          <div className="text-gray-500">Tổng doanh thu tuần</div>
          <div className="text-2xl font-bold text-blue-600">
            ${stats.revenueWeek.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-gray-50 rounded shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">Biểu đồ doanh thu theo tuần</h3>
          </div>
          <Bar
            data={revenueData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
            height={220}
          />
        </div>
        <div className="bg-gray-50 rounded shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">Biểu đồ đơn hàng theo tháng</h3>
          </div>
          <Line
            data={orderData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
            height={220}
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded shadow p-4 mt-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">Top sản phẩm bán chạy</h3>
          <button
            onClick={exportExcel}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Xuất file Excel
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2">
            <Pie
              data={topProducts}
              options={{
                responsive: true,
                plugins: { legend: { position: "bottom" } },
              }}
              height={220}
            />
          </div>
          <div className="w-full md:w-1/2">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Sản phẩm</th>
                  <th className="p-2">Số lượng bán</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.labels.map((label, i) => (
                  <tr key={label} className="border-t">
                    <td className="p-2">{label}</td>
                    <td className="p-2">{topProducts.datasets[0].data[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
