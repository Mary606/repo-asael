document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");
  const loadingTitle = document.getElementById("loading-title");
  const loadingSubtitle = document.getElementById("loading-subtitle");
  const progressBar = document.getElementById("progress-bar");
  const musica = document.getElementById("musica");
  const playMusicBtn = document.getElementById("play-music-btn");

  // Etapas do loading
  const steps = [
    {
      time: 0,
      title: "Estamos captando sua velhice...",
      subtitle: "Aguarde enquanto analisamos seu nível de senhoridade.",
      progress: 20
    },
    {
      time: 10000,
      title: "Detectamos memória em estado crítico...",
      subtitle: "Os sintomas são de conversas a poucos minutos e falta de memória. Motivos já foram confirmados.",
      progress: 60
    },
    {
      time: 16000,
      title: "Carregando seu remédio...",
      subtitle: "Separando a makise, os jojos e o doctor who.",
      progress: 90
    },
    {
      time: 21000,
      title: "Pronto!",
      subtitle: "Sua página de aniversário foi liberada com sucesso.",
      progress: 100
    }
  ];

  steps.forEach((step) => {
    setTimeout(() => {
      loadingTitle.textContent = step.title;
      loadingSubtitle.textContent = step.subtitle;
      progressBar.style.width = `${step.progress}%`;
    }, step.time);
  });

  const autoplayStatus = document.getElementById("autoplay-status");

  function startConfetti(duration = 10000) {
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: 20,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 20,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  function tryPlayMusic() {
    autoplayStatus.textContent = "Tentando iniciar música automaticamente...";
    musica.volume = 0.8;
    musica.play().then(() => {
      autoplayStatus.textContent = "🎵 Música iniciada! Aproveite a festa.";
      playMusicBtn.classList.add("hidden");
    }).catch(() => {
      autoplayStatus.textContent = "⛔ Autoplay bloqueado! Clique no botão para reproduzir manualmente.";
      playMusicBtn.classList.remove("hidden");
    });
  }

  // Mostrar tela principal no final
  setTimeout(() => {
    loadingScreen.classList.remove("active");
    loadingScreen.style.display = "none";

    mainContent.classList.remove("hidden");

    // Confete por alguns segundos
    startConfetti(10000);

    tryPlayMusic();
  }, 22000);

  // Botão de música
  playMusicBtn.addEventListener("click", () => {
    tryPlayMusic();
  });

  // Botão de música
  playMusicBtn.addEventListener("click", () => {
    musica.play();
  });

  // CARROSSEL
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlideFunc() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlideFunc);

  // troca automática
  setInterval(() => {
    if (!mainContent.classList.contains("hidden")) {
      nextSlide();
    }
  }, 4000);
});