document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const resultadosSection = document.querySelector(".resultados");
    const generoSelect = document.getElementById("genero");
    const edadInput = document.getElementById("edad");

    function agregarCampoPSA() {
        const psaExistente = document.getElementById("psa");
        if (!psaExistente && generoSelect.value === "Hombre" && parseInt(edadInput.value) > 40) {
            const psaLabel = document.createElement("label");
            psaLabel.setAttribute("for", "psa");
            psaLabel.textContent = "Antígeno Prostático Específico (PSA) (ng/mL):";
            
            const psaInput = document.createElement("input");
            psaInput.setAttribute("type", "number");
            psaInput.setAttribute("id", "psa");
            psaInput.setAttribute("name", "psa");
            psaInput.setAttribute("step", "0.01");
            psaInput.required = true;
            
            form.insertBefore(psaLabel, form.lastElementChild);
            form.insertBefore(psaInput, form.lastElementChild);
        } else if (psaExistente && (generoSelect.value !== "Hombre" || parseInt(edadInput.value) <= 40)) {
            psaExistente.previousElementSibling.remove();
            psaExistente.remove();
        }
    }

    generoSelect.addEventListener("change", agregarCampoPSA);
    edadInput.addEventListener("input", agregarCampoPSA);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const edad = parseInt(edadInput.value);
        const peso = parseFloat(document.getElementById("peso").value);
        const glucosa = parseFloat(document.getElementById("glucosa").value);
        const colesterol = parseFloat(document.getElementById("colesterol").value);
        const trigliceridos = parseFloat(document.getElementById("trigliceridos").value);
        const psa = document.getElementById("psa") ? parseFloat(document.getElementById("psa").value) : null;

        let resultadosHTML = `<h2>Resultados para ${nombre}</h2>`;
        resultadosHTML += evaluarIndicador("Glucosa", glucosa, 70, 99);
        resultadosHTML += evaluarIndicador("Colesterol Total", colesterol, 125, 200);
        resultadosHTML += evaluarIndicador("Triglicéridos", trigliceridos, 50, 150);
        if (psa !== null) {
            resultadosHTML += evaluarIndicador("PSA", psa, 0, 4);
        }
        
        resultadosSection.innerHTML = resultadosHTML;
    });

    function evaluarIndicador(nombre, valor, limiteBajo, limiteAlto) {
        let estado = "Normal";
        let color = "black";
        let categoria = "normal";
        let recomendacion = "Todo en orden.";
        
        const urls = {
            "Glucosa": { "bajo": "URL_BAJO", "alto": "URL_ALTO", "normal": "URL_NORMAL", "excelente": "URL_EXCELENTE" },
            "Colesterol Total": { "bajo": "URL_BAJO", "alto": "URL_ALTO", "normal": "URL_NORMAL", "excelente": "URL_EXCELENTE" },
            "Triglicéridos": { "bajo": "URL_BAJO", "alto": "URL_ALTO", "normal": "URL_NORMAL", "excelente": "URL_EXCELENTE" },
            "PSA": { "bajo": "URL_BAJO", "alto": "URL_ALTO", "normal": "URL_NORMAL", "excelente": "URL_EXCELENTE" }
        };
        
        if (valor < limiteBajo) {
            estado = "Condición Preocupante (Bajo)";
            color = "red";
            categoria = "bajo";
            recomendacion = "Consulta a un especialista para evaluación.";
        } else if (valor > limiteAlto) {
            estado = "Condición Preocupante (Alto)";
            color = "red";
            categoria = "alto";
            recomendacion = "Es recomendable hacer cambios en la dieta y consultar con un médico.";
        } else if (valor >= (limiteBajo + limiteAlto) / 2 * 0.9 && valor <= (limiteBajo + limiteAlto) / 2 * 1.1) {
            estado = "Estado Excelente";
            color = "green";
            categoria = "excelente";
            recomendacion = "Sigue manteniendo tu estilo de vida saludable.";
        }
        
        return `<p><strong>${nombre}:</strong> ${valor} mg/dL - <a href="${urls[nombre][categoria]}" target="_blank" style="color: ${color}; font-weight: bold;">${estado}</a></p>
                <p><strong>Recomendación:</strong> ${recomendacion}</p>`;
    }
/*-----------------------------*/
function evaluarIndicador(nombre, valor, limiteBajo, limiteAlto) {
    let estado = "";
    let color = "";

    // Diccionario con URLs personalizadas
    const urls = {
        "Glucosa": {
            "bajo": "https://www.youtube.com/shorts/xgnIKewJ6L4",
            "alto": "https://www.youtube.com/shorts/PCjEsWH40zg",
            "normal": "https://www.youtube.com/watch?v=efJqYCpeN5E",
            "excelente": "https://www.youtube.com/watch?v=ZiH7W0L8zbs"  
        },
        "Colesterol Total": {
            "bajo": "https://www.youtube.com/shorts/hajKak1SmCQ",
            "alto": "https://www.youtube.com/shorts/HMa_WVuPQjE",
            "normal": "https://www.youtube.com/shorts/5omYTA5aWeA",
            "excelente": "https://www.youtube.com/shorts/BvttJ5tNkS4"
        },
        "Triglicéridos": {
            "bajo": "https://www.youtube.com/watch?v=V_Pg-DOgBm0",
            "alto": "https://www.youtube.com/shorts/SwccoSid3Fc",
            "normal": "https://www.youtube.com/shorts/4YDoo_BvFSU",
            "excelente": "https://www.youtube.com/shorts/8zo5i6DFC0w"
        },
        "PSA": {
            "bajo": "",
            "alto": "https://www.youtube.com/watch?v=9_3QliCRdaQ",
            "normal": "https://www.youtube.com/shorts/c3s2yv65dOc",
            "excelente": "https://www.youtube.com/watch?v=NzxWjD-tdhU"
        }
    };

    let categoria = "normal"; // Por defecto se considera normal
    let url = urls[nombre]["normal"]; // URL por defecto

    if (valor < limiteBajo) {
        estado = "Condición Preocupante (Bajo)";
        color = "red";
        categoria = "bajo";
    } else if (valor > limiteAlto) {
        estado = "Condición Preocupante (Alto)";
        color = "red";
        categoria = "alto";
    } else if (valor >= (limiteBajo + limiteAlto) / 2 * 0.9 && valor <= (limiteBajo + limiteAlto) / 2 * 1.1) {
        estado = "Estado Excelente";
        color = "green";
        categoria = "excelente";
    }

    // Asignar URL correspondiente
    url = urls[nombre][categoria];

    return `<p>
        <strong>${nombre}:</strong> ${valor} mg/dL - 
        <a href="${url}" target="_blank" style="color: ${color}; font-weight: bold;">${estado}</a>
    </p>`;
}
// -----------------------------------------------------------------------------------------------------------

});
