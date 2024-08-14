document.addEventListener("DOMContentLoaded", function () {
    // Setup chart.js if needed
    const ctx = document.getElementById("performanceChart").getContext("2d");
    const performanceChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["2014", "2015", "2016", "2023"],
            datasets: [
                {
                    label: "Jobs",
                    data: [1000, 800, 500, 900],
                    backgroundColor: "blue",
                },
                {
                    label: "Pending",
                    data: [300, 400, 200, 300],
                    backgroundColor: "red",
                },
                {
                    label: "Approved",
                    data: [100, 200, 100, 300],
                    backgroundColor: "yellow",
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
});
