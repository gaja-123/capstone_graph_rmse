<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RMSE Comparison with Std. Dev.</title>
  <style>
    .chart-container {
      display: flex;
      justify-content: center;
      width: 100%;
      max-width: 800px;
      margin: auto;
      padding: 20px;
    }
    canvas {
      border: 1px solid #ccc;
    }
  </style>
</head>
<body>
  <div class="chart-container">
    <canvas id="rmseChart"></canvas>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3.0.1/dist/chartjs-plugin-annotation.min.js"></script>
  <script>
    const ctx = document.getElementById('rmseChart').getContext('2d');

    // Data sorted by after-tuning RMSE (ascending)
    const labels = ['LightGBM', 'CatBoost', 'Random Forest', 'XGBoost', 'Decision Tree', 'KNN'];
    const beforeData = [0.1116, 0.1110, 0.1203, 0.1115, 0.1517, 0.1226];
    const beforeStd = [0.0010, 0.0010, 0.0011, 0.0010, 0.0008, 0.0008];
    const afterData = [0.1110, 0.1112, 0.1121, 0.1125, 0.1147, 0.1179];
    const afterStd = [0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0009];

    // Generate annotations for error bars
    const annotations = [];
    labels.forEach((label, i) => {
      // Before tuning error bars
      if (beforeData[i]) {
        const x = i - 0.2; // Offset for before tuning bars
        const y = beforeData[i];
        const std = beforeStd[i];
        annotations.push({
          type: 'line',
          xMin: x,
          xMax: x,
          yMin: y - std,
          yMax: y + std,
          borderColor: '#36A2EB',
          borderWidth: 2
        }, {
          type: 'line',
          xMin: x - 0.1,
          xMax: x + 0.1,
          yMin: y - std,
          yMax: y - std,
          borderColor: '#36A2EB',
          borderWidth: 2
        }, {
          type: 'line',
          xMin: x - 0.1,
          xMax: x + 0.1,
          yMin: y + std,
          yMax: y + std,
          borderColor: '#36A2EB',
          borderWidth: 2
        });
      }
      // After tuning error bars
      if (afterData[i]) {
        const x = i + 0.2; // Offset for after tuning bars
        const y = afterData[i];
        const std = afterStd[i];
        annotations.push({
          type: 'line',
          xMin: x,
          xMax: x,
          yMin: y - std,
          yMax: y + std,
          borderColor: '#4BC0C0',
          borderWidth: 2
        }, {
          type: 'line',
          xMin: x - 0.1,
          xMax: x + 0.1,
          yMin: y - std,
          yMax: y - std,
          borderColor: '#4BC0C0',
          borderWidth: 2
        }, {
          type: 'line',
          xMin: x - 0.1,
          xMax: x + 0.1,
          yMin: y + std,
          yMax: y + std,
          borderColor: '#4BC0C0',
          borderWidth: 2
        });
      }
    });

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'RMSE (Before Tuning)',
            data: beforeData,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'RMSE (After Tuning)',
            data: afterData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        indexAxis: 'x',
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'RMSE'
            },
            min: 0,
            max: 0.16
          },
          x: {
            title: {
              display: true,
              text: 'Models (Sorted by After-Tuning RMSE)'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'RMSE Comparison with Std. Dev.: Before vs. After Tuning'
          },
          legend: {
            position: 'top'
          },
          datalabels: {
            display: true,
            color: '#000',
            font: {
              size: 10
            },
            formatter: (value) => (value ? value.toFixed(4) : ''),
            anchor: 'end',
            align: 'top'
          },
          annotation: {
            annotations: annotations
          }
        }
      }
    });
  </script>
</body>
</html>
