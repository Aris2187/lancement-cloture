document.addEventListener("DOMContentLoaded", () => {
    const jsonPath = "./lancement_cloture_structure.json"; // Chemin du fichier JSON

    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            // Afficher les objectifs journaliers
            displayDailyObjectives(data.objectives_daily);

            // Afficher les tranches horaires avec Chart.js
            displayHourlyChart(data.hourly_breakdown_n1);
        })
        .catch(error => console.error("Erreur lors du chargement des données JSON:", error));
});

// Afficher les objectifs journaliers
function displayDailyObjectives(dailyData) {
    const table = document.getElementById("daily-table");
    const headers = ["Indicateur", "N-1", "Objectif", "Réalisé"];
    const rows = dailyData.indicators.map((indicator, index) => ({
        indicator,
        n1: dailyData.data[0].values[index],
        objectif: dailyData.data[1].values[index],
        realise: dailyData.data[2].values[index],
    }));

    // Créer l'en-tête du tableau
    table.innerHTML = `<tr>${headers.map(header => `<th>${header}</th>`).join("")}</tr>`;
    rows.forEach(row => {
        table.innerHTML += `
            <tr>
                <td>${row.indicator}</td>
                <td>${row.n1}</td>
                <td>${row.objectif}</td>
                <td>${row.realise}</td>
            </tr>
        `;
    });
}

// Afficher le graphique des tranches horaires
function displayHourlyChart(hourlyData) {
    const ctx = document.getElementById("hourlyChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: hourlyData.hours,
            datasets: [
                {
                    label: "CA N-1",
                    data: hourlyData.CA_N1,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
                {
                    label: "Tickets N-1",
                    data: hourlyData.Tickets_N1,
                    backgroundColor: "rgba(153, 102, 255, 0.2)",
                    borderColor: "rgba(153, 102, 255, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "top" },
            },
            scales: {
                y: { beginAtZero: true },
            },
        },
    });
}
