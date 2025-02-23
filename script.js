// ================================
// 🔥 Esperar a que el DOM esté listo antes de ejecutar cualquier código
// ================================
document.addEventListener("DOMContentLoaded", function () {

    // ================================
    // 📢 Cargar Publicaciones Dinámicas desde JSON
    // ================================
    function cargarPublicaciones() {
        fetch("publicaciones.json")
            .then(response => response.json())
            .then(data => {
                const contenedorInicio = document.getElementById("listaInicio");
                const contenedorPublicaciones = document.getElementById("listaPublicaciones");
                const contenedorRegalos = document.getElementById("listaRegalos");
                const contenedorPublicidad = document.getElementById("listaPublicidad");

                if (!contenedorInicio || !contenedorPublicaciones || !contenedorRegalos || !contenedorPublicidad) {
                    console.error("❌ No se encontraron las secciones de publicaciones.");
                    return;
                }

                // 🔄 Limpiar cada contenedor antes de agregar contenido nuevo
                contenedorInicio.innerHTML = "";
                contenedorPublicaciones.innerHTML = "";
                contenedorRegalos.innerHTML = "";
                contenedorPublicidad.innerHTML = "";

                data.forEach(publicacion => {
                    const div = document.createElement("div");
                    div.classList.add("publicacion");

                    let html = `<h3>${publicacion.titulo}</h3>
                                <p>${publicacion.contenido}</p>`;

                    // Agregar imagen si existe
                    if (publicacion.foto && publicacion.foto.trim() !== "") {
                        html += `<img src="${publicacion.foto}" alt="Imagen de la publicación">`;
                    }

                    // Agregar enlace si existe
                    if (publicacion.link && publicacion.link.trim() !== "") {
                        html += `<br><a href="${publicacion.link}" target="_blank">🔗 Ver más</a>`;
                    }

                    div.innerHTML = html;

                    // ✅ Insertar en la categoría correcta
                    if (publicacion.categoria.toLowerCase() === "inicio") {
                        contenedorInicio.appendChild(div);
                    } else if (publicacion.categoria.toLowerCase() === "publicaciones") {
                        contenedorPublicaciones.appendChild(div);
                    } else if (publicacion.categoria.toLowerCase() === "regalos") {
                        contenedorRegalos.appendChild(div);
                    } else if (publicacion.categoria.toLowerCase() === "publicidad") {
                        contenedorPublicidad.appendChild(div);
                    }
                });

                // ✅ Ocultar todas las secciones excepto "Inicio"
                document.querySelectorAll(".contenido-seccion").forEach(sec => {
                    sec.classList.remove("mostrar");
                    sec.style.display = "none";
                });

                document.getElementById("contenidoInicio").style.display = "block";
                setTimeout(() => document.getElementById("contenidoInicio").classList.add("mostrar"), 10);
            })
            .catch(error => console.error("❌ Error cargando publicaciones:", error));
    }

    // Llamar a la función para cargar las publicaciones
    cargarPublicaciones();

    // ================================
    // 💡 Efecto Neón en la Pantalla de Bienvenida
    // ================================
    const bienvenida = document.querySelector(".bienvenida");

    if (bienvenida) {
        function cambiarColorNeon() {
            const colores = ["#ff007f", "#00fff7", "#ffcc00", "#ff5500", "#00ff00"];
            const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
            bienvenida.style.textShadow = `0 0 15px ${colorAleatorio}, 0 0 30px ${colorAleatorio}`;
        }
        setInterval(cambiarColorNeon, 1000);
    }

    // ================================
    // 🎥 Redirigir al canal de Telegram al hacer clic en "Únete Ahora"
    // ================================
    const botonUnete = document.getElementById("botonUnete");

    if (botonUnete) {
        botonUnete.addEventListener("click", function () {
            window.open("https://t.me/Zona87Plus", "_blank");
        });
    }

    // ================================
    // 🔄 Funcionalidad para desplegar contenido en los botones de navegación
    // ================================
    const botones = document.querySelectorAll(".nav-btn");

    if (botones.length > 0) {
        botones.forEach(boton => {
            boton.addEventListener("click", function () {
                const targetId = this.getAttribute("data-target");
                const seccion = document.getElementById(targetId);

                if (!seccion) {
                    console.error(`❌ La sección con ID '${targetId}' no existe en el HTML.`);
                    return;
                }

                if (seccion.classList.contains("mostrar")) {
                    seccion.classList.remove("mostrar");
                    seccion.style.display = "none";
                } else {
                    document.querySelectorAll(".contenido-seccion").forEach(sec => {
                        sec.classList.remove("mostrar");
                        sec.style.display = "none";
                    });

                    seccion.style.display = "block";
                    setTimeout(() => seccion.classList.add("mostrar"), 10);
                }
            });
        });
    }

    // ================================
    // 📌 Botones flotantes de Redes Sociales (Ocultar al hacer scroll)
    // ================================
    const socialButtons = document.querySelector(".social-buttons");
    let lastScrollTop = 0;

    window.addEventListener("scroll", function () {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop) {
            // Si bajamos, ocultamos los botones
            socialButtons.classList.add("hidden");
        } else {
            // Si subimos, los mostramos
            socialButtons.classList.remove("hidden");
        }
        lastScrollTop = currentScroll;
    });

});
